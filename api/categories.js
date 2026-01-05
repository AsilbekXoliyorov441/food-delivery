import express from "express";
import { categories } from "../data/categories.js";
import { products } from "../data/products.js";
import { generateId } from "../utils/faker.js";

const router = express.Router();

// GET all categories
router.get("/", (req, res) => {
  res.json(categories);
});

// GET category by ID
router.get("/:id", (req, res) => {
  const item = categories.find((c) => c.id === req.params.id);
  item ? res.json(item) : res.status(404).json({ error: "Not found" });
});

// POST new category
router.post("/", (req, res) => {
  const newItem = { id: generateId(), createdAt: new Date(), ...req.body };
  categories.push(newItem);
  res.status(201).json(newItem);
});

// PUT update category
router.put("/:id", (req, res) => {
  const index = categories.findIndex((c) => c.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: "Not found" });

  categories[index] = { ...categories[index], ...req.body };
  res.json(categories[index]);
});

// DELETE category
router.delete("/:id", (req, res) => {
  const catIndex = categories.findIndex((c) => c.id === req.params.id);
  if (catIndex === -1) return res.status(404).json({ error: "Not found" });

  categories.splice(catIndex, 1);
  products = products.filter((p) => p.categoryId !== req.params.id);
  res.json({ success: true });
});

// 🔹 Vercel uchun default export
export default router;
