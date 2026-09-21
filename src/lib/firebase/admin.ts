import { cert, getApps, initializeApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { getStorage } from 'firebase-admin/storage';

function getFirebaseAdminApp() {
  if (getApps().length) return getApps()[0];

  const projectId = process.env.FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n');
  if (!projectId || !clientEmail || !privateKey) return null;

  return initializeApp({
    credential: cert({ projectId, clientEmail, privateKey }),
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  });
}

export function getFirebaseAdminFirestore() {
  const app = getFirebaseAdminApp();
  return app ? getFirestore(app) : null;
}

export function getFirebaseAdminBucket() {
  const app = getFirebaseAdminApp();
  return app ? getStorage(app).bucket() : null;
}
