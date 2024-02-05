'use client'

import { onAuthStateChanged, getAuth } from "@firebase/auth";
import firebaseApp from "@/firebase/config";
import React from "react";

type User = {
	name: string
}

const auth = getAuth(firebaseApp);

export const AuthContext = React.createContext({});

export const useAuthContext = () => React.useContext(AuthContext);

export const AuthContextProvider = ({children}) => {
	const [user, setUser] = React.useState<User>( null );

	const [loading, setLoading] = React.useState<boolean>(true);

	React.useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			if (user) {
				setUser(() => user);
			} else {
				setUser(null);
			}
			setLoading(false);
		});

		return () => unsubscribe();
	}, []);

	return (
		<AuthContext.Provider value={{user}}>
			{loading ? <div>Loading</div> : children}
		</AuthContext.Provider>
	)
}