#  ALCHE Club Management System

A full-stack web application designed for the **African Leadership College of Higher Education (ALCHE)** to manage student clubs, memberships, and campus organizations.

##  Project Overview
This system allows administrators to track all active clubs on campus, manage student enrollments, and maintain a digital directory of student leaders and participants.

### Tech Stack
- **Frontend:** React, Vite, CSS
- **Backend:** Node.js, Express.js
- **Database:** MySQL / PostgreSQL
- **Architecture:** MVC (Model-View-Controller)

---

##  Installation & Setup

### 1. Prerequisites
- Node.js (v16 or higher)
- MySQL or PostgreSQL installed and running

### 2. Database Setup
1. Open your database tool (e.g., MySQL Workbench).
2. Run the script located at `backend/config/schema.sql` to create the database, tables, and seed the initial ALCHE data.

### 3. Backend Setup
```bash
cd backend
npm install
# Create a .env file based on backend/.env and add your DB credentials
node app.js
```
The server will start on `http://localhost:3000`.

### 4. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
The website will be available at `http://localhost:5173`.

---

## 📐 Architecture (MVC)
The project follows the Model-View-Controller pattern to ensure scalability:

- **Models (`backend/models/`):** Define the data structure and database queries.
- **Controllers (`backend/controllers/`):** Handle the business logic and process API requests.
- **Views (Frontend):** The React application that renders the data for the user.
- **Routes (`backend/app.js`):** Map the API endpoints to the specific controllers.


