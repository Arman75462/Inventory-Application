import { body, param, query } from "express-validator";
import { getCategoriesLinksFromDB } from "../db/queries.js";

export const addProductFormValidators = [
  // PRODUCT NAME
  body("productName")
    .trim()
    .notEmpty()
    .withMessage("Product name cannot be empty.")
    .isLength({ min: 2, max: 30 })
    .withMessage("Product name must be 2–30 characters.")
    .matches(/\S/)
    .withMessage("Product name cannot be only spaces."),

  // QUANTITY
  body("productQuantity")
    .trim()
    .notEmpty()
    .withMessage("Quantity is required.")
    .isInt({ min: 1, max: 10000 })
    .withMessage("Quantity must be between 1 and 10000."),

  // PRICE
  body("productPrice")
    .trim()
    .notEmpty()
    .withMessage("Price is required.")
    .isFloat({
      min: 0,
      max: 1000,
      decimal_digits: "0,2",
    })
    .withMessage(
      "Price must be between 0 and 1000 and have max 2 decimal places."
    ),

  // DESCRIPTION
  body("productDescription")
    .trim()
    .notEmpty()
    .isLength({ max: 100 })
    .withMessage("Description cannot exceed 100 characters."),

  // EMOJI
  body("productEmoji")
    .trim()
    .notEmpty()
    .withMessage("Emoji is required.")
    .custom((value) => {
      const regex = emojiRegex();
      const matches = value.match(regex);

      if (!matches) {
        throw new Error("You must provide a valid emoji.");
      }

      // ensure exactly one emoji (grapheme)
      if (matches.length !== 1) {
        throw new Error("Only one emoji allowed.");
      }

      return true;
    }),
];

export const editProductFormValidators = [
  // QUANTITY
  body("newProductQuantity")
    .trim()
    .notEmpty()
    .withMessage("Quantity is required.")
    .isInt({ min: 1, max: 10000 })
    .withMessage("Quantity must be between 1 and 10000."),

  // PRICE
  body("newProductPrice")
    .trim()
    .notEmpty()
    .withMessage("Price is required.")
    .isFloat({
      min: 0,
      max: 1000,
      decimal_digits: "0,2",
    })
    .withMessage(
      "Price must be between 0 and 1000 and have max 2 decimal places."
    ),

  // DESCRIPTION
  body("newProductDescription")
    .trim()
    .notEmpty()
    .withMessage("Description is required.")
    .isLength({ max: 100 })
    .withMessage("Description cannot exceed 100 characters."),
];

export const getUpdateProductFormValidators = [
  // PRODUCT ID (URL PARAM)
  param("productId")
    .isInt({ min: 1 })
    .withMessage("Invalid product ID. Minimum value for productID is 1.")
    .toInt(),
];

export const getProductValidators = [
  // PRODUCT ID (URL PARAM)
  param("productId")
    .isInt({ min: 1 })
    .withMessage("Invalid product ID. Minimum value for productID is 1.")
    .toInt(),
];

export const searchProductsValidators = [
  query("searchQuery")
    .optional()
    .isString()
    .withMessage("Search query must be a string.")
    .trim()
    .isLength({ min: 1, max: 50 })
    .withMessage("Search query must be between 1 and 50 characters."),
];

export const filterProductsValidators = [
  query("filter")
    .optional()
    .isIn([
      "priceAscending",
      "priceDescending",
      "nameAscending",
      "nameDescending",
    ])
    .withMessage("Invalid filter option."),

  query("categories")
    .optional()
    .custom(async (value) => {
      // 1️⃣ Normalize to array
      const categories = Array.isArray(value) ? value : [value];

      // 2️⃣ Basic safety check
      if (
        !categories.every(
          (category) =>
            typeof category === "string" &&
            category.length > 0 &&
            category.length <= 50
        )
      ) {
        throw new Error("Invalid category format.");
      }

      // 3️⃣ Fetch valid categories from DB
      const validCategories = await getCategoriesLinksFromDB();
      const validNames = validCategories.map((c) => c.name);

      // 4️⃣ Existence check
      const allExist = categories.every((category) =>
        validNames.includes(category)
      );

      if (!allExist) {
        throw new Error("One or more selected categories do not exist.");
      }

      return true;
    }),
];
