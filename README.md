# **Product Management Application**

A simple full-stack web application for managing products. It includes features for displaying, creating, editing, deleting, sorting, searching, and paginating products. The app consists of:

1. **Frontend:** Angular application for user interaction.
2. **Backend:** Flask API for handling product data.
3. **Database:** PostgreSQL database for storing product information.

---

## **Features**

- Display a list of products in a table.
- Sort products by ID, Name, Type, Price, or Description.
- Search products by name.
- Paginate the product list (3 items per page).
- Create a new product.
- Edit existing product details.
- Delete a product from the database.

---

## **Requirements**

- **Docker:** Ensure Docker and Docker Compose are installed.
- **Browser:** Any modern web browser (e.g., Chrome, Firefox).

---

## **How to Run the Application**

1. **Clone the Repository**
   ```bash
   git clone <repository-url>
   cd <repository-directory>

2. **Start the Application Use Docker Compose to build and run the services (Frontend, Backend, and Database):**
    ```bash
    docker-compose up --build

3. **Access the Application**
- Open the Angular frontend in your browser: http://localhost:8080.
- The Flask backend API runs on: http://localhost:5001.

---

## **Application Overview**
1. Frontend (Angular)
URL: http://localhost:8080
Features:
    - Display and manage products.
    - Sort and search products.
    - Paginate product list.

2. Backend (Flask API)
URL: http://localhost:5001
API Endpoints:
    - GET /products: Fetch all products.
    - POST /products: Create a new product.
    - PUT /products/<id>: Update a product.
    - DELETE /products/<id>: Delete a product.

3. Database (PostgreSQL)
- Stores product data.
- Auto-initialized with a sample table and products on first run.

4. How to Stop the Application
Stop the running containers:
    ```bash
    docker-compose down
    docker volume rm <volume-name> ##(Remove any persistent data)

5. Future Improvements
- Add user authentication for secure access.
- Implement server-side pagination for large datasets.
- Enhance error handling and validation on both frontend and backend.