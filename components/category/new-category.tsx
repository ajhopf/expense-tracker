'use client'
import BasicLabelInput from "@/components/ui/basic-label-input";
import { useState } from "react";
import { addCategory } from "@/firebase/categories/categories";
import { useAuthContext } from "@/context/auth-context";

export default function NewCategory() {
	const {user} = useAuthContext();

	const [categoryName, setCategoryName] = useState('');
	const [categoryColor, setCategoryColor] = useState('');

	const handleFormSubmit = async (event) => {
		event.preventDefault();

		addCategory({name: categoryName, color: categoryColor, userId: user.uid})
	}

	return <form onSubmit={handleFormSubmit}>
		<BasicLabelInput
			borderColor={"green-700"}
			label={"Category"}
			required={true}
			onChangeFn={(e) => setCategoryName(e.target.value)}
			placeholder={"Shopping"}
			type={"text"}
			id={"category"}/>
		<BasicLabelInput
			borderColor={"green-700"}
			label={"Color"}
			required={true}
			onChangeFn={(e) => setCategoryColor(e.target.value)}
			placeholder={"#FFFFFF"}
			type={"text"}
			id={"color"}/>
		<button type="submit">
			Add Category
		</button>
	</form>
}