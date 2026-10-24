# Prisma Practice — Backend Application

A backend application built with **Node.js, Express.js, TypeScript, and Prisma ORM** to practice backend development, database interactions, and CRUD (Create, Read, Update, Delete) operations. The project also includes tools for authentication, password hashing, data validation, email handling, and file uploads.

## 🚀 Tech Stack

<p align="left">
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js" />
  <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express.js" />
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white" alt="Prisma ORM" />
  <img src="https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white" alt="JWT" />
  <img src="https://img.shields.io/badge/Bcrypt-003A70?style=for-the-badge&logo=letsencrypt&logoColor=white" alt="Bcrypt" />
  <img src="https://img.shields.io/badge/Joi-4B32C3?style=for-the-badge&logoColor=white" alt="Joi" />
  <img src="https://img.shields.io/badge/Nodemailer-22A699?style=for-the-badge&logoColor=white" alt="Nodemailer" />
</p>

## ✨ Features

- **CRUD Operations:** Create, read, update, and delete database records.
- **Database Management:** Interact with a database using Prisma ORM and Prisma Client.
- **Authentication:** Implement token-based authentication using JSON Web Tokens (JWT).
- **Password Security:** Hash passwords using Bcrypt.
- **Data Validation:** Validate incoming data using Joi.
- **File Uploads:** Handle file uploads using Formidable.
- **Email Handling:** Send emails using Nodemailer.
- **Cross-Origin Resource Sharing:** Configure CORS for cross-origin requests.
- **Slug Generation:** Generate URL-friendly slugs using Slugify.
- **Type Safety:** Use TypeScript for structured and maintainable backend code.
- **Development Workflow:** Use Nodemon and TypeScript tooling for development.

## 🛠️ Technologies and Packages

| Technology | Purpose |
|---|---|
| Node.js | JavaScript runtime |
| Express.js | Backend server and API routing |
| TypeScript | Type safety and maintainability |
| Prisma ORM | Database queries and management |
| Prisma Client | Database access from application code |
| JSON Web Token (JWT) | Token-based authentication |
| Bcrypt | Password hashing |
| Joi | Request data validation |
| Formidable | File upload handling |
| Nodemailer | Email sending |
| CORS | Cross-origin request configuration |
| EJS | Embedded JavaScript templating |
| Slugify | URL-friendly slug generation |
| Nodemon | Automatic server restart during development |
| ts-node / tsx | TypeScript execution tools |
| TypeScript Compiler | Compile TypeScript into JavaScript |

## 📋 Prerequisites

Before running the project, make sure you have installed:

- [Node.js](https://nodejs.org/)
- npm (included with Node.js)
- A database supported by your Prisma configuration

## ⚙️ Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/maira-sattar/prisma-practice.git
```

### 2. Navigate to the Project Directory

```bash
cd prisma-practice
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Configure Environment Variables

Create a `.env` file in the root directory and configure the environment variables required by your application.

For example:

```env
DATABASE_URL="your_database_connection_string"
JWT_SECRET="your_jwt_secret"
```

Add any additional environment variables required by your database provider, email service, or application configuration.

**Important:** Replace the example values with your actual configuration. Never commit secrets, credentials, or your `.env` file to GitHub.

### 5. Configure Prisma

Make sure your Prisma schema and database connection are configured correctly.

Run database migrations if your project uses Prisma Migrate:

```bash
npx prisma migrate dev
```

Generate Prisma Client if needed:

```bash
npx prisma generate
```

### 6. Run the Development Server

```bash
npm run dev
```

### 7. Build the Project

Compile the TypeScript source files:

```bash
npm run build
```

### 8. Start the Application

After a successful build, run:

```bash
npm start
```

The application will start using the compiled entry point specified in the project configuration.

## 📁 Project Structure

```text
prisma-practice/
├── src/
│   └── index.ts
├── prisma/
│   └── schema.prisma
├── build/
├── .env
├── .gitignore
├── package.json
├── package-lock.json
└── tsconfig.json
```

*Note: The structure above is illustrative. Your actual folders and files may differ depending on your implementation.*

## 🎯 Learning Objectives

This project focuses on strengthening practical backend development skills, including:

- Building server-side applications with Node.js and Express.js.
- Implementing CRUD functionality and database operations.
- Working with Prisma ORM and relational database concepts.
- Managing authentication and password security.
- Validating API requests and handling file uploads.
- Configuring email functionality and environment variables.
- Organizing TypeScript backend code.

## 👩‍💻 Author

**Maira Sattar**

- GitHub: [@maira-sattar](https://github.com/maira-sattar)

---

⭐ If you find this project useful, feel free to explore the repository and its implementation.
