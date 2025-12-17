import { body } from "express-validator";

export const addCategoryFormValidators = [
  body("categoryName")
    .trim()
    .notEmpty()
    .withMessage("Category cannot be empty.")
    .isLength({ min: 2, max: 30 })
    .withMessage("Category must be 2–30 characters.")
    .matches(/^[A-Za-z /-]+$/)
    .withMessage("Only letters, spaces, hyphens, and slashes are allowed."),
];
