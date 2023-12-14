Notes App Backend
This repository contains the backend code for the Notes App, a full-stack web application for creating and managing personal notes. The backend is built with Node.js, Express, and MongoDB, and is deployed on Railway.
Features

- RESTful API endpoints for creating, retrieving, and deleting notes.
Integration with MongoDB for persistent storage of notes.
CORS enabled for frontend integration.
Deployment-ready configuration for Railway.
Prerequisites

Before you begin, ensure you have met the following requirements:
You have installed Node.js and npm.
You have a MongoDB database accessible.
You are familiar with basic CRUD operations and RESTful architecture.
Setting Up for Development

To set up the Notes App backend on your local machine, follow these steps:

1. Clone the repository:

git clone https://github.com/VamshiGardas/final-porject-backend.git
```
2. Navigate to the cloned repository:

cd notes-app-backend
```
3. Install dependencies:

npm install
```
4. Set up environment variables:

- Create a `.env` file in the root directory.
Add the following line, replacing `<your_mongodb_url>` with your MongoDB connection URL:

MONGODB_URL=<your_mongodb_url>
```
5. Run the server:

npm start
```
API Endpoints

The following endpoints are available:

- `GET /notes` - Retrieve all notes.
`POST /notes` - Create a new note. Requires `title`, `content`, `font`, and `color` in the request body.
`DELETE /notes/:id` - Delete a note with a given ID.
Deployment

The backend is deployed on Railway. You can deploy your own version by following Railway's deployment guidelines and linking your MongoDB database.
Contributing

Contributions to the Notes App backend are welcome. Please follow the standard fork-and-pull request workflow.
License

This project is licensed under the [MIT License](LICENSE.md)
