const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
require("dotenv/config");
const auth = require("./controllers/auth");
const projects = require("./controllers/projects");
const users = require("./controllers/users");
const assignments = require("./controllers/assignments");
const authMiddleware = require("./middleware/auth");

const app = express();
app.use(helmet());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());

app.get("/health", (_req, res) => res.json({ status: "ok" }));

app.post("/api/login", auth.login);
app.post("/api/users", users.create);
app.get("/api/users", authMiddleware, users.list);
app.put("/api/users/:id", authMiddleware, users.update);

app.post("/api/assignments", authMiddleware, assignments.create);
app.get("/api/assignments", authMiddleware, assignments.list);
app.get("/api/assignments/:id", authMiddleware, assignments.get);

app.get("/api/projects", authMiddleware, projects.list);
app.post("/api/projects", authMiddleware, projects.create);
app.put("/api/projects/:id", authMiddleware, projects.update);
app.delete("/api/projects/:id", authMiddleware, projects.remove);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`API on http://localhost:${PORT}`));
