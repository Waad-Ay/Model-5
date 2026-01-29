import express from "express";
import { pool } from "../db.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
const router = express.Router();
import { protect } from "../middleware/auth.middleware.js";
import allowed from "../middleware/role.middleware.js";
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const result = await pool.query(
    "SELECT id, email, password, role FROM users WHERE email=$1",
    [email],
  );

  const user = result.rows[0];

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) return res.status(401).json("Wrong password ");

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  res.json({
    token,
    user: { id: user.id, email: user.email, role: user.role },
  });
});

router.get("/dashboard/user", protect, allowed("user", "admin"), (req, res) => {
  res.json("Welcome to user Dashboard");
});

router.get("/dashboard/admin", protect, allowed("admin"), (req, res) => {
  res.json("Welcome to admin Dashboard");
});

router.get("/getUsers", protect, allowed("admin"), async (req, res) => {
  const result = await pool.query(
    "SELECT id, firstname, lastname, email, role FROM users",
  );

  res.json(result.rows);
});

router.get("/users/count", protect, allowed("admin"), async (req, res) => {
  const result = await pool.query("SELECT COUNT(*) FROM users");

  res.json(result.rows[0].count);
});

router.post("/register", async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  if (!firstName || !lastName || !email || !password) {
    return res.status(400).json({ message: "some fields are missing" });
  }

  const exist = await pool.query("SELECT id FROM users WHERE email=$1", [
    email,
  ]);

  if (exist.rows.length) {
    return res.status(400).json({ message: "email already exist" });
  }

  const newPassword = await bcrypt.hash(password, 10);

  const result = await pool.query(
    "INSERT INTO users( firstname, lastname, email, password ) VALUES ($1,$2,$3,$4)",
    [firstName, lastName, email, newPassword],
  );

  res.status(201).json({ message: "Registeration success" });
});

router.get("/profile", protect, async (req, res) => {
  const result = await pool.query(
    `SELECT u.firstname, u.lastname, u.email,
            p.birthdate, p.address, p.subscription_start,
            p.subscription_end, p.monthly_price
     FROM users u
     LEFT JOIN user_profiles p ON u.id = p.user_id
     WHERE u.id=$1`,
    [req.user.id],
  );

  res.json(result.rows[0]);
});

router.post("/addUsers", protect, async (req, res) => {
  const { email, password, firstname, lastname, role } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  await pool.query(
    `INSERT INTO users (email, password, firstname, lastname, role)
     VALUES ($1,$2,$3,$4,$5)`,
    [email, hashedPassword, firstname, lastname, role],
  );

  res.json({ message: "User created" });
});

router.delete("/deleteUser/:id", protect, async (req, res) => {
  const id = req.params.id;

  await pool.query("DELETE FROM users WHERE id=$1", [id]);

  res.json({ message: "user Deleted" });
});

export default router;
