
# 🎓 University Management System (UMS)

## Group 07 | South Eastern University Of Sri Lanka

**Subject**: SWT31012: Software Engineering  
**Instructor**: Fathima Musfira  

### 👥 Group Members:
- SEU/IS/20/ICT/084 - P.R.P.S. Kalhara  
- SEU/IS/20/ICT/083 - Pabodha Sewwandi  
- SEU/IS/20/ICT/088 - Dinusha Sewmini  
- SEU/IS/20/ICT/086 - Lasandi Mihara  
- SEU/IS/20/ICT/081 - P. Niroshan  

---

## 📌 Project Description

University Management System (UMS) is a web-based platform to digitally manage all major academic and administrative operations within a university, including admissions, faculty, students, examinations, and finances.

---

## 🎯 Objectives

- Centralized academic platform.  
- Facilitate communication among students, faculty, and admin.  
- Automate routine academic processes.  
- Ensure data integrity and security.

---

## 🔧 Tools and Technologies

| Area        | Tools                             |
|-------------|------------------------------------|
| Frontend    | React                              |
| Backend     | PHP (Laravel)                      |
| Database    | MySQL                              |
| Auth        | JWT / Laravel Auth                 |
| Hosting     | Apache                             |
| Design      | Figma                              |
| Versioning  | GitHub                             |

---

## 🔐 User Roles

| Role            | Access Description                        |
|------------------|--------------------------------------------|
| Admin            | Full access, system management             |
| Faculty          | Course and grade management                |
| Student          | View personal and academic information     |
| Accountant       | Manage financial records                   |
| IT Staff         | Maintain the system backend                |
| Examination Cell | Exam and result management                 |

---

## 📁 Major Modules

- Student Module  
- Faculty Module  
- Admin Panel  
- Exam & Results  
- Financial Management  
- Library (optional)

---

## 🛡️ Security Features

- Role-Based Access Control (RBAC)  
- CSRF/XSS Protection  
- Password Hashing  
- Input Validation  
- Audit Logs  

---

## 🧪 Testing Types

- Unit Testing  
- Integration Testing  
- User Acceptance Testing (UAT)  
- Bug Tracking via Trello/JIRA  

---

## 📊 ER Diagram & Data Dictionary

### Basic Tables:

```sql
students (id, name, course_id)  
courses (course_id, course_name)  
results (student_id, course_id, marks)  
```

---

## 🚀 How to Run This Project Locally

### 📦 Prerequisites

Make sure you have the following installed:

- PHP >= 8.1  
- Composer  
- Node.js (v16+)  
- NPM or Yarn  
- MySQL or MariaDB  
- Git  
- Laravel CLI  
- Apache / XAMPP / Laragon (or Valet)

---

## 📁 Folder Structure

```
university-management-system/
│
├── backend/     # Laravel app
└── frontend/    # React app
```

---

## 🛠️ Backend Setup (Laravel)

```bash
# Go to backend folder
cd backend

# Install PHP dependencies
composer install

# Copy and configure .env file
cp .env.example .env

# Set your DB credentials in .env
# DB_DATABASE=vle
# DB_USERNAME=root
# DB_PASSWORD=

# Generate Laravel app key
php artisan key:generate

# Run migrations
php artisan migrate

# (Optional) Seed dummy data
php artisan db:seed

# Start the Laravel server
php artisan serve
```

---

## 🖥️ Frontend Setup (React)

```bash
# Go to frontend folder
cd ../frontend

# Install JavaScript dependencies
npm install

# Start React development server
npm start
```

---

## ⚙️ Environment Configuration

Update `.env` in your React frontend:

```env
REACT_APP_API_URL=http://127.0.0.1:8000/api
```

---

## 📌 API & Frontend Connection

- Make sure **CORS is enabled** in Laravel (`HandleCors.php` or `fruitcake/laravel-cors`).  
- All API routes should return **JSON** and be prefixed with `/api`.

---

## ✅ Final Notes

- Ensure the database (`ums`) is created before migrations.  
- Use **Postman** or **Insomnia** to test API routes.  
- React and Laravel must run concurrently.  
- Use `npm run build` for production frontend build and serve it from Laravel/public if needed.

---

## 📬 Troubleshooting

### CORS Errors:
Install and configure Laravel CORS package:
```bash
composer require fruitcake/laravel-cors
```

### Permission Issues:
```bash
chmod -R 775 storage
chmod -R 775 bootstrap/cache
```

### React Can't Connect to API:
- Confirm Laravel is running at `http://127.0.0.1:8000`  
- Check `REACT_APP_API_URL` in React `.env`

---

## 📄 License

MIT License (or choose your preferred license)
