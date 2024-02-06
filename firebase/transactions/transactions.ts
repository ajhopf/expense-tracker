import { addDoc, collection, getFirestore, where, query, getDocs, getDoc } from "@firebase/firestore";
import firebaseApp from "@/firebase/config";


const db = getFirestore(firebaseApp);

export async function addTransaction(accountId, date, amount) {
	try {
		const docRef =
			await addDoc(collection(db, "transactions"), {
				accountId, date, amount
			})

		console.log("document written with id: ", docRef.id)
	} catch (e) {
		console.error("Error adding document: ", e)
	}
}