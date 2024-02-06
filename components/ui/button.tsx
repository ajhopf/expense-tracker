export default function Button({type, label, className}) {
	return <button type={type} className={'p-1 mx-1 border rounded ' + className}>
		{label}
	</button>
}