'use client'

import { onAuthStateChanged, getAuth } from "@firebase/auth";
import firebaseApp from "@/firebase/config";
import React from "react";
import { getUserAccount } from "@/firebase/accounts/accounts";

type User = {
	name: string
}

const auth = getAuth(firebaseApp);

export const AuthContext = React.createContext({});

export const useAuthContext = () => React.useContext(AuthContext);

export const AuthContextProvider = ({children}) => {
	const [user, setUser] = React.useState<User>( null );
	const [accounts, setAccounts] = React.useState([]);

	const [loading, setLoading] = React.useState<boolean>(true);

	React.useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			if (user) {
				setUser(() => user);
				getUserAccount(user.uid)
					.then(accounts => setAccounts(accounts));
			} else {
				setUser(null);
				setAccounts([]);
			}
			setLoading(false);
		});

		return () => unsubscribe();
	}, []);

	return (
		<AuthContext.Provider value={{user, accounts}}>
			{loading ? <div>Loading</div> : children}
		</AuthContext.Provider>
	)
}