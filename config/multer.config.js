// Import Multer, a middleware for handling file uploads  
const multer = require("multer");

// Import multer-firebase-storage to store files in Firebase Cloud Storage  
const firebaseStorage = require("multer-firebase-storage");

// Import the Firebase instance from the configuration file  
const firebase = require("./firebase.config.js");

// Import the Firebase service account credentials  
const serviceAccount = require("../drive-f0562-firebase-adminsdk-fbsvc-7872f8e4ba.json");

// Configure Firebase Storage with authentication credentials and bucket name  
const storage = firebaseStorage({
    credentials: firebase.credential.cert(serviceAccount), // Authenticate using the service account
    bucketName: "drive-f0562.firebasestorage.app", // Specify the Firebase Storage bucket
    unique: true, // Ensure uploaded file names are unique to avoid overwriting existing files
});

// Set up multer to use Firebase Storage as the storage engine  
const upload = multer({
    storage: storage,
});

// Export the configured multer instance for handling file uploads in other modules  
module.exports = upload;

