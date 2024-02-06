'use client'

import React from "react";
import { useRouter } from "next/navigation";
import signIn from "@/firebase/auth/signin";
import BasicLabelInput from "@/components/ui/basic-label-input";

export default function LoginForm() {
	const [email, setEmail] = React.useState('');
	const [password, setPassword] = React.useState('');

	const router = useRouter();

	const handleForm = async (event) => {
		event.preventDefault()

		const { result, error } = await signIn(email, password);

		if (error) {
			return console.log(error)
		}

		return router.push("/dashboard")
	}

	return (<div className="w-full">
			<h1>Control your money</h1>
			<form onSubmit={handleForm} className="form">
				<BasicLabelInput
					onChangeFn={(e)=>setEmail(e.target.value)}
					id={"email"}
					required={true}
					label={"Email"}
					placeholder={"email@expensetracker.com"}
				/>
				<BasicLabelInput
					onChangeFn={(e) => setPassword(e.target.value)}
					id={"password"}
					type={"password"}
					required={true}
					label={"Password"}
					placeholder={"password"}
					/>
				<button
					className="rounded border p-2 border-green-700 border-2 hover:ring hover:ring-offset-2 hover:ring-green-700"
					type="submit">Sign In</button>
			</form>
		</div>);
}