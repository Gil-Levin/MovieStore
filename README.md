# MovieStore - Online Movie Store

## Table of Contents

-   [Overview](#overview)

-   [Features](#features)

    -   [Database Management](#database-management)
    
    -   [Client-Side](#client-side)

    -   [Server-Side](#server-side)

    -   [Bonus](#bonus)

-   [Prerequisites](#prerequisites)

-   [Setup](#setup)

    -   [Step 1: Install Prerequisites](#step-1-install-prerequisites)

    -   [Step 2: Clone the Repository](#step-2-clone-the-repository)

    -   [Step 3: Backend Configuration](#step-3-backend-configuration)

    -   [Step 4: Frontend Configuration](#step-4-frontend-configuration)

-   [Potential Bugs](#potential-bugs)

-   [API Endpoints](#api-endpoints)

-   [Authors](#authors)

-   [License](#license)

## Overview

- **Site Overview**: Movie Store is a full-stack web application 

- **User Features**: Users of Movie Store enjoy a range of functionalities, including the ability to register and log in, edit their profile image and information, search sort and filter products, add items to their cart, modify quantities, place orders.

- **Administrator Capabilities**: Administrators on Movie Store have access to extensive management features. These include viewing and editing user profiles, assigning roles, complete CRUD operations for product management.

## Features

### Database Management

-   MySQL for data storage

-   CRUD and JOIN operations with Entity Framework (EF)

-   Validation with max lengths and non-null constraints

### Client-Side

-   Built with React

-   Dynamic navigation and footer

-   Features like login, CRUD operations, and search

-   React-Bootstrap for styling

### Server-Side

-   Built with ASP.NET Core

-   JWT Token authentication

-   OOP Principles and modularity

-   Logging logfile with singleton pattern

-   Repository pattern

### Bonus

-   CSS & React-Bootstrap for styling

-   State management via UseContext

-   Logging logfile on server-side

-   React Icons

## Prerequisites

-   **[Node.js (includes npm)](https://nodejs.org/en)**: React development and package management.

-   **[Visual Studio](https://visualstudio.microsoft.com/downloads)**: Includes .NET 7.0, ASP.NET, web development workloads.

-   **[dotnet-ef](https://docs.microsoft.com/en-us/ef/core/cli/dotnet)**: Entity Framework Core tools for database operations.

-   **[MySQL Server & Workbench](https://dev.mysql.com/downloads/installer/)**: Database management.

-   **[.NET 7.0 SDK](https://dotnet.microsoft.com/en-us/download/dotnet/7.0)**: Backend development.

-   **[GIT](https://git-scm.com/download)**: Version control.

## Setup

### Step 1: Install Prerequisites

Ensure these tools are installed on your computer before proceeding:

1. **GIT**: [Download and Install](https://git-scm.com/download)

2. **Visual Studio**: Include .NET 7.0, ASP.NET, and web development workloads. [Download and Install](https://visualstudio.microsoft.com/downloads)

3. **MySQL**: Opt for the "Full" option. [Download and Install](https://dev.mysql.com/downloads/installer/)

    - **Post-Installation**: Use MySQL Workbench to verify server availability at `localhost:3306` with your set username and password.

4. **Node.js**: [Download and Install](https://nodejs.org/en)

### Step 2: Clone the Repository

Clone the project to your desired location using CMD:

```cmd
cd PATH_TO_YOUR_DESIRED_LOCATION

git clone https://github.com/Gil-Levin/MovieStore
```

### Step 3: Backend Configuration

Set up and run the backend service:

1. **Open Solution File**: Locate and open MovieStore_API.sln in MovieStore/MovieStore_api using Visual Studio.

2. **Configure User Secrets**:

    - Right-click `moviestore_api` > `Manage User Secrets`.

    - Paste the following JSON structure:

        ```json
        {
          "ConnectionStrings": {
            "DefaultConnection": "Server=localhost;Database=movie_store_db;User=root;Password=SERVER_PASSWORD;"
          },
          "Jwt": {
            "Issuer": "MovieStore_API",
            "Audience": "MovieStore_app",
            "Secret":  "HMACSHA256_KEY_FOR_AUTHENTICATION"
          }
        }
        ```
    - Replace `HMACSHA256_KEY_FOR_AUTHENTICATION` with your secret JWT key.

    - Update `SERVER_PASSWORD` to match your MySQL server password.

3. **Initialize Backend** (via CMD):

    ```cmd

    Open: On the top navigation bar => Tools => NuGet Package Manager

    dotnet tool install --global dotnet-ef --version 7.0.0

    dotnet ef database update

    dotnet run
    
    ```

### Step 4: Frontend Configuration

Prepare the frontend application in CMD:

1. **Configure and Launch Frontend**:
    ```cmd
    In visual studio code right click on moviestore-app => Open in intgrated Terminal

    Use the commands:

    npm i react-scripts

    npm start

    *** Make sure that when the frontend is running, the backend swagger is running too. ***

   ```

2. **Accessing the Site**:

    - To log in as an administrator, use the following credentials on the login page:

        - email: `admin1234@gmail.com`

        - Password: `Secretword0`

    - Alternatively, you can register as a new user on the registration page.

## Potential Bugs

- After configuring the frontend and backend, sometimes when running `npm start`, you might encounter errors saying it can't find a file named /AuthContext.
In that case, under the moviestore-app folder => src => context => Rename `authContext` to `AuthContext`.

- Additionally, when logging in as an admin for the first time, the Users section on the Manage page may not display all users. If this happens, try logging out and logging back in.
  
**These bugs happen for an unknown reason as far as I can tell for now.**

## API Endpoints

### Users

-   `GET /Users`: Get all users (requires authorization).

-   `GET /Users/{id}`: Get a user by id (anonymous access).

-   `PUT /Users/{id}`: Update a user's information (anonymous access).

-   `POST /Users`: Create a new user (anonymous access).

-   `DELETE /Users/{id}`: Delete a user (requires authorization).

-   `GET /Users/profile`: Get the authenticated user's profile (requires authorization).

-   `GET /Users/check`: Check if a username or email exists (anonymous access).

### Products

-   `GET /Products`: Get all products (anonymous access).

-   `GET /Products/{id}`: Get a product by id (anonymous access).

-   `PUT /Products/{id}`: Update a product (anonymous access).

-   `POST /Products`: Create a product (anonymous access).

-   `DELETE /Products/{id}`: Delete a product (anonymous access).

### Orders

-   `GET /Orders`: Get all order items (anonymous access).

-   `GET /Orders/{id}`: Get order item by id (anonymous access).

-   `PUT /Orders/{id}`: Update an order by ID (anonymous access).

-   `POST /Orders`: Create a new order (anonymous access).

-   `DELETE /Orders/{id}`: Delete an order by ID (anonymous access).

### Items

-   `GET /Items/{id}`: Get a cart item by id (anonymous access)

-   `PUT /Items/{id}`: Update an item by ID (anonymous access).

-   `DELETE /Items/{id}`: Delete an item by ID (anonymous access).

-   `POST /Items`: Create a cart item (anonymous access)

### Login

-   `Post /Login`: Authenticate a user and return a JWT token (anonymous access).

## Authors

-  Gil Levin

## License

This project is licensed under the MIT License.
