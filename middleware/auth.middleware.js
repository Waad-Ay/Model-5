import jwt from "jsonwebtoken";
import { pool } from "../db.js";

export async function protect(req, res, next) {
  const header = req.headers.authorization;

  if (!header || !header.startsWith("Bearer "))
    return res.status(401).json({ message: "No token" });

  const token = header.split(" ")[1]; // [bearer, 2121212]

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  const result = await pool.query(
    "SELECT id, email, role FROM users WHERE id=$1",
    [decoded.id]
  );

  const user = result.rows[0];

  if (!user) return res.status(401).json({ message: "User not found" });

  req.user = user;
  next();
}
