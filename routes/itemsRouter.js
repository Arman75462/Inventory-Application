import { Router } from "express";
export const itemsRouter = Router();

itemsRouter.get("/", (req, res) => {
  res.send("<h1>Items page</h1>");
});
