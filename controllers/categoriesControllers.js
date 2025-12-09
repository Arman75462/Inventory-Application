import { getCategoriesLinksFromDB, addCategoryToDB } from "../db/queries.js";

export async function getCategoriesLinks(req, res) {
  const categoriesLinks = await getCategoriesLinksFromDB();

  res.render("categories/categories", { categoriesLinks: categoriesLinks });
}

export function getAddCategoryForm(req, res) {
  res.render("categories/addCategoryForm");
}

export async function addCategory(req, res) {
  const { categoryName, labelColor } = req.body;
  await addCategoryToDB(categoryName, labelColor);

  res.redirect("/categories");
}
