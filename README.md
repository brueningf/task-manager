# Task Manager - Full Stack Application

## Deployment
- **Frontend**: [Task-Manager](https://task-manager10.netlify.app/).
- **API Docs**: [Docs](https://task-manager-nmxz.onrender.com/api-docs/) 

## Description
The "Task Manager" application allows users to manage their tasks through an intuitive interface. Users can create, read, update, and delete tasks, and mark tasks as completed or pending.
The frontend is built with React, and the backend uses Node.js, MongoDB, and Express.

## Implemented Features
### Backend
- **Task CRUD**: Users can create, read, update, and delete tasks.
- **Filtering**: Tasks can be filtered by status (completed or pending).
- **Validation and error handling**: Implemented using `express-validator` and structured error handling.
- **API Documentation**: Endpoints are documented with Swagger for easy reference. 

### Frontend
- **React.js** with **TailwindCSS**.
- **User interface**: A task list displaying the title, status, and creation date. Features to edit and delete tasks.
- **New Task Form**: Allows users to add new tasks.
- **Status Management**: Users can mark tasks as completed or pending from the list.
- **Filtering**: Tasks can be viewed filtered by completed, pending, or all.
- **Responsive Design**: Optimized for both mobile and desktop devices.

## Pending Features
- **JWT Authentication** to protect the backend endpoints
- **Unit Tests** for the backend using **Jest** and for the frontend using **React Testing Library**.
- **Animations** to enhance the user experience.

## Local Installation

### Prerequisites
Make sure to have the following installed:
- **Node.js** and **npm**.
- **MongoDB** or a cloud MongoDB URL.

### Steps for the Backend
1. Clone the repository:
   ```bash
   git clone <REPOSITORY_URL>
   cd backend
   ```
2. Install the dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root directory and add the following:
   ```env
   DATABASE_URL=<YOUR_MONGODB_URL>
   ```
4. Start the server:
   ```bash
   npm start
   ```
### Steps for the Frontend
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install the dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm start
   ```

