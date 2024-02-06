import React from "react";

export default function BasicLabelInput({
		onChangeFn,
		id,
		type,
		required,
		label,
		placeholder,
		step,
		borderColor,
		value
	}) {
	return <div className="flex flex-col items-start m-4">
		<label className={"text-sm font-semibold leading-6 text-gray-900"} htmlFor={id}>{label}</label>
		<input
			className={`p-2 my-2 border-2 rounded border-${borderColor} outline-none focus:ring-offset-2 focus:ring focus:ring-${borderColor} w-full`}
			value={value}
			onChange={onChangeFn}
			required={required}
			type={type}
			name={id}
			id={id}
			placeholder={placeholder}
			step={step}/>
	</div>
}