'use client'
import signOutOfApp from "@/firebase/auth/signout";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/context/auth-context";
import Image from "next/image";
import clsx from "clsx";
import { useState } from "react";

const MainHeader = () => {
	const {user} = useAuthContext();
	const router = useRouter();
	const [openMenu, setOpenMenu] = useState(false);
	let photoUrl = ''

	if (user) {
		photoUrl = "https://robohash.org/" + user.email;
	}


	const onOpenMenu = () => {
		setOpenMenu(prevState => !prevState)
	}

	const onSignOut = () => {
		router.push('/')
		signOutOfApp()
	}

	return <header className="bg-sky-500 flex items-center justify-end h-[100px]">
		<div>
			<button onClick={onOpenMenu}>
				<Image src={photoUrl} alt="User avatar" height={100} width={100}></Image>
			</button>
		</div>
		<div className={clsx(!openMenu ? 'hidden' : 'absolute top-[100px] right-[10px]')}>
			<button onClick={onSignOut}>
				Sign Out
			</button>
		</div>
	</header>
};

export default MainHeader;

