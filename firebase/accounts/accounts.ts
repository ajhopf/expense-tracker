import { addDoc, collection, getFirestore, where, query, getDocs, getDoc } from "@firebase/firestore";
import firebaseApp from "@/firebase/config";

const db = getFirestore(firebaseApp);

export async function addAccount(userId) {
	try {
		const docRef =
			await addDoc(collection(db, "accounts"), {
				userId: userId
			})

		console.log("document written with id: ", docRef.id)
	} catch (e) {
		console.error("Error adding document: ", e)
	}
}

export async function getUserAccount(userId) {
	const userAccounts = [];
	try {
		const accountsRef = await collection(db, "accounts")
		const q = await query(accountsRef, where("userId", "==", userId))
		const accountsSnapshot = await getDocs(q);
		accountsSnapshot.forEach(account => {
			const accountData = {id: account.id, ...account.data()}
			userAccounts.push(accountData)
		})
		return userAccounts;
	} catch (e) {
		console.error(e)
	}
}