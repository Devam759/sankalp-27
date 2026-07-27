import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  serverTimestamp,
  type Firestore,
} from 'firebase/firestore';
import { db, isFirebaseConfigured, FIREBASE_SETUP_MESSAGE } from './firebase';

function requireDb(): Firestore {
  if (!isFirebaseConfigured() || !db) throw new Error(FIREBASE_SETUP_MESSAGE);
  return db;
}

// Registrations
export const registerUser = async (userData: any) => {
  return await addDoc(collection(requireDb(), 'registrations'), {
    ...userData,
    timestamp: serverTimestamp(),
    status: 'pending'
  });
};

// Attendance/Check-in
export const checkInUser = async (userId: string, eventId: string) => {
  const attendanceRef = collection(requireDb(), 'attendance');
  return await addDoc(attendanceRef, {
    userId,
    eventId,
    timestamp: serverTimestamp(),
    status: 'checked-in'
  });
};



// Paper Submissions
export const submitPaperSubmission = async (paperData: Record<string, unknown>) => {
  return await addDoc(collection(requireDb(), 'paperSubmissions'), {
    ...paperData,
    submittedAt: serverTimestamp(),
  });
};

export const submitContactMessage = async (contactData: Record<string, unknown>) => {
  return await addDoc(collection(requireDb(), 'contact_messages'), {
    ...contactData,
    submittedAt: serverTimestamp(),
  });
};


