import { Camera, Loader2, ScanLine } from 'lucide-react';
import { useRef, useState } from 'react';
import Webcam from 'react-webcam';
import { toast } from 'sonner';

type Props = {
  onPlateDetected: (plate: string) => void;
  onImageCaptured: (file: File | null) => void;
};

type CropRegion = {
  height: number;
  width: number;
  x: number;
  y: number;
};

const cleanPlateText = (value: string) => value.toUpperCase().replace(/[^A-Z0-9]/g, '');
const isLikelyVietnamPlate = (value: string) => /^[0-9]{2}[A-Z][0-9]{4,6}$/.test(value);

const extractPlateCandidate = (rawText: string) => {
  const normalizedText = rawText.toUpperCase().replace(/[\n\r]+/g, ' ');
  const chunks = normalizedText
    .split(/\s+/)
    .map(cleanPlateText)
    .filter(Boolean);
  const candidates = [
    normalizedText,
    chunks.join(''),
    ...chunks,
    ...chunks.flatMap((_, index) =>
      chunks.slice(index + 1, index + 4).map((__, endOffset) =>
        chunks.slice(index, index + endOffset + 2).join('')
      )
    ),
  ];

  for (const candidate of candidates) {
    const compact = cleanPlateText(candidate);
    const plateMatch = compact.match(/[0-9]{2}[A-Z][0-9]{4,6}/);

    if (plateMatch && isLikelyVietnamPlate(plateMatch[0])) {
      return plateMatch[0];
    }
  }

  return '';
};

const dataUrlToFile = async (dataUrl: string, fileName: string) => {
  const response = await fetch(dataUrl);
  const blob = await response.blob();
  return new File([blob], fileName, { type: blob.type || 'image/jpeg' });
};

const loadImage = (src: string) =>
  new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = reject;
    image.src = src;
  });

type OpenCvMat = { delete: () => void };

type OpenCvModule = {
  COLOR_RGBA2GRAY: number;
  THRESH_BINARY: number;
  THRESH_OTSU: number;
  Mat: new () => OpenCvMat;
  Size: new (width: number, height: number) => unknown;
  GaussianBlur: (src: OpenCvMat, dst: OpenCvMat, ksize: unknown, sigmaX: number) => void;
  cvtColor: (src: OpenCvMat, dst: OpenCvMat, code: number, dstCn: number) => void;
  imread: (source: HTMLCanvasElement) => OpenCvMat;
  imshow: (target: HTMLCanvasElement, source: OpenCvMat) => void;
  threshold: (src: OpenCvMat, dst: OpenCvMat, thresh: number, maxval: number, type: number) => void;
};

type OpenCvFactoryModule = {
  default?: unknown;
  'module.exports'?: unknown;
};

let openCvPromise: Promise<OpenCvModule> | null = null;

const isOpenCvModule = (value: unknown): value is OpenCvModule => {
  return Boolean(value && typeof (value as { imread?: unknown }).imread === 'function');
};

const resolveOpenCvCandidate = async (candidate: unknown): Promise<OpenCvModule | null> => {
  const resolvedCandidate = await Promise.resolve(candidate);

  if (isOpenCvModule(resolvedCandidate)) {
    return resolvedCandidate;
  }

  if (typeof resolvedCandidate === 'function') {
    const runtime = await (resolvedCandidate as () => Promise<unknown> | unknown)();
    return isOpenCvModule(runtime) ? runtime : null;
  }

  return null;
};

const loadOpenCv = async () => {
  openCvPromise ??= import('@techstark/opencv-js').then(async (module) => {
    const cvModule = module as OpenCvFactoryModule;
    const candidates = [cvModule['module.exports'], cvModule.default, window.cv];

    for (const candidate of candidates) {
      const cv = await resolveOpenCvCandidate(candidate);

      if (cv) {
        return cv;
      }
    }

    throw new Error('OpenCV runtime is not available');
  });

  return openCvPromise;
};

declare global {
  interface Window {
    cv?: unknown;
  }
}

type TesseractWorker = {
  recognize: (image: Blob) => Promise<{ data: { text?: string } }>;
  setParameters: (params: Record<string, string>) => Promise<unknown>;
  terminate: () => Promise<unknown>;
};

const canvasToBlob = (canvas: HTMLCanvasElement) =>
  new Promise<Blob>((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) {
        resolve(blob);
        return;
      }

      reject(new Error('Could not preprocess image'));
    }, 'image/png');
  });

const createCropCanvas = (image: HTMLImageElement, region: CropRegion) => {
  const sourceX = Math.round(image.width * region.x);
  const sourceY = Math.round(image.height * region.y);
  const sourceWidth = Math.round(image.width * region.width);
  const sourceHeight = Math.round(image.height * region.height);
  const canvas = document.createElement('canvas');
  const targetWidth = 1600;
  const targetHeight = Math.max(320, Math.round((sourceHeight / sourceWidth) * targetWidth));
  const context = canvas.getContext('2d');

  if (!context) {
    throw new Error('Canvas is not available');
  }

  canvas.width = targetWidth;
  canvas.height = targetHeight;
  context.imageSmoothingEnabled = true;
  context.drawImage(
    image,
    sourceX,
    sourceY,
    sourceWidth,
    sourceHeight,
    0,
    0,
    targetWidth,
    targetHeight
  );

  return canvas;
};

