import firebaseApp from "@/firebase/config";
import { createUserWithEmailAndPassword, getAuth } from "@firebase/auth";

const auth = getAuth(firebaseApp);

export default async function signUp(email: string, password: string): Promise<{result, error}> {
	let result = null;
	let error = null;

	try {
		result = await createUserWithEmailAndPassword(auth, email, password);
	} catch (e) {
		error = e;
	}

	return { result, error };
}