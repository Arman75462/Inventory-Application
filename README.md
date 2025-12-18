# Frootie Inventory Application

Frootie is a full-stack inventory management application built to manage grocery-style products and categories. It allows users to add, edit, search, filter, and delete products while keeping data persistent using a PostgreSQL database.

The project follows a clean MVC structure and uses server-side rendering with EJS.

---

## Tech Stack

- **Frontend**: HTML, CSS, EJS
- **Backend**: Node.js, Express.js
- **Database**: PostgreSQL (`pg`)
- **Validation**: express-validator
- **Environment Variables**: dotenv

---

## Features

### Products

- View all products with category labels and colors
- View individual product details
- Add new products with backend validation
- Edit product price, quantity, and description with backend validation
- Delete products (admin-password protected)
- Search products by name
- Filter products (with backend validation) by:
  - Category (single or multiple)
  - Price (ascending / descending)
  - Name (ascending / descending)

### 🗂 Categories

- View all categories
- Create new categories with custom label colors
- Categories are linked to products via foreign keys

### 🧠 UX & Data Safety

- Server-side form validation with detailed error messages
- Form input persistence on validation errors
- Graceful handling of invalid or non-existent product IDs
- SQL injection protection using parameterized queries
- Whitelisted sorting logic for safe dynamic queries

---

## 🗄 Database Schema

### Categories Table

```sql
CREATE TABLE categories (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL UNIQUE,
  color VARCHAR(7) NOT NULL
    CHECK (color ~ '^#[0-9A-Fa-f]{6}$')
);
```

```sql
CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL UNIQUE,
  quantity INT NOT NULL,
  price NUMERIC(10,2) NOT NULL,
  description VARCHAR(255) NOT NULL,
  emoji VARCHAR(4) NOT NULL,
  category_id INT NOT NULL,
  FOREIGN KEY (category_id) REFERENCES categories(id)
);
```

---

## Routing Overview

### Products

GET /products
GET /products/new
POST /products/new
GET /products/search
GET /products/filter
GET /products/product/:productId
GET /products/edit/:productId
POST /products/edit/:productId
POST /products/delete/:productId

### Categories

GET /categories
GET /categories/new
POST /categories/new

### Home

GET /

## What This Project Demonstrates

- MVC architecture with Express
- PostgreSQL relational data modeling
- Safe SQL queries with parameterized inputs
- Backend form validation using express-validator
- Server-side rendering with EJS
- Clean routing and controller separation
- Real-world CRUD functionality
