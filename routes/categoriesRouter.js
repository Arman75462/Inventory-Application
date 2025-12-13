import { Router } from "express";
import {
  getCategoriesLinks,
  getAddCategoryForm,
  addCategory,
} from "../controllers/categoriesControllers.js";
import { addCategoryFormValidators } from "../validators/categoriesValidators.js";
export const categoriesRouter = Router();

categoriesRouter.get("/", getCategoriesLinks);
categoriesRouter.get("/new", getAddCategoryForm);
categoriesRouter.post("/new", addCategoryFormValidators, addCategory);
