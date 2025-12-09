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
export const productsRouter = Router();

productsRouter.get("/", getProducts);
productsRouter.get("/new", getAddProductForm);
productsRouter.post("/new", addProduct);
productsRouter.get("/search", searchProducts);
productsRouter.get("/filter", filterProducts);
productsRouter.get("/product/:productId", getProduct);
productsRouter.get("/edit/:productId", getUpdateProductForm);
productsRouter.post("/edit/:productId", updateProduct);
productsRouter.post("/delete/:productId", deleteProduct);
