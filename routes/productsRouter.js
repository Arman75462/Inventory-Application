import { Router } from "express";
import {
  getProducts,
  getAddProductForm,
  searchProducts,
  filterProducts,
  getProduct,
  addProduct,
  getUpdateProductForm,
  updateProduct,
  deleteProduct,
} from "../controllers/productsControllers.js";
import {
  addProductFormValidators,
  editProductFormValidators,
  getUpdateProductFormValidators,
  getProductValidators,
  filterProductsValidators,
  searchProductsValidators,
} from "../validators/productsValidators.js";
export const productsRouter = Router();

productsRouter.get("/", getProducts);
productsRouter.get("/new", getAddProductForm);
productsRouter.post("/new", addProductFormValidators, addProduct);
productsRouter.get("/search", searchProductsValidators, searchProducts);
productsRouter.get("/filter", filterProductsValidators, filterProducts);
productsRouter.get("/product/:productId", getProductValidators, getProduct);
productsRouter.get(
  "/edit/:productId",
  getUpdateProductFormValidators,
  getUpdateProductForm
);
productsRouter.post(
  "/edit/:productId",
  editProductFormValidators,
  updateProduct
);
productsRouter.post("/delete/:productId", deleteProduct);
