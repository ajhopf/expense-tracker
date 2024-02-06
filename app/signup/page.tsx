'use client'
import React from "react";
import signUp from "@/firebase/auth/signup";
import { useRouter } from 'next/navigation'
import { addAccount } from "@/firebase/accounts/accounts";

const SignUpPage = () => {
	const [email, setEmail] = React.useState('')
	const [password, setPassword] = React.useState('')
	const [displayName, setDisplayName] = React.useState('');
	const [photoUrl, setPhotoUrl] = React.useState();
	const router = useRouter()

	const handleForm = async (event) => {
		event.preventDefault()

		const { result, error } = await signUp(displayName, email, password);

		console.log(result);

		if (!error) {
			addAccount(result.user.uid);
		}

		if (error) {
			return console.log(error)
		}

		// else successful
		return router.push("/dashboard")
	}
	return (<div className="wrapper">
		<div className="form-wrapper">
			<h1 className="mt-60 mb-30">Sign up</h1>
			<form onSubmit={handleForm} className="form">
				<div>
					<label htmlFor="name">Name</label>
					<input onChange={(e) => setDisplayName(e.target.value)} required type="text" name="name" id="name" placeholder="nome" />
				</div>
				<div>
					<label htmlFor="email">Email</label>
					<input onChange={(e) => setEmail(e.target.value)} required type="email" name="email" id="email" placeholder="example@mail.com" />
				</div>
				<div>
					<label htmlFor="password">Password</label>
					<input onChange={(e) => setPassword(e.target.value)} required type="password" name="password" id="password" placeholder="password" />
				</div>
				<button type="submit">Sign up</button>
			</form>
		</div>
	</div>);
}

export default SignUpPage;