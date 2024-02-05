'use client'

import { AuthContext, useAuthContext } from "@/context/auth-context";
import MainHeader from "@/components/header/main-header";
import { redirect } from "next/navigation";
import { useContext } from "react";

export default function SignedInLayout (
	{children}: Readonly<{children: React.ReactNode}>) {
	const {user} = useContext(AuthContext);

	if (!user) {
		redirect('/signin')
	}

	return (
		<>
			<MainHeader/>
			<h1>Dentro</h1>
			{children}
		</>
	)
}