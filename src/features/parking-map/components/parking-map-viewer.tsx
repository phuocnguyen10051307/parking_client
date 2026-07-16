import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

import type { ParkingMapFloor } from '../types/parking-map';

type Props = {
  floors: ParkingMapFloor[];
  selectedFloorId: string | null;
  showVehicleDetails?: boolean;
};

const MODEL_PATHS = {
  parking: '/models/parking.glb',
  elevator: '/models/elevator.glb',
  car: '/models/car.glb',
};

const FLOOR_GAP = 7;
const CAMERA_DIRECTION = new THREE.Vector3(0, 1, 0.75).normalize();
const IDENTITY_QUATERNION = new THREE.Quaternion();
const A_SLOT_TURN_QUATERNION = new THREE.Quaternion().setFromAxisAngle(
  new THREE.Vector3(0, 1, 0),
  Math.PI
);
const SLOT_TRANSFORM_FIXERS: Record<string, { position?: THREE.Vector3; quaternion?: THREE.Quaternion }> = {
  SlotPoint_A01: {
    position: new THREE.Vector3(9.925419807434082, 0.10019990056753159, -11.928400039672852),
    quaternion: IDENTITY_QUATERNION.clone(),
  },
  SlotPoint_A04: {
    quaternion: IDENTITY_QUATERNION.clone(),
  },
};
const RESERVED_CAR_COLOR = 0x111111;
const OWNED_CAR_COLOR = 0xff2d3d;
const OCCUPIED_CAR_COLOR = 0x6b7280;

function loadModel(loader: GLTFLoader, path: string) {
  return new Promise<THREE.Group>((resolve, reject) => {
    loader.load(
      path,
      (gltf) => resolve(gltf.scene),
      undefined,
      (error) => reject(error)
    );
  });
}

function getRenderableBounds(object: THREE.Object3D) {
  const box = new THREE.Box3();
  const tempBox = new THREE.Box3();
  let hasBounds = false;

  object.updateWorldMatrix(true, true);
  object.traverse((child) => {
    const mesh = child as THREE.Mesh;

    if (!mesh.isMesh || !mesh.geometry?.attributes?.position) {
      return;
    }

    if (mesh.geometry.boundingBox === null) {
      mesh.geometry.computeBoundingBox();
    }

    if (!mesh.geometry.boundingBox) {
      return;
    }

    tempBox.copy(mesh.geometry.boundingBox).applyMatrix4(mesh.matrixWorld);

    if (
      !Number.isFinite(tempBox.min.x) ||
      !Number.isFinite(tempBox.min.y) ||
      !Number.isFinite(tempBox.min.z) ||
      !Number.isFinite(tempBox.max.x) ||
      !Number.isFinite(tempBox.max.y) ||
      !Number.isFinite(tempBox.max.z)
    ) {
      return;
    }

    box.union(tempBox);
    hasBounds = true;
  });

  return hasBounds ? box : null;
}

function normalizeCarModel(sourceCar: THREE.Object3D) {
  const carScene = sourceCar.clone(true);
  const box = getRenderableBounds(carScene);

  if (!box) {
    return carScene;
  }

  const center = box.getCenter(new THREE.Vector3());
  const bottomY = box.min.y;
  const pivot = new THREE.Group();

  carScene.position.sub(new THREE.Vector3(center.x, bottomY, center.z));
  pivot.add(carScene);

  return pivot;
}

function prepareModel(root: THREE.Object3D) {
  root.traverse((object) => {
    const mesh = object as THREE.Mesh;

    if (mesh.isMesh) {
      mesh.castShadow = true;
      mesh.receiveShadow = true;
    }
  });
}

function removeDecorativeCars(root: THREE.Object3D) {
  const removableObjects: THREE.Object3D[] = [];

  root.traverse((object) => {
    if (object.name.startsWith('Car_Model')) {
      removableObjects.push(object);
    }
  });

  removableObjects.forEach((object) => {
    object.parent?.remove(object);
  });
}

function styleParkedCar(root: THREE.Object3D, colorHex: number) {
  root.traverse((object) => {
    const mesh = object as THREE.Mesh;

    if (!mesh.isMesh || !mesh.material) {
      return;
    }

    const materials = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
    const styledMaterials = materials.map((material) => {
      const cloned = material.clone();

      if ('color' in cloned && cloned.color instanceof THREE.Color) {
        const color = cloned.color;
        const isDark = color.r + color.g + color.b < 0.7;
        const isRedAccent = color.r > color.g * 1.4 && color.r > color.b * 1.4;

        if (isDark && !isRedAccent) {
          color.setHex(colorHex);
        }
      }

      return cloned;
    });

    mesh.material = Array.isArray(mesh.material) ? styledMaterials : styledMaterials[0];
  });
}

