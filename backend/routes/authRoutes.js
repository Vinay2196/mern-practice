const express = require("express");
const { register, login } = require("../controllers/authController");
const requireAuth = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/register", register);
router.post("/login", login); // 👈 Add this line

router.get("/protected", requireAuth, (req, res) => {
  res.json({ message: "Welcome to protected route", userId: req.user.id });
});

module.exports = router;
