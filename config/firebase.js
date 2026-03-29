const admin = require("firebase-admin");

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
    }),
  });
}

const WEB_API_KEY = "AIzaSyA3flNDN9l1y_ou-eVU0wuo8NHouhgL_po";
const db = admin.firestore();
const auth = admin.auth();

module.exports = { admin, db, auth, WEB_API_KEY };