function normalizeSlotCode(slotCode: string) {
  const compact = slotCode.trim().replace(/\s+/g, '').replace(/-/g, '_');
  const withoutPrefix = compact.replace(/^SlotPoint_/, '');
  const padded = withoutPrefix.replace(/^([A-Za-z])(\d)$/, '$10$2');

  return padded.toUpperCase();
}

function getBackendSlotModelCode(slotCode: string) {
  const parts = slotCode.trim().toUpperCase().split('-').filter(Boolean);

  if (parts.length < 3) {
    return null;
  }

  const zoneMatch = parts[1]?.match(/[A-Z]/);
  const numberMatch = parts.at(-1)?.match(/\d+/);

  if (!zoneMatch || !numberMatch) {
    return null;
  }

  const slotNumber = Number(numberMatch[0]);

  if (!Number.isFinite(slotNumber) || slotNumber <= 0) {
    return null;
  }

  return `${zoneMatch[0]}${String(slotNumber).padStart(2, '0')}`;
}

function getSlotObjectNames(slotCode: string) {
  const normalized = normalizeSlotCode(slotCode);
  const backendModelCode = getBackendSlotModelCode(slotCode);
  const candidates = [normalized, slotCode];

  if (backendModelCode) {
    candidates.unshift(backendModelCode);
  }

  return [...new Set(candidates.flatMap((candidate) => [`SlotPoint_${candidate}`, candidate]))];
}

function getSortedSlotPoints(root: THREE.Object3D) {
  const slotPoints: THREE.Object3D[] = [];

  root.traverse((object) => {
    if (object.name.startsWith('SlotPoint_')) {
      slotPoints.push(object);
    }
  });

  return slotPoints.sort((a, b) => a.name.localeCompare(b.name));
}

function findSlotPoint(root: THREE.Object3D, slotCode: string, fallbackIndex: number) {
  const candidates = getSlotObjectNames(slotCode);

  for (const candidate of candidates) {
    const slotPoint = root.getObjectByName(candidate);

    if (slotPoint) {
      return slotPoint;
    }
  }

  const fallbackSlots = getSortedSlotPoints(root);
  return fallbackSlots[fallbackIndex % fallbackSlots.length] ?? null;
}

function getSlotTransform(slotPoint: THREE.Object3D, parkingRoot: THREE.Object3D) {
  const position = new THREE.Vector3();
  const quaternion = new THREE.Quaternion();
  const fix = SLOT_TRANSFORM_FIXERS[slotPoint.name];

  parkingRoot.updateWorldMatrix(true, true);
  slotPoint.updateWorldMatrix(true, false);

  if (fix?.position) {
    position.copy(parkingRoot.localToWorld(fix.position.clone()));
  } else {
    slotPoint.getWorldPosition(position);
  }

  if (fix?.quaternion) {
    parkingRoot.getWorldQuaternion(quaternion);
    quaternion.multiply(fix.quaternion);
  } else {
    slotPoint.getWorldQuaternion(quaternion);
  }

  return { position, quaternion };
}

function applyCarToSlot(
  car: THREE.Object3D,
  slotPoint: THREE.Object3D,
  parent: THREE.Object3D,
  parkingRoot: THREE.Object3D
) {
  const slotTransform = getSlotTransform(slotPoint, parkingRoot);
  const parentQuaternion = new THREE.Quaternion();

  parent.updateWorldMatrix(true, false);
  parent.getWorldQuaternion(parentQuaternion);

  car.position.copy(parent.worldToLocal(slotTransform.position.clone()));
  car.quaternion.copy(parentQuaternion.invert().multiply(slotTransform.quaternion));

  if (slotPoint.name.startsWith('SlotPoint_A')) {
    car.quaternion.multiply(A_SLOT_TURN_QUATERNION);
  }

  const liftOffset = new THREE.Vector3(0, 0.02, 0);
  liftOffset.applyQuaternion(car.quaternion);
  car.position.add(liftOffset);
}

function formatFloorLabel(floorNumber: number) {
  return floorNumber < 0 ? `Basement ${Math.abs(floorNumber)}` : `Level ${floorNumber}`;
}

