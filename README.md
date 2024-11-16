# Contact Management System

## 📝 Overview
The Contact Management System is a full-stack application that allows users to manage their contacts efficiently. It includes features for adding, viewing, editing, and deleting contacts. The system is built with a **ReactJS frontend** and a **Node.js backend**, with data stored in a **MongoDB database**.

---

## 🚀 Features

- **Add New Contact:** Capture essential details like name, email, phone number, company, and job title.
- **View Contacts:** Display contacts in a sortable, paginated table with a clean Material UI interface.
- **Edit Contact Information:** Update contact details to ensure the data remains up-to-date.
- **Delete Contacts:** Remove outdated or duplicate entries to keep the contact list clean.
- **API Integration:** RESTful API endpoints to handle all CRUD operations seamlessly.
- **Error Handling:** Comprehensive validation for required fields and prevention of duplicate entries.

---

## 🛠️ Technologies Used

### Frontend
- **ReactJS**: Component-based UI development.
- **Material UI (MUI)**: Modern, responsive UI components.
- **Axios**: For handling API requests.

### Backend
- **Node.js**: Backend runtime environment.
- **Express**: Web application framework for routing and middleware.
- **Mongoose**: MongoDB object modeling for schema-based data interactions.
- **Zod**: Schema validation for input data.

### Database
- **MongoDB**: NoSQL database for flexible data storage.

---

## 🛠️ Dependencies

### Backend
The backend includes the following dependencies:
- **cors** (`^2.8.5`): Enables Cross-Origin Resource Sharing.
- **express** (`^4.21.1`): Simplifies server routing and middleware integration.
- **mongoose** (`^8.8.1`): Provides an object-oriented schema-based interface for MongoDB.
- **zod** (`^3.23.8`): Ensures input data validation using schemas.

### Dev Dependencies
- **nodemon** (`^3.1.7`): Monitors changes in the source code and restarts the server during development.

---

## 📜 Scripts

### Backend Scripts
- **`npm start`**: Starts the backend server in production mode using `node`.
- **`npm run dev`**: Starts the backend server in development mode using `nodemon`.

---

## 🔧 Setup Instructions

### Prerequisites
1. Install [Node.js](https://nodejs.org) and [npm](https://www.npmjs.com/).
2. Install MongoDB and ensure it is running locally or provide a cloud-based MongoDB URI.

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/contact-management.git
   cd contact-management
