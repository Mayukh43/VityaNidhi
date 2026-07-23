const multer = require("multer");
const path = require("path");
const fs = require("fs");

// ======================================
// Create Upload Folders
// ======================================

const folders = {

    aadhaarCard: "aadhaar",

    incomeCertificate: "income",

    casteCertificate: "caste",

    domicileCertificate: "documents",

    disabilityCertificate: "disability",

    marksheet: "marksheet",

    collegeIdCard: "documents",

    bankPassbook: "bank",

    passportPhoto: "photo",

    signature: "documents",

    otherDocument: "documents"

};

Object.values(folders).forEach((folder) => {

    const folderPath = path.join(__dirname, "../uploads", folder);

    if (!fs.existsSync(folderPath)) {

        fs.mkdirSync(folderPath, {

            recursive: true

        });

    }

});

// ======================================
// Storage Configuration
// ======================================

const storage = multer.diskStorage({

    destination: (req, file, cb) => {

        const folderName = folders[file.fieldname] || "documents";

        cb(

            null,

            path.join(__dirname, "../uploads", folderName)

        );

    },

    filename: (req, file, cb) => {

        const uniqueName =

            Date.now() +

            "-" +

            Math.round(Math.random() * 1e9) +

            path.extname(file.originalname);

        cb(null, uniqueName);

    }

});

// ======================================
// File Filter
// ======================================

const fileFilter = (req, file, cb) => {

    const allowedTypes = [

        "application/pdf",

        "image/jpeg",

        "image/jpg",

        "image/png"

    ];

    if (allowedTypes.includes(file.mimetype)) {

        cb(null, true);

    }

    else {

        cb(

            new Error(

                "Only PDF, JPG, JPEG and PNG files are allowed."

            ),

            false

        );

    }

};

// ======================================
// Upload Configuration
// ======================================

const upload = multer({

    storage,

    fileFilter,

    limits: {

        fileSize: 5 * 1024 * 1024

    }

});

module.exports = upload;
