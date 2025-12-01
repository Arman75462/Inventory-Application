import { Router } from "express";
export const categoriesRouter = Router();

categoriesRouter.get("/", (req, res) => {
  res.send("<h1>Categories page</h1>");
});
