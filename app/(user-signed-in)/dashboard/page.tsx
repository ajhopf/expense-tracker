'use client'

import NewTransaction from "@/components/new-transaction/new-transaction";
import NewAccount from "@/components/account/new-account";
import NewCategory from "@/components/category/new-category";
import Overview from "@/components/overview/overview";
import { useAuthContext } from "@/context/auth-context";
import { useEffect, useState } from "react";
import { Account } from "@/models/account";

export default function DashboardPage() {
	const {accounts} = useAuthContext()
	const [selectedAccount, setSelectedAccount] = useState<Account>();

	useEffect(() => {
		if (accounts) {
			const defaultAccount:Account = accounts.find((acc:Account) => acc.default === true)
			setSelectedAccount(defaultAccount);
		}
	}, [accounts])

	return <>
		<h1>Choose Account</h1>
		{accounts && accounts.map((acc, index) => {
			return <button key={index} className='block' onClick={() => setSelectedAccount(acc)}>{acc.name}</button>

		})}
		<h1>Dashboard</h1>
		<div className="flex">
			<NewTransaction account={selectedAccount}/>
			<Overview account={selectedAccount}/>
		</div>


		<NewCategory/>
		<hr/>

	</>
}