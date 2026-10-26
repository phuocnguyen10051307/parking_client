# Parking System - Frontend

## Overview

Frontend cho hệ thống quản lý bãi đỗ xe, kết nối với Parking System Backend. Ứng dụng cung cấp giao diện cho khách hàng, nhân viên, quản lý và quản trị viên, với phân quyền theo vai trò `USER`, `STAFF`, `MANAGER`, `ADMIN`.

Các chức năng chính gồm đăng ký/đăng nhập, quản lý bãi đỗ và phương tiện, xem bản đồ bãi đỗ, ghi nhận xe vào/ra, đặt chỗ, vé tháng, lịch sử gửi xe, thanh toán và gửi phản hồi.

## Tech Stack

- React 19, TypeScript, Vite 8
- React Router cho điều hướng và bảo vệ route
- Zustand cho quản lý trạng thái
- Axios cho giao tiếp API
- Tailwind CSS 4, shadcn/ui và Radix UI
- React Hook Form và Zod cho biểu mẫu
- Lucide React và Framer Motion
- Three.js cho hiển thị bản đồ 3D
- React Webcam, Tesseract.js và OpenCV.js cho xử lý hình ảnh/biển số

## Requirements

- Node.js 22.13+ thuộc nhánh 22.x hoặc Node.js 24+ để tương thích các dependency hiện tại.
- npm.
- Parking System Backend và database đã được thiết lập; backend mặc định chạy tại `http://localhost:3000`.
- Trình duyệt có quyền truy cập camera khi sử dụng chức năng chụp biển số.

## Installation

```bash
git clone https://github.com/phuocnguyen10051307/parking_client.git
cd parking_client
npm install
```

Nếu đã có source code, mở terminal trong thư mục `parking_client` và chạy `npm install`.

## Environment Variables

Có thể tạo file `.env` trong thư mục gốc frontend để chỉ định địa chỉ API:

```dotenv
VITE_API_BASE_URL=http://localhost:3000/v1
```

Cấu hình này được đọc trong `src/lib/api.ts`. Nếu không khai báo, ứng dụng sử dụng:

| Môi trường | API base URL mặc định |
| --- | --- |
| Development (`npm run dev`) | `http://localhost:3000/v1` |
| Production (`npm run build`) | `/v1` |

Khởi động lại Vite sau khi sửa `.env`. Các biến có tiền tố `VITE_` được đưa vào frontend, vì vậy chỉ dùng cho cấu hình công khai như URL API.

## Backend Setup

Frontend sử dụng REST API và không kết nối trực tiếp với database. Xem [README backend](https://github.com/phuocnguyen10051307/Parking_system_be#readme) để cấu hình PostgreSQL, Prisma và các dịch vụ tích hợp.

Chạy backend trước khi sử dụng các chức năng cần dữ liệu:

```bash
# Chạy trong thư mục Parking_system_be
npm run dev
```

## Run Project

Mở terminal khác tại thư mục `parking_client`:

```bash
npm run dev
```

Frontend: <http://localhost:5173>

Vite có thể chọn cổng khác nếu cổng `5173` đang được sử dụng; xem địa chỉ trong terminal.

Tạo bản build production:

```bash
npm run build
```

Kết quả nằm trong `dist/`. Khi triển khai với API mặc định `/v1`, cấu hình reverse proxy chuyển `/v1` đến backend. Nếu backend ở địa chỉ riêng, đặt `VITE_API_BASE_URL` phù hợp trước khi build. Hosting cần hỗ trợ trả về `index.html` cho các route của React Router.

## API Documentation

Swagger UI của backend: <http://localhost:3000/api-docs>

API base URL khi phát triển: <http://localhost:3000/v1>

Ứng dụng gửi request với `withCredentials: true` để sử dụng cookie xác thực. Backend cần cho phép origin frontend và gửi credentials qua CORS.

## Project Structure

```text
parking_client/
├── public/                 # Tài nguyên tĩnh, hình ảnh và mô hình
├── src/
│   ├── app/
│   │   ├── layouts/        # Bố cục giao diện
│   │   └── router/         # Điều hướng, bảo vệ route và phân quyền
│   ├── components/
│   │   └── ui/             # Các thành phần giao diện dùng chung
│   ├── features/           # Modules theo chức năng: API, pages, hooks, types...
│   ├── lib/                # API client và hàm tiện ích
│   ├── store/              # Trạng thái dùng chung
│   ├── styles/             # CSS toàn cục
│   ├── types/              # Kiểu dữ liệu dùng chung
│   ├── app.tsx             # Component gốc
│   └── main.tsx            # Điểm khởi chạy ứng dụng
├── components.json         # Cấu hình shadcn/ui
├── vite.config.ts          # Cấu hình Vite và alias @
└── package.json
```

## Main Routes

Quyền truy cập các trang vận hành được khai báo tại `src/app/router/rbac-config.ts`. Các trang dưới `/user` dành cho vai trò `USER`.

| Route | Chức năng |
| --- | --- |
| `/login`, `/register` | Đăng nhập, đăng ký |
| `/` | Dashboard vận hành |
| `/parking-map` | Bản đồ bãi đỗ |
| `/vehicle-entry`, `/vehicle-exit` | Xe vào và xe ra |
| `/parking-sessions` | Quản lý phiên gửi xe |
| `/reservations`, `/monthly-subscriptions` | Quản lý đặt chỗ và vé tháng |
| `/buildings`, `/floors`, `/zones`, `/slots` | Quản lý cấu trúc bãi đỗ |
| `/pricing`, `/reports`, `/feedbacks` | Giá, báo cáo và phản hồi |
| `/users`, `/roles`, `/settings`, `/profile` | Người dùng, vai trò, cài đặt và hồ sơ |
| `/user`, `/user/dashboard` | Trang chủ và dashboard khách hàng |
| `/user/my-profile`, `/user/my-vehicles` | Hồ sơ và phương tiện cá nhân |
| `/user/parking-map`, `/user/pricing` | Xem bản đồ và bảng giá |
| `/user/create-reservation`, `/user/my-reservations` | Đặt chỗ và theo dõi đặt chỗ |
| `/user/create-monthly-subscription`, `/user/my-monthly-subscriptions` | Đăng ký và theo dõi vé tháng |
| `/user/my-sessions` | Lịch sử gửi xe |
| `/user/create-feedback`, `/user/my-feedbacks` | Gửi và theo dõi phản hồi |

## Scripts

| Lệnh | Chức năng |
| --- | --- |
| `npm run dev` | Chạy Vite development server |
| `npm run build` | Kiểm tra TypeScript và build production |
| `npm run lint` | Kiểm tra code bằng ESLint |

Frontend hiện chưa khai báo script `start`, `preview` hoặc `test` trong `package.json`.
