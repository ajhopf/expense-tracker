'use client'
import { useAuthContext } from "@/context/auth-context";
import { useEffect, useState } from "react";
import { getTransactions } from "@/firebase/transactions/transactions";
import {Transaction} from "@/models/transaction";
import { collection, getFirestore, onSnapshot, orderBy, query, where } from "@firebase/firestore";
import firebaseApp from "@/firebase/config";
import { Account } from "@/models/account";

export default function Overview({account}) {
	const [transactions, setTransactions] = useState<Transaction[]>([]);
	const [income, setIncome] = useState<number>(0);
	const [expense, setExpense] = useState<number>(0);

	const currentMonth = new Date().toLocaleString('en-us', {month: "long"});

	useEffect(() => {
		setExpense(0)
		setIncome(0)
		if (account) {
			const db = getFirestore(firebaseApp);
			// Get reference to transactions collection
			const transactionsRef = collection(db, 'transactions');

			const q = query(transactionsRef,
				where("accountId", "==", account.id),
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
	}, [account]);

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