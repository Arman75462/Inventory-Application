import express from "express";
import path from "path";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();

/* View engine */
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

/* To serve static files */
const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));

/* Parse URL-encoded form data */
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello world!");
});

app.get("/{*splat}", (req, res) => {
  res.status(404).send("<h1 style='color: red'>404 - PAGE NOT FOUND</h1>");
});
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.statusCode || 500).send(err.message);
});

const PORT = process.env.PORT || 3043;
app.listen(PORT, (err) => {
  if (err) {
    throw err;
  }
  console.log(`App running on port: ${PORT}`);
});
