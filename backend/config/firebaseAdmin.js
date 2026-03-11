const admin = require("firebase-admin");
const path = require("path");

let db;

function initializeFirebase() {
  if (db) return db;

  let serviceAccount;
  if (process.env.FIREBASE_SERVICE_ACCOUNT) {
    serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
  } else {
    const keyPath = path.join(__dirname, "..", "serviceAccountKey.json");
    serviceAccount = require(keyPath);
  }

  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
  }

  db = admin.firestore();
  return db;
}

module.exports = {
  admin,
  db: initializeFirebase(),
};
