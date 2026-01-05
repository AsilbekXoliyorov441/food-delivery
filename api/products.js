import express from "express";
import { products } from "../data/products.js";
import { generateId } from "../utils/faker.js";

const router = express.Router();

// GET all products
router.get("/products", (req, res) => {
  res.json(products);
});

// GET product by id
router.get("/products/:id", (req, res) => {
  const item = products.find((p) => p.id === req.params.id);
  item ? res.json(item) : res.status(404).json({ error: "Not found" });
});

// GET products by category id
router.get("/categories/:id/products", (req, res) => {
  res.json(products.filter((p) => p.categoryId === req.params.id));
});

// POST new product in category
router.post("/categories/:id/products", (req, res) => {
  const newItem = {
    id: generateId(),
    categoryId: req.params.id,
    createdAt: new Date(),
    ...req.body,
  };
  products.push(newItem);
  res.status(201).json(newItem);
});

// PUT update product
router.put("/categories/:cid/products/:pid", (req, res) => {
  const index = products.findIndex(
    (p) => p.id === req.params.pid && p.categoryId === req.params.cid
  );
  if (index === -1) return res.status(404).json({ error: "Not found" });

  products[index] = { ...products[index], ...req.body };
  res.json(products[index]);
});

// DELETE product
router.delete("/categories/:cid/products/:pid", (req, res) => {
  const index = products.findIndex(
    (p) => p.id === req.params.pid && p.categoryId === req.params.cid
  );
  if (index === -1) return res.status(404).json({ error: "Not found" });

  products.splice(index, 1);
  res.json({ success: true });
});

// 🔹 Vercel uchun default export
export default router;
