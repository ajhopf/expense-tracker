import React from "react";

export default function BasicLabelInput({
		onChangeFn,
		id,
		type,
		required,
		label,
		placeholder
	}) {
	return <div className="flex flex-col items-start m-4">
		<label htmlFor={ id }>{label}</label>
		<input
			className="p-2 my-2 border-2 rounded border-green-700 outline-none focus:ring-offset-2 focus:ring focus:ring-green-700 focus:border-green w-full"
			onChange={onChangeFn}
			required={required}
			type={type}
			name={id}
			id={id}
			placeholder={ placeholder } />
	</div>
}