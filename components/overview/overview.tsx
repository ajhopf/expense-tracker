'use client'
import { useAuthContext } from "@/context/auth-context";
import { useEffect, useState } from "react";
import { getTransactions } from "@/firebase/transactions/transactions";
import {Transaction} from "@/firebase/transactions/transactions";

export default function Overview() {
	const {accounts} = useAuthContext();
	const [transactions, setTransactions] = useState<Transaction[]>([]);

	useEffect(() => {
		getTransactions(accounts[0])
			.then((transactions:Transaction[]) => setTransactions(transactions));
	},[])

	return <>
		<ul>
			{transactions.map(transactions => {
				return <li key={transactions.id}>{transactions.amount}</li>
			})}
		</ul>
	</>
}