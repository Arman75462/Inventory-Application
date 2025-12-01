import { Client } from "pg";
import dotenv from "dotenv";
dotenv.config();

const SQL = `
CREATE TABLE IF NOT EXISTS categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

INSERT INTO categories (name)
VALUES 
    ('Fruits'),
    ('Vegetables'),
    ('Dairy'),
    ('Snacks'),
    ('Beverages'),
    ('Meat'),
    ('Fish');

CREATE TABLE IF NOT EXISTS items (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    quantity INT NOT NULL,
    price NUMERIC(10,2) NOT NULL,
    description VARCHAR(255) NOT NULL,
    category_id INT NOT NULL,
    FOREIGN KEY (category_id) REFERENCES categories(id)
); `;

async function main() {
  console.log("seeding...");
  const client = new Client({
    connectionString: `postgres://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@${process.env.DATABASE_HOST}/${process.env.DATABASE_NAME}`,
    /*     ssl: {
      rejectUnauthorized: true,
    }, */
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done");
}

main();
