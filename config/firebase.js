const admin = require("firebase-admin");
// Memanggil file JSON yang baru kamu buat tadi
const serviceAccount = require("../serviceAccountKey.json");

if (!admin.apps.length) {
  admin.initializeApp({
    // Otomatis membaca projectId, clientEmail, dan privateKey dari file JSON
    credential: admin.credential.cert(serviceAccount)
  });
}

const WEB_API_KEY = "AIzaSyA3flNDN9l1y_ou-eVU0wuo8NHouhgL_po"; 

const db = admin.firestore();
const auth = admin.auth();

module.exports = { admin, db, auth, WEB_API_KEY };