function createFloorLabel(text: string) {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 192;

  const context = canvas.getContext('2d');

  if (!context) {
    throw new Error('Could not create canvas context');
  }

  context.fillStyle = 'rgba(15,23,42,0.78)';
  context.roundRect(10, 10, canvas.width - 20, canvas.height - 20, 18);
  context.fill();
  context.fillStyle = 'rgba(255,255,255,0.98)';
  context.font = '700 72px Arial';
  context.textAlign = 'center';
  context.textBaseline = 'middle';
  context.fillText(text, canvas.width / 2, canvas.height / 2);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;

  return new THREE.Mesh(
    new THREE.PlaneGeometry(4.8, 1.2),
    new THREE.MeshBasicMaterial({
      map: texture,
      transparent: true,
      depthWrite: false,
      depthTest: false,
    })
  );
}

function createPlateSprite(text: string) {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 160;

  const context = canvas.getContext('2d');

  if (!context) {
    throw new Error('Could not create plate canvas context');
  }

  context.fillStyle = 'rgba(255,255,255,0.96)';
  context.roundRect(16, 24, canvas.width - 32, canvas.height - 48, 18);
  context.fill();
  context.lineWidth = 8;
  context.strokeStyle = '#1e293b';
  context.stroke();
  context.fillStyle = '#0f172a';
  context.font = '800 58px Arial';
  context.textAlign = 'center';
  context.textBaseline = 'middle';
  context.fillText(text, canvas.width / 2, canvas.height / 2 + 2);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;

  const material = new THREE.SpriteMaterial({
    map: texture,
    transparent: true,
    depthTest: false,
    depthWrite: false,
  });
  const sprite = new THREE.Sprite(material);
  sprite.scale.set(3.4, 1.05, 1);
  sprite.renderOrder = 30;

  return sprite;
}

function createSlotLabelSprite(text: string) {
  const canvas = document.createElement('canvas');
  canvas.width = 448;
  canvas.height = 132;

  const context = canvas.getContext('2d');

  if (!context) {
    throw new Error('Could not create slot label canvas context');
  }

  context.fillStyle = 'rgba(15,23,42,0.82)';
  context.roundRect(12, 18, canvas.width - 24, canvas.height - 36, 18);
  context.fill();
  context.lineWidth = 4;
  context.strokeStyle = 'rgba(255,255,255,0.16)';
  context.stroke();
  context.fillStyle = 'rgba(248,250,252,0.98)';
  context.font = '700 44px Arial';
  context.textAlign = 'center';
  context.textBaseline = 'middle';
  context.fillText(text, canvas.width / 2, canvas.height / 2 + 1);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;

  const material = new THREE.SpriteMaterial({
    map: texture,
    transparent: true,
    depthTest: false,
    depthWrite: false,
  });
  const sprite = new THREE.Sprite(material);
  sprite.scale.set(2.55, 0.75, 1);
  sprite.renderOrder = 24;

  return sprite;
}

function focusCamera(camera: THREE.PerspectiveCamera, controls: OrbitControls, object: THREE.Object3D) {
  const box = getRenderableBounds(object);

  if (!box) {
    return;
  }

  const center = box.getCenter(new THREE.Vector3());
  const size = box.getSize(new THREE.Vector3());
  const radius = Math.max(size.length() * 0.5, 1);
  const distance = radius * 1.7;

  camera.position.copy(center.clone().addScaledVector(CAMERA_DIRECTION, distance));
  camera.near = Math.max(radius / 100, 0.1);
  camera.far = Math.max(radius * 20, 2000);
  camera.updateProjectionMatrix();
  controls.target.copy(center);
  controls.maxDistance = camera.far * 0.5;
  controls.update();
}

function getVehicleColor(isReserved: boolean, isOwnedByCurrentUser: boolean) {
  if (isReserved) {
    return RESERVED_CAR_COLOR;
  }

  if (isOwnedByCurrentUser) {
    return OWNED_CAR_COLOR;
  }

  return OCCUPIED_CAR_COLOR;
}

