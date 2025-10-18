const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
require("dotenv/config");
const auth = require("./controllers/auth");
const projects = require("./controllers/projects");
const authMiddleware = require("./middleware/auth");

const app = express();
app.use(helmet());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());

app.get("/health", (_req, res) => res.json({ status: "ok" }));

app.post("/api/login", auth.login);

app.get("/api/projects", authMiddleware, projects.list);
app.post("/api/projects", authMiddleware, projects.create);
app.put("/api/projects/:id", authMiddleware, projects.update);
app.delete("/api/projects/:id", authMiddleware, projects.remove);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`API on http://localhost:${PORT}`));
