# Full Stack CRUD Application - Mid-Term Project

This project is a full-stack web application developed using the MERN stack (MongoDB, Express.js, React.js, Node.js). It provides a complete RESTful API and client interface for managing users, posts, todos, and photos.

## 🌐 Overview

The system is composed of:
- **Backend**: Node.js + Express.js server with a MongoDB database
- **Frontend**: React.js client that interacts with the backend via HTTP requests

## 📦 Technologies Used

- Node.js
- Express.js
- MongoDB + Mongoose
- React.js
- Postman (for API testing)

## 📁 Features

### Server (API)
- Full CRUD operations (`GET`, `POST`, `PUT`, `DELETE`) for:
  - Users (name, username, email, address, phone)
  - Posts (title, body)
  - Todos (title, tags, completed)
  - Photos (title, imageUrl)
- REST API tested via Postman
- Modular structure with Mongoose models

### Client (React)
- Home page with navigation to 4 sub-pages: Users, Posts, Todos, Photos
- Each sub-page allows:
  - Viewing a list sorted by ID
  - Filtering items by text or status
  - Creating new items via forms
  - Updating existing items
  - Deleting items
  - For Todos: toggle "completed" status and filter by completion

## 🚀 Running the Project

1. Clone the repository:
   ```bash
   git clone https://github.com/Tehila-m/Mid-term-project.git
