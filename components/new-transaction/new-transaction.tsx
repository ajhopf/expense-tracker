'use client'
import { useEffect, useState } from "react";
import { addTransaction } from "@/firebase/transactions/transactions";
import { getUserAccount } from "@/firebase/accounts/accounts";
import { useAuthContext } from "@/context/auth-context";
import { getUserCategories } from "@/firebase/categories/categories";
import BasicLabelInput from "@/components/ui/basic-label-input";
import Button from "@/components/ui/button";

type Type = "income" | "expense"

export default function NewTransaction() {
	const [amount, setAmount] = useState(0);
	const [type, setType] = useState("expense");
	const [date, setDate] = useState('2024-01-01');
	const {user} = useAuthContext();
	const [userCategories, setUserCategories] = useState([]);
	const [transactionCategory, setTransactionCategory] = useState('');

	useEffect(() => {
		getUserCategories(user.uid)
			.then(categories => {
				setUserCategories(categories);
			})
	},[])

	const handleFormSubmit = async (event) => {
		event.preventDefault()

		console.log(transactionCategory)

		const userAccounts = await getUserAccount(user.uid)

		if (type === "expense" && amount > 0) {
			addTransaction(userAccounts[0], date, -amount, transactionCategory)
		} else {
			addTransaction(userAccounts[0], date, amount, transactionCategory)
		}

		setAmount(0)
	}

	return <div className="border border-indigo-600">
		<h2>Add new Transaction</h2>
		<form onSubmit={handleFormSubmit}>
			<BasicLabelInput
				value={amount}
				label="Amount"
				id="amount"
				placeholder={0.00}
				required={true}
				onChangeFn={(e) => setAmount(e.target.value)}
				type="number"
				step="0.01"
				borderColor={"green-700"}/>
			<fieldset className={'m-4'}>
				<legend className="text-sm font-semibold leading-6 text-gray-900">Type</legend>
				<div className="flex items-center">
					<div className="flex items-center gap-x-3">
						<input
							required
							id="expense"
							name="type"
							type="radio"
							value="expense"
							onChange={e => setType(e.target.value)}
							className="h-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"/>
						<label
							htmlFor="expense"
							className="block text-sm font-medium leading-6 text-gray-900">
							Expense
						</label>
					</div>
					<div className="flex items-center gap-x-3">
						<input
							required
							onChange={e => setType(e.target.value)}
							id="income"
							name="type"
							value="Income"
							type="radio"
							className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"/>
						<label
							htmlFor="income"
							className="block text-sm font-medium leading-6 text-gray-900">
							Income
						</label>
					</div>
				</div>
			</fieldset>
			<div className="m-4">
				<label htmlFor="category" className="text-sm font-semibold leading-6 text-gray-900">Category</label>
				<div className="mt-2">
					<select
						id="category"
						onChange={(e) => setTransactionCategory(e.target.value)}
						name="category"
						autoComplete="country-name"
						className="p-2 block w-full rounded border-2 border-green-700 text-gray-900  outline-none focus:ring-offset-2 focus:ring focus:ring-green-700 w-full">
						{userCategories.map(category => {
							return (<option key={category.id} value={category.category}>{category.category}</option>)
						})}
					</select>
				</div>
			</div>
			<BasicLabelInput
				label={"Date"}
				required={true}
				onChangeFn={(e) => setDate(e.target.value)}
				type={"date"}
				id={"date"}
				borderColor={"green-700"}
			/>
			<div className="text-center">
				<Button
					className={"border-black"}
					type={"button"}
					label={"Cancel"} />
				<Button
					className={"border-green-700"}
					type={"submit"}
					label={"Register"} />
			</div>
		</form>
	</div>
};

