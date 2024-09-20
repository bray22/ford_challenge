# Ford Projects Manager

A project management web application built to fulfill the Ford Code Challenge requirements. It includes task and project management with user authentication.

## Getting Started

To get a local copy of the project up and running, follow these simple steps.

### Prerequisites

Ensure you have the following installed on your machine:

- [Node.js](https://nodejs.org/) (v14+ recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [Git](https://git-scm.com/)
- [PostgreSQL](https://www.postgresql.org/) (Ensure PostgreSQL is installed and running locally or use a remote PostgreSQL instance)

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/your-username/ford_projects_manager.git
    cd ford_projects_manager
    ```

2. Install dependencies for both the client and server:

    ```bash
    # Install server dependencies
    cd server
    npm install

    # Install client dependencies
    cd ../client
    npm install
    ```

3. Set up the PostgreSQL database:

    - Create a new PostgreSQL database:

      ```sql
      CREATE DATABASE ford_projects_manager;
      ```

    - Set up the necessary tables for the application (Refer to your database schema or migrations).

### Starting the Server

To run the backend server:

1. Navigate to the `server` directory:

    ```bash
    cd server
    ```

2. Start the server:

    ```bash
    node src/server.js
    ```

   If you're running a development environment, you can install `nodemon` for auto-restarting on code changes:

    ```bash
    npm install -g nodemon
    nodemon src/server.js
    ```

   The server should be running on `http://localhost:3333/`.

### Starting the Client

To run the React frontend client:

1. Navigate to the `client` directory:

    ```bash
    cd client
    ```

2. Start the client:

    ```bash
    npm start
    ```

   The client will run on `http://localhost:3000/` by default.

## Project Structure

```plaintext
ford_projects_manager/
├── client/           # React frontend
├── server/           # Node.js backend with API
└── README.md         # Project documentation

client/: Contains the React application code.
server/: Contains the Node.js/Express API and PostgreSQL connection logic.

## Environment Variables
You can define environment-specific variables in the .env file located in both the client and server directories. For example:

For the Server (server/.env)
