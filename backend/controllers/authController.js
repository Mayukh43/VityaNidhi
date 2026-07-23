const User = require("../models/User");
const bcrypt = require("bcryptjs");
const generateToken = require("../utils/generateToken");

// ======================================
// Student Registration
// POST /api/auth/register
// ======================================

const registerUser = async (req, res) => {

    try {

        const { name, email, password } = req.body;

        const userExists = await User.findOne({ email });

        if (userExists) {

            return res.status(400).json({
                message: "User already exists"
            });

        }

        const salt = await bcrypt.genSalt(10);

        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await User.create({

            name,
            email,
            password: hashedPassword,

            // Always Student
            role: "student"

        });

        res.status(201).json({

            success: true,

            message: "Student Registered Successfully",

            _id: user._id,

            name: user.name,

            email: user.email,

            role: user.role,

            token: generateToken(user._id)

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

// ======================================
// Admin Registration
// POST /api/auth/admin-register
// ======================================

const registerAdmin = async (req, res) => {

    try {

        const {

            name,

            email,

            password,

            adminSecretKey

        } = req.body;

        if (adminSecretKey !== process.env.ADMIN_SECRET_KEY) {

            return res.status(401).json({

                success: false,

                message: "Invalid Admin Secret Key"

            });

        }

        const userExists = await User.findOne({ email });

        if (userExists) {

            return res.status(400).json({

                success: false,

                message: "User already exists"

            });

        }

        const salt = await bcrypt.genSalt(10);

        const hashedPassword = await bcrypt.hash(password, salt);

        const admin = await User.create({

            name,

            email,

            password: hashedPassword,

            role: "admin"

        });

        res.status(201).json({

            success: true,

            message: "Admin Registered Successfully",

            _id: admin._id,

            name: admin.name,

            email: admin.email,

            role: admin.role,

            token: generateToken(admin._id)

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

// ======================================
// Login
// POST /api/auth/login
// ======================================

const loginUser = async (req, res) => {

    try {

        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {

            return res.status(401).json({

                success: false,

                message: "Invalid Email"

            });

        }

        const isMatch = await bcrypt.compare(

            password,

            user.password

        );

        if (!isMatch) {

            return res.status(401).json({

                success: false,

                message: "Invalid Password"

            });

        }

        res.status(200).json({

            success: true,

            message: "Login Successful",

            _id: user._id,

            name: user.name,

            email: user.email,

            role: user.role,

            token: generateToken(user._id)

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

module.exports = {

    registerUser,

    registerAdmin,

    loginUser

};