import { addAccount, getUserAccount } from "@/firebase/accounts/accounts";
import { useAuthContext } from "@/context/auth-context";
import { useEffect, useState } from "react";
import { set } from "@firebase/database";

export default function NewAccount() {
	const {accounts} = useAuthContext();
	// const [accounts, setAccounts] = useState([]);
	//
	// useEffect(() => {
	// 	getUserAccount(user.uid)
	// 		.then(userAccounts => setAccounts(userAccounts))
	// },[user])

	return <>
		<div>
			{accounts.map(account => {
				return (<h1 key={account}>AccountId: { account }</h1>)
			})}
		</div>

	</>
}