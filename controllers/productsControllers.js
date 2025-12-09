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
  let {
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

  res.render("products/addProductForm", { categoriesLinks: categoriesLinks });
}

export async function searchProducts(req, res) {
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
  const { productId } = req.params;
  const productDetails = await getProductFromDB(productId);

  /*   console.log("This is from get product: ", productDetails); */

  res.render("products/viewProductForm", {
    productDetails: productDetails,
  });
}

export async function getUpdateProductForm(req, res) {
  const { productId } = req.params;
  const productDetails = await getProductFromDB(productId);

  /*   console.log("This is from edit: ", productDetails);
   */
  res.render("products/editProductForm", {
    productDetails: productDetails,
  });
}

export async function updateProduct(req, res) {
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