export function ParkingMapViewer({ floors, selectedFloorId, showVehicleDetails = false }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const floorGroupRef = useRef<THREE.Group | null>(null);
  const modelsRef = useRef<{
    car: THREE.Object3D;
    elevator: THREE.Object3D;
    parking: THREE.Object3D;
  } | null>(null);
  const [modelsReady, setModelsReady] = useState(false);

  useEffect(() => {
    const container = containerRef.current;

    if (!container) {
      return;
    }

    let disposed = false;
    let animationFrame = 0;
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf8fafc);

    const camera = new THREE.PerspectiveCamera(60, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.set(15, 15, 20);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controlsRef.current = controls;

    const ambientLight = new THREE.AmbientLight(0xffffff, 2);
    const hemisphereLight = new THREE.HemisphereLight(0xbfd8ff, 0x2b2b2b, 1.5);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 3);
    directionalLight.position.set(10, 20, 10);
    scene.add(ambientLight, hemisphereLight, directionalLight);

    const floorGroup = new THREE.Group();
    floorGroup.name = 'ParkingMapFloors';
    floorGroupRef.current = floorGroup;
    scene.add(floorGroup);

    const handleResize = () => {
      const width = container.clientWidth;
      const height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    const animate = () => {
      controls.update();
      renderer.render(scene, camera);
      animationFrame = requestAnimationFrame(animate);
    };

    const loader = new GLTFLoader();
    Promise.all([
      loadModel(loader, MODEL_PATHS.parking),
      loadModel(loader, MODEL_PATHS.elevator),
      loadModel(loader, MODEL_PATHS.car),
    ])
      .then(([parking, elevator, car]) => {
        if (disposed) {
          return;
        }

        removeDecorativeCars(elevator);
        prepareModel(parking);
        prepareModel(elevator);
        prepareModel(car);

        modelsRef.current = {
          parking,
          elevator,
          car: normalizeCarModel(car),
        };
        setModelsReady(true);
      })
      .catch((error) => {
        console.error('Could not load parking map models:', error);
      });

    window.addEventListener('resize', handleResize);
    animate();

    return () => {
      disposed = true;
      cancelAnimationFrame(animationFrame);
      window.removeEventListener('resize', handleResize);
      controls.dispose();
      renderer.dispose();
      renderer.domElement.remove();
      cameraRef.current = null;
      controlsRef.current = null;
      floorGroupRef.current = null;
      modelsRef.current = null;
      setModelsReady(false);
    };
  }, []);

  useEffect(() => {
    const floorRoot = floorGroupRef.current;
    const models = modelsRef.current;
    const camera = cameraRef.current;
    const controls = controlsRef.current;

    if (!floorRoot || !models || !camera || !controls || !modelsReady) {
      return;
    }

    floorRoot.clear();
    floorRoot.position.set(0, 0, 0);

    const visibleFloors = selectedFloorId
      ? floors.filter((floor) => floor.id === selectedFloorId)
      : floors;

    visibleFloors.forEach((floor, index) => {
      const levelGroup = new THREE.Group();
      levelGroup.name = `Floor_${floor.id}`;
      levelGroup.position.y = index * FLOOR_GAP;

      const parking = models.parking.clone(true);
      const elevator = models.elevator.clone(true);
      levelGroup.add(parking, elevator);
      levelGroup.updateWorldMatrix(true, true);

      floor.slots.forEach((slot, slotIndex) => {
        const slotPoint = findSlotPoint(parking, slot.slotCode, slotIndex);

        if (!slotPoint) {
          return;
        }

        const slotTransform = getSlotTransform(slotPoint, parking);
        const slotLabel = createSlotLabelSprite(slot.slotCode);
        slotLabel.position.copy(levelGroup.worldToLocal(slotTransform.position.clone())).add(new THREE.Vector3(0, 0.82, 0));
        levelGroup.add(slotLabel);

        const isOccupied = slot.isOccupied ?? Boolean(slot.activeSession);
        const isReserved = slot.isReserved ?? Boolean(slot.activeReservation);

        if (!isOccupied && !isReserved) {
          return;
        }

        const car = models.car.clone(true);
        styleParkedCar(car, getVehicleColor(isReserved, Boolean(slot.isOwnedByCurrentUser)));
        applyCarToSlot(car, slotPoint, levelGroup, parking);
        levelGroup.add(car);

        const visiblePlate = showVehicleDetails
          ? slot.activeSession?.vehicle?.licensePlate ?? slot.activeReservation?.vehicle?.licensePlate ?? slot.visiblePlate
          : slot.visiblePlate;

        if (visiblePlate) {
          const plate = createPlateSprite(visiblePlate);
          plate.position.copy(car.position).add(new THREE.Vector3(0, 1.6, 0));
          levelGroup.add(plate);
        }
      });

      const label = createFloorLabel(`${formatFloorLabel(floor.floorNumber)} � ${floor.occupiedCount}/${floor.totalCount}`);
      label.position.set(-9, 0.038, 14.4);
      label.rotation.x = -Math.PI / 2;
      label.renderOrder = 11;
      levelGroup.add(label);

      floorRoot.add(levelGroup);
    });

    focusCamera(camera, controls, floorRoot);
  }, [floors, selectedFloorId, modelsReady, showVehicleDetails]);

  return (
    <div className="h-[58vh] min-h-[420px] overflow-hidden rounded-lg border border-slate-200 bg-slate-50 shadow-sm">
      <div ref={containerRef} className="h-full w-full" />
    </div>
  );
}
