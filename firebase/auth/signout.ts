import firebaseApp from "@/firebase/config";
import { signOut, getAuth } from "@firebase/auth";

const auth = getAuth(firebaseApp);

export default async function signOutOfApp(): Promise<{result, error}> {
	let result = null;
	let error = null;

	try {
		result = await signOut(auth);
	} catch (e) {
		error = e;
	}

	return { result, error };
}