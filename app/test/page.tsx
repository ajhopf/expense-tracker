'use client'
import { useAuthContext } from "@/context/auth-context";
import { redirect } from "next/navigation";


const TestPage = () => {
	const { user } = useAuthContext();

	if (!user) {
		redirect('/signin')
	}

	return <h1>user: {user.email ? user.email : ''}</h1>
}

export default TestPage;