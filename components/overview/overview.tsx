'use client'
import { useAuthContext } from "@/context/auth-context";
import { useEffect, useState } from "react";
import { getTransactions } from "@/firebase/transactions/transactions";
import {Transaction} from "@/models/transaction";
import { collection, getFirestore, onSnapshot, orderBy, query, where } from "@firebase/firestore";
import firebaseApp from "@/firebase/config";

export default function Overview() {
	const {accounts} = useAuthContext();
	const [transactions, setTransactions] = useState<Transaction[]>([]);
	const currentMonth = new Date().toLocaleString('en-us', {month: "long"});
	const [income, setIncome] = useState(0);
	const [expense, setExpense] = useState(0);

	console.log(currentMonth)

	// useEffect(() => {
	// 	if (accounts && accounts.length> 0) {
	// 		getTransactions(accounts[0])
	// 			.then((transactions:Transaction[]) => setTransactions(transactions))
	// 	}
	// },[accounts])
	useEffect(() => {
		if (accounts && accounts.length > 0) {
			const db = getFirestore(firebaseApp);
			// Get reference to transactions collection
			const transactionsRef = collection(db, 'transactions');

			const q = query(transactionsRef,
				where("accountId", "==", accounts[0]),
				orderBy("date", "desc")
			);
			// Create snapshot listener on transactions
			const unsubscribe = onSnapshot(q,(snapshot) => {
				const snapshotData = snapshot.docs.map((doc) => {
					return { id: doc.id, ...doc.data() } as Transaction;
				});
				setTransactions(snapshotData);
			});

			// Cleanup function to remove listener on unmount
			return () => unsubscribe();
		}
	}, [accounts]);

	useEffect(() => {
		if (transactions && transactions.length > 0) {
			setIncome(0);
			setExpense(0);
			transactions.forEach(t => {
				if (t.amount > 0) {
					setIncome(prevState => prevState + Number(t.amount));
				} else {
					setExpense(prevState => prevState + Number(t.amount));
				}
			})
		}
	}, [transactions])

	return <>
		<ul>
			{transactions && transactions.map(transactions => {
				return <li key={transactions.id}>
					<p>Amount: {transactions.amount}</p>
					<p>Date: {transactions.date}</p>
					<p>Category: {transactions.category}</p>
				</li>

			})}
		</ul>
		<p>Income: {income}</p>
		<p>Expense: {expense}</p>
	</>
}