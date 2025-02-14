# User Registration and Authentication System

This project is a small web application built using Express.js and MongoDB to handle user registration, login, and user information retrieval. The application uses JWT for authentication and validation.

## Features

- User Registration: Register a new user with username, password, full name, gender, date of birth, and country.
- User Login: Authenticate users and generate JWT tokens.
- Search User: Search for a user by username or email.
- Retrieve User Info: Retrieve full user information after login.

## Tech Stack

- **Backend**: Express.js (Node.js)
- **Database**: MongoDB
- **Authentication**: JWT
- **Validation**: Server-side validation
- **Language**: TypeScript

## Project Structure

```
src
├── controllers
│   ├── authController.ts
│   └── userController.ts
├── middlewares
│   └── authMiddleware.ts
├── models
│   └── userModel.ts
├── routes
│   ├── authRoutes.ts
│   └── userRoutes.ts
├── utils
│   ├── db.ts
│   └── validation.ts
├── app.ts
.env
```

## Endpoints

1. **User Registration**: `POST /api/auth/register`
2. **User Login**: `POST /api/auth/login`
3. **Search User**: `GET /api/users/search`
4. **Retrieve User Info**: `GET /api/users/:id`

## Getting Started

### Prerequisites

- Node.js
- MongoDB
- Postman

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/POBOROJO/UserSearchAuth.git
   cd UserSearchAuth
   ```

2. Install dependencies:
   ```bash
   npm install or pnpm install
   ```

3. Set up environment variables in a `.env` file:
   ```
   PORT=3000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ```

4. Start the server:
   ```bash
   npm start
   ```

### Usage

1. **Register a User**:
   - Endpoint: `POST /api/auth/register`
   - Body:
     ```json
     {
       "username": "exampleuser",
       "password": "examplepassword",
       "fullName": "Example User",
       "gender": "Male",
       "dateOfBirth": "1990-01-01",
       "country": "USA"
     }
     ```

2. **Login**:
   - Endpoint: `POST /api/auth/login`
   - Body:
     ```json
     {
       "username": "exampleuser",
       "password": "examplepassword"
     }
     ```

3. **Search User**:
   - Endpoint: `GET /api/users/search?username=exampleuser`
   - Headers:
     ```json
     {
       "Authorization": "Bearer your_jwt_token"
     }
     ```

4. **Retrieve User Info**:
   - Endpoint: `GET /api/users/:id`
   - Headers:
     ```json
     {
       "Authorization": "Bearer your_jwt_token"
     }
     ```

## Postman

Use Postman to test the APIs. Import the provided Postman collection to test the endpoints.

## Video Walkthrough

Watch the full video walkthrough to see the source codes, output, Postman results, and database interactions.

[Video Walkthrough Link](https://www.loom.com/share/c57ab71dc15a4bcfb82bf4e4bde324ce?sid=429085b1-59e8-4286-b3d9-72ad275b22bc)

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## License

This project is licensed under the MIT License.