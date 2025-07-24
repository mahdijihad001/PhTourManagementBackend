# 🧳 Tour Management User Authentication Backend API (TypeScript)

A secure and scalable **Tour Management Backend User Authentication** built with **TypeScript**, **Node.js**, **Express**, **MongoDB**, and **Zod**. This system provides JWT-based authentication, role-based access control, and comprehensive user management.

---

## ✨ Features

- ✅ **User Registration & Login** (JWT Authentication)
- ✅ **Role-based Access Control**: `user`, `admin`, `super-admin`
- ✅ **Admin Functionalities**:
  - Promote user to admin
  - Block / Update / Delete users
- ✅ **User Functionalities**:
  - Update own profile, role, and active status
- ✅ **Super Admin Functionalities**:
  - Can promote/create `admin` or other `super-admin`
- ✅ Global Error Handling with `AppError` and error middleware
- ✅ Reusable `catchAsync` higher-order function to avoid try-catch
- ✅ Request validation using **Zod**
- ✅ 404 Not Found route handler
- ✅ Environment variable validation at startup

---

## ⚙️ Tech Stack

| Tech             | Description                               |
|------------------|-------------------------------------------|
| TypeScript       | Strongly-typed language over JavaScript   |
| Node.js          | JavaScript runtime environment            |
| Express.js       | Web framework for routing and middleware  |
| MongoDB + Mongoose | NoSQL Database + ODM for data modeling |
| Zod              | Runtime schema validation and type safety |
| JWT              | JSON Web Tokens for secure auth           |
| dotenv           | Manage environment variables              |

---

## 📁 Folder Structure


```
src/
├── app/
│ ├── modules/
│ │ └── user/
│ │ ├── user.controller.ts
│ │ ├── user.interface.ts
│ │ ├── user.model.ts
│ │ ├── user.routes.ts
│ │ ├── user.service.ts
│ │ └── user.validation.ts
│ └── middlewares/
│ ├── auth.ts
│ ├── validateRequest.ts
│ └── globalErrorHandler.ts
│
├── config/
│ └── index.ts
├── constants/
│ └── role.ts
├── utils/
│ ├── AppError.ts
│ ├── catchAsync.ts
│ └── sendResponse.ts
│
├── server.ts
└── app.ts

```


---

## 🧩 Role-based Access Table

| Role         | Can Do                                                     |
|--------------|------------------------------------------------------------|
| User         | Update own profile                                         |
| Admin        | Promote user to admin, block/delete/update users           |
| Super Admin  | Create/promote Admins or other Super Admins                |

---

## 🔐 Security

- JWT Authentication
- Environment Variable Check before App Launch
- Access Control Middleware
- Zod Schema Validation

---

## 🔧 Environment Variables

Create a `.env` file:

```
PORT=portno
MONGO_URI=mongoDb cluster url
NODE_ENVIRONMENT=development
ACCESS_SECRATE=jwt access secrate token
SUPER_ADMIN_EMAIL=super admin email
SUPER_ADMIN_PASSWORD=super admin password

```

## 🚀 Getting Started

Clone the Repo

```
git clone https://github.com/mahdijihad001/PhTourManagementBackend

```
## Install Dependencies

```
npm install

```
## Run the Server in Development

```
npm run dev

```

## 📬 API Endpoints 

## Auth
  
| Method | Endpoint                | Description         |
| ------ | ----------------------- | ------------------- |
| POST   | `/api/v1/auth/register` | Register a new user |
| POST   | `/api/v1/auth/login`    | Login existing user |

## User

| Method | Endpoint                    | Access       | Description           |
| ------ | --------------------------- | ------       | --------------------- |
| GET    | `/api/v1/user/user`         | user         | Update own Profile    |
| PATCH  | `/api/v1/user/:id`          | Admin        | No be Super admin     |
| PATCH  | `/api/v1/user/:id`          | super Admin  | Can Change Any        |

