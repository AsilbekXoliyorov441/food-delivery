import express from "express";
import { products } from "../data/products.js";
import { generateId } from "../utils/faker.js";

const router = express.Router();

router.get("/", (req, res) => res.json(products));
router.get("/:id", (req, res) => {
  const item = products.find((p) => p.id === req.params.id);
  item ? res.json(item) : res.status(404).json({ error: "Not found" });
});
router.get("/category/:id", (req, res) => {
  res.json(products.filter((p) => p.categoryId === req.params.id));
});

router.post("/category/:id", (req, res) => {
  const newItem = {
    id: generateId(),
    categoryId: req.params.id,
    createdAt: new Date(),
    ...req.body,
  };
  products.push(newItem);
  res.status(201).json(newItem);
});

router.put("/category/:cid/:pid", (req, res) => {
  const index = products.findIndex(
    (p) => p.id === req.params.pid && p.categoryId === req.params.cid
  );
  if (index === -1) return res.status(404).json({ error: "Not found" });
  products[index] = { ...products[index], ...req.body };
  res.json(products[index]);
});

router.delete("/category/:cid/:pid", (req, res) => {
  const index = products.findIndex(
    (p) => p.id === req.params.pid && p.categoryId === req.params.cid
  );
  if (index === -1) return res.status(404).json({ error: "Not found" });
  products.splice(index, 1);
  res.json({ success: true });
});

export default router;
