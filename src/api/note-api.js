// import axios from "axios";
// const BASE_URL = "http://localhost:3200/notes";

// export class NoteAPI {
//     static async create(note) {
//         return (await axios.post(`${BASE_URL}`)).data;
//     }
//     static async fetchAll() {
//         return (await axios.get(`${BASE_URL}`)).data;
//     }
//     static async fetchById(noteId) {
//         return (await axios.get(`${BASE_URL}/${noteId}`)).data;
//     }
//     static async deleteById(noteId) {
//         return (await axios.delete(`${BASE_URL}/${noteId}`)).data;
//     }
//     static async updateById(note) {
//         return (await axios.patch(`${BASE_URL}/${note.id}`, note)).data;
//     }
// }

import { query, collection, orderBy, getDocs, addDoc, deleteDoc, doc, updateDoc, onSnapshot } from 'firebase/firestore'
import { FirebaseApp } from 'utils/firebase'

export async function create(note) {
    const response = addDoc(collection(FirebaseApp.db, 'notes'), note)
    return {
        id: response.id,
        ...note
    }
}
export async function fetchAll() {
    const q = query(collection(FirebaseApp.db, 'notes'), orderBy("created_at", 'asc'))
    const response = await getDocs(q)
    return response.docs.map((document) => {
        return {
            id: document.id,
            ...document.data()
        }
    })
}
export async function deleteById(noteId) {
    deleteDoc(doc(FirebaseApp.db, 'notes', noteId));
}
export async function updateById(id, note) {
    const q = doc(FirebaseApp.db, 'notes', id)
    await updateDoc(q, note);
    return {
        id,
        ...note
    }
}

export async function onShouldSyncNotes(onChange) {
    const q = query(collection(FirebaseApp.db, 'notes'))
    const unSubscribe = onSnapshot(q, (querySnapshot) => {
        const isUserPerformingChange = querySnapshot.metadata.hasPendingWrites
        if (!isUserPerformingChange) {
            console.log("You are not synced with the notes collection")
            onChange()
        }
    })
    return unSubscribe;
}

// https://firestore.googleapis.com/v1/projects/react-note-manager-f2626/databases/(default)/documents/notes