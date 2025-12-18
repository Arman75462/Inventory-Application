import {
  getProductsFromDB,
  getCategoriesLinksFromDB,
  searchProductsFromDB,
  filterProductsFromDB,
  getProductFromDB,
  addProductToDB,
  updateProductFromDB,
  deleteProductFromDB,
} from "../db/queries.js";
import { validationResult } from "express-validator";
import dotenv from "dotenv";
dotenv.config();

export async function getProducts(req, res) {
  const products = await getProductsFromDB();
  const categoriesLinks = await getCategoriesLinksFromDB();

  res.render("products/products", {
    products: products,
    categoriesLinks: categoriesLinks,
    filter: null, // 👈 default
    selectedCategories: [], // 👈 default
  });
}

export async function addProduct(req, res) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const categoriesLinks = await getCategoriesLinksFromDB();

    return res.status(400).render("products/addProductForm", {
      errors: errors.array(),
      oldInput: req.body,
      categoriesLinks,
    });
  }

  const {
    productName,
    productQuantity,
    productPrice,
    productDescription,
    productEmoji,
    productCategory,
  } = req.body;

  await addProductToDB(
    productName,
    productQuantity,
    productPrice,
    productDescription,
    productEmoji,
    productCategory
  );

  res.redirect("/products");
}

export async function getAddProductForm(req, res) {
  const categoriesLinks = await getCategoriesLinksFromDB();

  res.render("products/addProductForm", {
    categoriesLinks: categoriesLinks,
    oldInput: [],
  });
}

export async function searchProducts(req, res) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).render("partials/errors", {
      errors: errors.array(),
    });
  }

  const { searchQuery } = req.query;
  const products = await searchProductsFromDB(searchQuery);
  const categoriesLinks = await getCategoriesLinksFromDB();

  res.render("products/products", {
    products: products,
    categoriesLinks: categoriesLinks,
    filter: null, // 👈 default
    selectedCategories: [], // 👈 default
  });
}

export async function filterProducts(req, res) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).render("partials/errors", {
      errors: errors.array(),
    });
  }

  const { filter, categories } = req.query;

  // Normalize categories to always be an array
  const categoryList = Array.isArray(categories)
    ? categories
    : categories
    ? [categories]
    : [];

  const filteredProducts = await filterProductsFromDB(filter, categoryList);
  const categoriesLinks = await getCategoriesLinksFromDB();

  res.render("products/products", {
    products: filteredProducts,
    categoriesLinks,
    filter,
    selectedCategories: categoryList,
  });
}

export async function getProduct(req, res) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    // productId param failed validation
    return res.status(400).render("partials/errors", {
      errors: errors.array(),
    });
  }

  const { productId } = req.params;
  const productDetails = await getProductFromDB(productId);

  if (!productDetails) {
    // No product found → handle gracefully
    return res
      .status(404)
      .send(
        "<h1 style='color: red'>Product ID does not exist</h1> <p>The product you are trying to find could not be found.</p> <a href='/products'><button>Return to products page</button></a>"
      );
  }

  res.render("products/individualProduct", {
    productDetails: productDetails,
    query: req.query,
  });
}

export async function getUpdateProductForm(req, res) {
  const { productId } = req.params;
  const productDetails = await getProductFromDB(productId);

  if (!productDetails) {
    // No product found → handle gracefully
    return res
      .status(404)
      .send(
        "<h1 style='color: red'>Product ID does not exist</h1> <p>The product you are trying to edit could not be found.</p> <a href='/products'><button>Return to products page</button></a>"
      );
  }

  res.render("products/editProductForm", {
    productDetails: productDetails,
    oldInput: null, // Initialize oldInput as null (not []) so the form shows productDetails on first render. Using [] would make old values default to empty strings.
  });
}

export async function updateProduct(req, res) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const productDetails = await getProductFromDB(req.params.productId);

    return res.status(400).render("products/editProductForm", {
      errors: errors.array(),
      oldInput: req.body,
      productDetails,
    });
  }

  const { newProductPrice, newProductDescription, newProductQuantity } =
    req.body;
  const { productId } = req.params;

  await updateProductFromDB(
    newProductPrice,
    newProductDescription,
    newProductQuantity,
    productId
  );

  res.redirect(`/products/product/${productId}`);
}

export async function deleteProduct(req, res) {
  const { adminPassword } = req.body;
  const { productId } = req.params;

  if (adminPassword !== process.env.ADMIN_PASSWORD) {
    return res.status(403).send(
      `Wrong password: ${adminPassword} 
        </br>
        <a href='/products/product/${productId}'>Go back</a>`
    );
  }

  await deleteProductFromDB(productId);

  res.redirect("/products");
}
