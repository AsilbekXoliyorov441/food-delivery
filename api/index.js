import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import swaggerUi from "swagger-ui-express";
import fs from "fs";
import path from "path";

import categoryRoutes from "./routes/categories.routes.js";
import productRoutes from "./routes/products.routes.js";

const app = express();
app.use(cors());
app.use(bodyParser.json());

// --- Swagger setup ---
const swaggerDocument = JSON.parse(
  fs.readFileSync(path.join(process.cwd(), "api/swagger/swagger.json"))
);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// --- Routes ---
app.use("/categories", categoryRoutes);
app.use("/products", productRoutes);

// --- Vercel serverless export ---
import { createServerlessHandler } from "@vercel/node"; // optional, yoki default export
export default app;
