import { Router } from "express";
import { getHomePage } from "../controllers/homeControllers.js";
export const homeRouter = Router();

homeRouter.get("/", getHomePage);
