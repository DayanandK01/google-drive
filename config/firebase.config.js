// Import the Firebase Admin SDK  
const Firebase = require("firebase-admin");

// Import the service account credentials from a JSON file  
const serviceAccount = require("../drive-f0562-firebase-adminsdk-fbsvc-7872f8e4ba.json");

// Initialize the Firebase app with the service account credentials  
const firebase = Firebase.initializeApp({
    credential: Firebase.credential.cert(serviceAccount), // Authenticate using the service account
    storageBucket: "drive-f0562.firebasestorage.app", // Specify the storage bucket for Firebase Cloud Storage
});

// Export the Firebase instance for use in other modules  
module.exports = Firebase;



