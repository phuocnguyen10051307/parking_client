# Project Overview

Vợ nào làm không đúng anh vote kick thì đừng khóc nhé, anh không cứu nổi các vợ đâu.

## 1. Project Structure

```txt
parking_client/
├─ public/                         # Static assets public như favicon, icons
├─ src/                            # Source code chính của ứng dụng
│  ├─ app/                         # Cấu hình cấp ứng dụng: layout, router
│  │  ├─ layouts/                  # Layout dùng chung cho các route
│  │  └─ router/                   # Cấu hình router của ứng dụng
│  ├─ components/                  # Components dùng chung
│  │  └─ ui/                       # UI components tái sử dụng
│  ├─ features/                    # Các module chức năng
│  │  ├─ auth/                     # Chức năng đăng nhập/đăng ký
│  │  │  ├─ api/                   # API calls của auth
│  │  │  ├─ components/            # Components riêng của auth
│  │  │  ├─ hooks/                 # Custom hooks riêng của auth
│  │  │  ├─ pages/                 # Pages của auth
│  │  │  ├─ schemas/               # Validation schemas của auth
│  │  │  ├─ types/                 # TypeScript types của auth
│  │  │  └─ utils/                 # Helper functions riêng của auth
│  │  └─ users/                    # Chức năng users
│  ├─ lib/                         # Cấu hình thư viện và utilities dùng chung
│  ├─ store/                       # Global client state
│  ├─ styles/                      # Global styles
│  ├─ app.tsx                      # Root app component
│  └─ main.tsx                     # Entry point của React app
├─ components.json                 # Cấu hình shadcn/ui
├─ eslint.config.js                # Cấu hình ESLint
├─ index.html                      # HTML entry của Vite
├─ package.json                    # Scripts và dependencies
├─ package-lock.json               # Lockfile dependencies
├─ tsconfig.json                   # Cấu hình TypeScript chung
├─ tsconfig.app.json               # Cấu hình TypeScript cho app
├─ tsconfig.node.json              # Cấu hình TypeScript cho Node/Vite
└─ vite.config.ts                  # Cấu hình Vite
```

## 2. Folder Rules

### `app/`

Chứa cấu hình cấp ứng dụng như router, layout, providers hoặc các setup dùng chung cho toàn app.

### `components/`

Chứa shared components có thể tái sử dụng ở nhiều feature. Không đặt logic nghiệp vụ cụ thể của một feature vào đây.

### `features/`

Chứa code chia theo từng chức năng chính của ứng dụng. Mỗi feature có thể có `api/`, `components/`, `hooks/`, `pages/`, `schemas/`, `types/`, `utils/`.

### `features/<feature-name>/hooks/`

Chứa custom hooks dùng riêng cho một feature.

### `lib/`

Chứa cấu hình thư viện, client dùng chung và helper cấp project như axios, query client, utility functions.

### `store/`

Chứa global client state hoặc store dùng chung trong ứng dụng.

### `styles/`

Chứa global styles, CSS entry, theme hoặc style config dùng chung.

### `features/<feature-name>/types/`

Chứa TypeScript types/interfaces dùng riêng cho một feature.

## 3. File Naming Rules

Dùng `kebab-case` cho tên file.

| Loại file           | Quy ước                               |
| ------------------- | ------------------------------------- |
| React component     | `.tsx`                                |
| Page component      | `.tsx`                                |
| Layout              | `.tsx`                                |
| Provider            | `.tsx`                                |
| Hook                | `.ts`, trừ khi có JSX thì dùng `.tsx` |
| API file            | `.ts`                                 |
| Type file           | `.ts`                                 |
| Schema file         | `.ts`                                 |
| Utility/helper file | `.ts`                                 |

Ví dụ đúng:

```txt
login-page.tsx
register-form.tsx
auth-api.ts
auth-store.ts
user.types.ts
login-schema.ts
use-login.ts
```

Không dùng:

```txt
LoginPage.tsx
authApi.ts
useLogin.ts
```

## 4. Git Commit Rules

Sử dụng Conventional Commits.

Format:

```txt
<type>: <short description>
```

Các type được dùng:

```txt
feat: thêm chức năng mới
fix: sửa lỗi
docs: cập nhật tài liệu
style: chỉnh format/code style, không đổi logic
refactor: refactor code
chore: việc cấu hình, package, tooling
build: thay đổi build/dependencies
```

Ví dụ:

```txt
feat: add register page
fix: resolve login form validation
docs: update project README
refactor: simplify auth hooks
chore: configure eslint and prettier
```

## 5. Branch Naming Rules

Đặt tên branch theo format:

```txt
<type>/<short-description>
```

Ví dụ:

```txt
feature/register-page
fix/login-validation
docs/update-readme
refactor/auth-module
```

## 6. Pull Request Rules

- Tên PR rõ ràng, ngắn gọn.
- Mỗi PR chỉ nên tập trung vào một mục tiêu.
- Không commit `node_modules`, `dist`, file `.env`.
- Code phải được format trước khi push.
- Không push secret hoặc token lên GitHub.
