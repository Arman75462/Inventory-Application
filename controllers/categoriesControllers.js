import { getCategoriesLinksFromDB, addCategoryToDB } from "../db/queries.js";
import { validationResult } from "express-validator";

export async function getCategoriesLinks(req, res) {
  const categoriesLinks = await getCategoriesLinksFromDB();

  res.render("categories/categories", { categoriesLinks: categoriesLinks });
}

export function getAddCategoryForm(req, res) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).render("categories/addCategoryForm", {
      errors: errors.array(),
      oldInput: req.body,
    });
  }

  res.render("categories/addCategoryForm");
}

export async function addCategory(req, res) {
  const { categoryName, labelColor } = req.body;
  await addCategoryToDB(categoryName, labelColor);

  res.redirect("/categories");
}
