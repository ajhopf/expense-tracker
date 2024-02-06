'use client'

import { useAuthContext } from "@/context/auth-context";
import MainHeader from "@/components/header/main-header";
import { redirect } from "next/navigation";
import { useEffect } from "react";

export default function SignedInLayout (
	{children}: Readonly<{children: React.ReactNode}>) {
	const {user} = useAuthContext();

	useEffect(() => {
		if (!user) {
			redirect('/')
		}
	}, [user])

	let content;

	if (user) {
		content = <>
			<MainHeader/>
			{children}
		</>
	} else {
		content = <></>
	}

	return content;
}