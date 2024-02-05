'use client'
import signOutOfApp from "@/firebase/auth/signout";
import { useRouter } from "next/navigation";

const MainHeader = () => {
	const router = useRouter();

	const onSignOut = () => {
		signOutOfApp();
		router.push('/signin')
	}

	return <>
		<button onClick={onSignOut}>
			Sign Out
		</button>
	</>
};

export default MainHeader;

