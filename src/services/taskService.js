import { db } from "../firebase/firebase";

import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  deleteDoc,
  updateDoc,
  doc
} from "firebase/firestore";

const taskCollection = collection(db, "tasks");

// CREATE

export const addTask = (task) => {
  return addDoc(taskCollection, task);
};

// READ (Current User Only)

export const getTasks = async (userId) => {
  const q = query(taskCollection, where("userId", "==", userId));

  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data()
  }));
};

// DELETE

export const deleteTask = (id) => {
  return deleteDoc(doc(db, "tasks", id));
};

// UPDATE (Complete)

export const toggleTaskStatus = (id, completed) => {
  return updateDoc(doc(db, "tasks", id), {
    completed
  });
};