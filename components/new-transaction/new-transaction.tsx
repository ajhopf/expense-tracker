'use client'
import { useState } from "react";
import { addTransaction } from "@/firebase/transactions/transactions";
import { getUserAccount } from "@/firebase/accounts/accounts";
import { useAuthContext } from "@/context/auth-context";

export default function NewTransaction() {
	const [amount, setAmount] = useState(0);
	const types = ['income', 'expense']
	const [type, setType] = useState(types[0]);
	const [date, setDate] = useState('2024-01-01');
	const {user} = useAuthContext();

	const handleFormSubmit = async (event) => {
		event.preventDefault()

		if (type === 'expense' && amount > 0) {
			setAmount(prevState => prevState*-1)
		}

		const userAccounts = await getUserAccount(user.uid)

		addTransaction(userAccounts[0], date, amount)
	}

	return <div className="border border-indigo-600">
		<h2>Add new Transaction</h2>
		<form onSubmit={handleFormSubmit}>
			<div>
				<label htmlFor="amount">
					Amount
				</label>
				<input
					className='focus:outline-none border rounded border-black focus:ring ring-green-400 focus:border-green-400'
					onChange={(e) => setAmount(Number(e.target.value))}
					name="amount"
					id="amount"
					type="number"
					step='0.01'/>
			</div>
			<div>
				<label htmlFor="type">
					Type
				</label>
				<select name="type" id="type" value={type} onChange={(e) => setType(e.target.value)}>
					<option value="income">Income</option>
					<option value="expense" defaultValue>Expense</option>
				</select>
			</div>
			<div>
				<label htmlFor="date">
					Date
				</label>
				<input
					onChange={e => setDate(e.target.value)}
					className='focus:outline-none border rounded border-black focus:ring ring-green-400 focus:border-green-400'
					value={date}
					type="date"
					id="date"
					name="date"/>
			</div>
			<button className='border rounded border-black'>Register</button>
		</form>
	</div>
};

