const express = require("express");

const router = express.Router();

const {

    registerUser,

    registerAdmin,

    loginUser

} = require("../controllers/authController");

// Student Registration
router.post("/register", registerUser);

// Admin Registration
router.post("/admin-register", registerAdmin);

// Login
router.post("/login", loginUser);

module.exports = router;