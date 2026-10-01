require("dotenv").config(); // <--- TAMBAHKAN BARIS INI DI PALING ATAS
const admin = require("firebase-admin");

if (!admin.apps.length) {
  // Tambahkan safe-check (opsional) agar tidak crash jika variabel belum diset
  const privateKey = process.env.FIREBASE_PRIVATE_KEY
    ? process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n")
    : undefined;

  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: privateKey,
    }),
  });
}

const WEB_API_KEY = "AIzaSyD99sIvmhcv7qqxRzUtYry8QjHqFqHDmgk";
const db = admin.firestore();
const auth = admin.auth();

module.exports = { admin, db, auth, WEB_API_KEY };