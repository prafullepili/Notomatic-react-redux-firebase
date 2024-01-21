import { FirebaseApp } from "../utils/firebase";
import { signOut, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth'


export class AuthAPI {
    static async singin(email, password) {
        const response = await signInWithEmailAndPassword(FirebaseApp.auth, email, password)
        return response.user.toJSON();
    }
    static async signup(email, password) {
        const response = await createUserWithEmailAndPassword(FirebaseApp.auth, email, password)
        return response.user.toJSON();
    }
    static async signout() {
        signOut(FirebaseApp.auth);
    }
}


// export async function signin() {
// }
// export async function signup() {
// }
// export async function signout() {
// }