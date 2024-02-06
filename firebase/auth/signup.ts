import firebaseApp from "@/firebase/config";
import { createUserWithEmailAndPassword, getAuth, updateProfile } from "@firebase/auth";

const auth = getAuth(firebaseApp);

export default async function signUp(name: string, email: string, password: string): Promise<{result, error}> {
	let result = null;
	let error = null;

	try {
		result = await createUserWithEmailAndPassword(auth, email, password);
		updateProfile(result.user, {
			displayName: name
		})
	} catch (e) {
		error = e;
	}

	return { result, error };
}