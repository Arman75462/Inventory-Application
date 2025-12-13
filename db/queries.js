import pool from "./pool.js";

export async function getProductsFromDB() {
  const { rows } = await pool.query("SELECT * FROM products;");

  return rows;
}

export async function getProductFromDB(id) {
  const { rows } = await pool.query(
    `SELECT products.id, products.name, products.quantity, products.price,
       products.description, products.emoji, categories.name AS category, categories.color
     FROM products
     INNER JOIN categories
       ON products.category_id = categories.id
     WHERE products.id = $1;`,
    [id]
  );

  return rows[0];
}

export async function addProductToDB(
  productName,
  productQuantity,
  productPrice,
  productDescription,
  productEmoji,
  productCategory
) {
  // Finds the productCategory id for product table which only takes an integer for category_id column
  const { rows } = await pool.query(
    "SELECT id FROM categories WHERE name = $1",
    [productCategory]
  );

  const categoryId = rows[0].id;

  await pool.query(
    "INSERT INTO products (name, quantity, price, description, emoji, category_id) VALUES ($1, $2, $3, $4, $5, $6)",
    [
      productName,
      productQuantity,
      productPrice,
      productDescription,
      productEmoji,
      categoryId,
    ]
  );
}

export async function updateProductFromDB(
  newProductPrice,
  newProductDescription,
  newProductQuantity,
  productId
) {
  await pool.query(
    "UPDATE products SET price = $1, description = $2, quantity = $3 WHERE id = $4;",
    [newProductPrice, newProductDescription, newProductQuantity, productId]
  );
}

export async function deleteProductFromDB(productId) {
  await pool.query("DELETE FROM products WHERE id = $1", [productId]);
}

export async function getCategoriesLinksFromDB() {
  const { rows } = await pool.query("SELECT * FROM categories;");

  return rows;
}

export async function addCategoryToDB(categoryName, labelColor) {
  await pool.query("INSERT INTO categories (name, color) VALUES ($1, $2)", [
    categoryName,
    labelColor,
  ]);
}

export async function searchProductsFromDB(searchQuery) {
  const { rows } = await pool.query(
    "SELECT * FROM products WHERE name ILIKE $1",
    [`${searchQuery}%`]
  );

  return rows;
}

export async function filterProductsFromDB(filter, categoryList = []) {
  // Sorting whitelist
  const sortMap = {
    priceAscending: ["price", "ASC"],
    priceDescending: ["price", "DESC"],
    nameAscending: ["name", "ASC"],
    nameDescending: ["name", "DESC"],
  };

  const [column, direction] = sortMap[filter] || ["name", "ASC"];

  // Base query
  let sql = `
    SELECT products.id, products.name, products.quantity, products.price,
      products.description, categories.name AS category, categories.color
    FROM products
    INNER JOIN categories
      ON products.category_id = categories.id
  `;

  const params = [];

  // Filter by category *name* (from categories table)
  if (categoryList.length > 0) {
    const placeholders = categoryList.map((_, i) => `$${i + 1}`).join(", ");

    sql += ` WHERE categories.name IN (${placeholders})`;

    params.push(...categoryList);
  }

  // Safe ORDER BY using pre-validated column + direction
  sql += ` ORDER BY ${column} ${direction}`;

  const { rows } = await pool.query(sql, params);
  return rows;
}
