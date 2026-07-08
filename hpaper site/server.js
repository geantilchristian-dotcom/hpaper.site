const express = require("express");
const session = require("express-session");
const bcrypt = require("bcryptjs");
const Database = require("better-sqlite3");
const path = require("path");

const app = express();
const db = new Database("database.sqlite");

const PORT = process.env.PORT || 3000;

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "admin@hpaper.com";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "Admin@12345";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: process.env.SESSION_SECRET || "hpaper_secret_key",
    resave: false,
    saveUninitialized: false
  })
);

app.use(express.static(path.join(__dirname, "public")));

db.prepare(`
  CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    category TEXT NOT NULL,
    price TEXT,
    description TEXT NOT NULL,
    image TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`).run();

db.prepare(`
  CREATE TABLE IF NOT EXISTS settings (
    key TEXT PRIMARY KEY,
    value TEXT
  )
`).run();

function requireAdmin(req, res, next) {
  if (!req.session.admin) {
    return res.status(401).json({ message: "Non autorisé" });
  }
  next();
}

app.post("/api/admin/login", async (req, res) => {
  const { email, password } = req.body;

  if (email !== ADMIN_EMAIL || password !== ADMIN_PASSWORD) {
    return res.status(401).json({ message: "Email ou mot de passe incorrect" });
  }

  req.session.admin = true;
  res.json({ message: "Connexion réussie" });
});

app.post("/api/admin/logout", requireAdmin, (req, res) => {
  req.session.destroy(() => {
    res.json({ message: "Déconnecté" });
  });
});

app.get("/api/admin/check", (req, res) => {
  res.json({ loggedIn: !!req.session.admin });
});

app.get("/api/products", (req, res) => {
  const products = db.prepare("SELECT * FROM products ORDER BY id DESC").all();
  res.json(products);
});

app.post("/api/products", requireAdmin, (req, res) => {
  const { name, category, price, description, image } = req.body;

  if (!name || !category || !description) {
    return res.status(400).json({ message: "Nom, catégorie et description obligatoires" });
  }

  const result = db.prepare(`
    INSERT INTO products (name, category, price, description, image)
    VALUES (?, ?, ?, ?, ?)
  `).run(name, category, price || "", description, image || "");

  res.json({ message: "Article ajouté", id: result.lastInsertRowid });
});

app.put("/api/products/:id", requireAdmin, (req, res) => {
  const { id } = req.params;
  const { name, category, price, description, image } = req.body;

  db.prepare(`
    UPDATE products
    SET name = ?, category = ?, price = ?, description = ?, image = ?
    WHERE id = ?
  `).run(name, category, price || "", description, image || "", id);

  res.json({ message: "Article modifié" });
});

app.delete("/api/products/:id", requireAdmin, (req, res) => {
  const { id } = req.params;

  db.prepare("DELETE FROM products WHERE id = ?").run(id);

  res.json({ message: "Article supprimé" });
});

app.get("/admin", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "admin.html"));
});

app.listen(PORT, () => {
  console.log(`Serveur Hpaper lancé sur le port ${PORT}`);
});