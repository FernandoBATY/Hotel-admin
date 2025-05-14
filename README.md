# Hotel Reservation Application

This project is a hotel reservation application that consists of three main components: backend, frontend, and database. Each component is organized into its own directory, allowing for a clear separation of concerns.

## Project Structure

```
hotel-reservation-app
├── backend
│   ├── src
│   │   ├── app.js          # Entry point for the backend application
│   │   ├── controllers     # Contains request handling logic
│   │   ├── routes          # Defines API routes
│   │   └── models          # Data models for the application
│   ├── package.json        # Backend dependencies and scripts
│   └── README.md           # Documentation for the backend
├── frontend
│   ├── src
│   │   ├── App.js          # Main component for the frontend application
│   │   ├── components       # Reusable components
│   │   └── pages           # Application pages
│   ├── package.json        # Frontend dependencies and scripts
│   └── README.md           # Documentation for the frontend
├── database
│   ├── migrations          # SQL scripts for database schema
│   │   └── init.sql       # Initialization script
│   ├── seeders             # SQL scripts for seeding data
│   │   └── seed.sql       # Seed data script
│   └── README.md           # Documentation for the database
└── README.md               # General documentation for the entire application
```

## Getting Started

To get started with the hotel reservation application, follow the instructions in the respective README files located in each component's directory.

### Prerequisites

- Node.js (for backend and frontend)
- A SQL database (for the database component)

### Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   cd hotel-reservation-app
   ```

2. Set up the backend:
   - Navigate to the `backend` directory and install dependencies:
     ```
     cd backend
     npm install
     ```

3. Set up the frontend:
   - Navigate to the `frontend` directory and install dependencies:
     ```
     cd frontend
     npm install
     ```

4. Set up the database:
   - Run the SQL scripts in the `database/migrations` and `database/seeders` directories to initialize and seed the database.

### Running the Application

- Start the backend server:
  ```
  cd backend
  npm start
  ```

- Start the frontend application:
  ```
  cd frontend
  npm start
  ```

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## License

This project is licensed under the MIT License.