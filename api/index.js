import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import swaggerUi from "swagger-ui-express";
import fs from "fs";

import categoryRoutes from "../routes/categories.routes.js";
import productRoutes from "../routes/products.routes.js";

const app = express();
app.use(cors());
app.use(bodyParser.json());

// --- Swagger setup ---
const swaggerDocument = JSON.parse(fs.readFileSync("./swagger/swagger.json"));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// --- Routes ---
app.use("/categories", categoryRoutes);
app.use("/", productRoutes);

const PORT = 5000;
app.listen(PORT, () =>
  console.log(`🚀 Server running on http://localhost:${PORT}`)
);
