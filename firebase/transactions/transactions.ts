import { addDoc, collection, getFirestore, where, query, getDocs, getDoc, or } from "@firebase/firestore";
import firebaseApp from "@/firebase/config";

const db = getFirestore(firebaseApp);

export type Transaction = {
	accountId: string,
	amount: number,
	category?: string,
	date: string,
	id?: string
}

export async function addTransaction(accountId, date, amount, category) {
	try {
		const docRef =
			await addDoc(collection(db, "transactions"), {
				accountId, date, amount, category
			})

		console.log("document written with id: ", docRef.id)
	} catch (e) {
		console.error("Error adding document: ", e)
	}
}

export async function getTransactions(accountId) {
	const transactions:Transaction[] = [];
	try {
		const transactionsRef = await collection(db, "transactions");
		const q = query(transactionsRef, where("accountId", "==", accountId));
		const transactionsSnapshot = await getDocs(q);
		transactionsSnapshot.forEach(t => {
			transactions.push({id: t.id,...t.data()} as Transaction)
		})
		return transactions
	} catch (e) {
		console.error(e);
	}
}