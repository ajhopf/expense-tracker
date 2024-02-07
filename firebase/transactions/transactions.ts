import { addDoc, collection, getFirestore, where, query, getDocs, orderBy } from "@firebase/firestore";
import firebaseApp from "@/firebase/config";
import { Transaction } from "@/models/transaction";

const db = getFirestore(firebaseApp);



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

export async function getTransactions(accountId):Promise<Transaction[]> {
	const transactions:Transaction[] = [];
	try {
		const transactionsRef = await collection(db, "transactions");
		const q = query(transactionsRef, where("accountId", "==", accountId), orderBy("date", "desc"));
		const transactionsSnapshot = await getDocs(q);
		transactionsSnapshot.forEach(t => {
			transactions.push({id: t.id,...t.data()} as Transaction)
		})
		return transactions
	} catch (e) {
		console.error(e);
	}
}