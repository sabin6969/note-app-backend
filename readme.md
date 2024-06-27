# Note App Backend

This repository contains the backend for a Note App, built with Express.js, MongoDB, and deployed on Railway. This backend API allows users to sign up, log in, manage their profile with an image stored on Cloudinary, and perform CRUD operations on notes.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [API Documentation](#api-documentation)
- [Deployment](#deployment)

## Features

- **User Authentication**: Secure login and registration with profile image upload.
- **Profile Image Storage**: Images are stored on Cloudinary.
- **CRUD Operations**: Create, Read, Update, and Delete notes.
- **Session and Cookie Management**: Handle user sessions securely.

## Tech Stack

- **Backend Framework**: Express.js
- **Database**: MongoDB
- **Deployment**: Railway
- **Authentication**: JSON Web Tokens (JWT)
- **File Storage**: Cloudinary

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (Local or Atlas)
- Cloudinary Account

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/sabin6969/note-app-backend
   cd note-app-backend
   ```

2. Install NPM packages:
   ```bash
   npm install
   ```

3. Set up environment variables (see [Environment Variables](#environment-variables)).

4. Start the server:
   ```bash
   npm start
   ```

The server should now be running on `http://localhost:3000`.

## Environment Variables

Create a `.env` file in the root directory and add the following environment variables:

```plaintext
MONGODB_URI = URL_HERE
PORT = PORT_NUMBER_HERE
CLOUDINARY_CLOUD_NAME = CLOUDINARY CLOUD NAME HERE
CLOUDINARY_API_KEY = CLOUDINARY API KEY HERE
CLOUDINARY_API_SECRET = CLOUDINARY API SECRET HERE
ACCESS_TOKEN_SECRET = ACCESS TOKEN SECRET HERE
REFRESH_TOKEN_SECRET = REFRESH TOKEN SECRET HERE
ACCESS_TOKEN_EXPIRY = ACCESS TOKEN EXPIRY HERE
REFRESH_TOKEN_EXPIRY = REFRESH TOKEN EXPIRY HERE
```

## API Documentation

### Authentication

#### Register a new user

```http
POST /api/v1/user/createAccount
```

- **Headers**: `Content-Type: multipart/form-data`
- **Request Body**:
  - `email`: `email`
  - `password`: `yourpassword`
  - `profileImage`: File upload for profile image


#### Login

```http
POST /api/v1/user/login
```

- **Request Body**:
  ```json
  {
    "email": "youremail",
    "password": "yourpassword"
  }
  ```



#### Logout

```http
POST /api/v1/user/logout
```

- **Headers**:
  ```plaintext
  Authorization: Bearer jwt_token
  ```


#### Verify Access Token

```http
POST /api/v1/auth/verifyAccesstoken
```

- **Headers**:
  ```plaintext
  Authorization: Bearer jwt_token
  ```

### Notes

#### Get all notes

```http
GET /api/v1/note/getAllNotes
```

- **Headers**:
  ```plaintext
  Authorization: Bearer jwt_token
  ```

#### Create a new note

```http
POST /api/v1/note/createNote
```

- **Headers**:
  ```plaintext
  Authorization: Bearer jwt_token
  ```

- **Request Body**:
  ```json
  {
    "noteTitle": "note_title",
    "noteDescription": "note_content"
  }
  ```


#### Update a note

```http
PATCH /api/v1/note/updateNote/:noteId
```

- **Headers**:
  ```plaintext
  Authorization: Bearer jwt_token
  ```

- **Request Body**:
  ```json
  {
    "noteTitle": "new_title",
    "noteDescription": "new_content"
  }
  ```

  ```

#### Delete a note

```http
DELETE /api/v1/note/deleteNote/:noteId
```

- **Headers**:
  ```plaintext
  Authorization: Bearer jwt_token
  ```