const applyOpenCvThreshold = async (canvas: HTMLCanvasElement) => {
  const cv = await loadOpenCv();
  const src = cv.imread(canvas);
  const gray = new cv.Mat();
  const blur = new cv.Mat();
  const binary = new cv.Mat();

  try {
    cv.cvtColor(src, gray, cv.COLOR_RGBA2GRAY, 0);
    cv.GaussianBlur(gray, blur, new cv.Size(3, 3), 0);
    cv.threshold(blur, binary, 0, 255, cv.THRESH_BINARY + cv.THRESH_OTSU);
    cv.imshow(canvas, binary);

    return canvasToBlob(canvas);
  } finally {
    src.delete();
    gray.delete();
    blur.delete();
    binary.delete();
  }
};

const preprocessImages = async (imageUrl: string) => {
  const image = await loadImage(imageUrl);
  const cropRegions: CropRegion[] = [
    { x: 0.12, y: 0.42, width: 0.82, height: 0.38 },
    { x: 0.18, y: 0.5, width: 0.72, height: 0.28 },
    { x: 0, y: 0.32, width: 1, height: 0.5 },
    { x: 0, y: 0, width: 1, height: 1 },
  ];

  return Promise.all(
    cropRegions.map((region) => {
      const canvas = createCropCanvas(image, region);
      return applyOpenCvThreshold(canvas);
    })
  );
};

export function LicensePlateCamera({ onPlateDetected, onImageCaptured }: Props) {
  const webcamRef = useRef<Webcam>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isDetecting, setIsDetecting] = useState(false);

  const handleCapture = async () => {
    const screenshot = webcamRef.current?.getScreenshot();

    if (!screenshot) {
      toast.error('Unable to capture camera image');
      return;
    }

    const imageFile = await dataUrlToFile(screenshot, `vehicle-${Date.now()}.jpg`);
    setPreviewUrl(screenshot);
    onImageCaptured(imageFile);
    toast.success('Image captured');
  };

  const handleDetectPlate = async () => {
    if (!previewUrl) {
      toast.warning('Capture an image before detecting plate');
      return;
    }

    setIsDetecting(true);

    try {
      const processedBlobs = await preprocessImages(previewUrl);
      const Tesseract = (await import('tesseract.js')) as unknown as {
        createWorker: (language: string) => Promise<TesseractWorker>;
      };
      const worker = await Tesseract.createWorker('eng');
      const pageSegModes = ['7', '6', '11'];
      const detectedTexts: string[] = [];

      for (const pageSegMode of pageSegModes) {
        await worker.setParameters({
          preserve_interword_spaces: '1',
          tessedit_char_whitelist: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789.- ',
          tessedit_pageseg_mode: pageSegMode,
        });

        for (const blob of processedBlobs) {
          const result = await worker.recognize(blob);
          detectedTexts.push(result.data.text || '');

          const plate = extractPlateCandidate(result.data.text || '');

          if (plate) {
            await worker.terminate();
            onPlateDetected(plate);
            toast.success('Plate detected');
            return;
          }
        }
      }

      await worker.terminate();
      console.info('Plate OCR raw text:', detectedTexts);
      toast.warning('Plate not detected. Please enter it manually.');
    } catch (error) {
      console.error(error);
      toast.error('Failed to detect plate');
    } finally {
      setIsDetecting(false);
    }
  };

  return (
    <div className="space-y-4 rounded-xl border border-slate-200 bg-slate-50 p-4">
      <div className="overflow-hidden rounded-lg bg-slate-900">
        <Webcam
          ref={webcamRef}
          audio={false}
          mirrored={false}
          screenshotFormat="image/jpeg"
          videoConstraints={{ facingMode: 'environment' }}
          className="aspect-video w-full object-cover"
        />
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <button
          type="button"
          onClick={handleCapture}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-900 px-4 py-3 text-sm font-medium text-white transition hover:bg-blue-800"
        >
          <Camera size={18} />
          Capture Photo
        </button>

        <button
          type="button"
          onClick={handleDetectPlate}
          disabled={!previewUrl || isDetecting}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-600 px-4 py-3 text-sm font-medium text-white transition hover:bg-emerald-500 disabled:cursor-not-allowed disabled:bg-slate-300"
        >
          {isDetecting ? <Loader2 className="animate-spin" size={18} /> : <ScanLine size={18} />}
          {isDetecting ? 'Detecting...' : 'Detect Plate'}
        </button>
      </div>

      {previewUrl ? (
        <div>
          <div className="mb-2 text-sm font-medium text-slate-600">Captured image</div>
          <img
            src={previewUrl}
            alt="Captured vehicle"
            className="aspect-video w-full rounded-lg object-cover"
          />
        </div>
      ) : null}
    </div>
  );
}

