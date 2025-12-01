import { Router } from "express";
export const indexRouter = Router();

indexRouter.get("/", (req, res) => {
  res.send("<h1>Index page</h1>");
});
