'use client'

import Link from "next/link";
import { AuthContext, useAuthContext } from "@/context/auth-context";
import { useContext } from "react";

export default function Home() {
  const {user} = useContext(AuthContext);

  console.log(user);

  return(
    <main>
      <Link href={'/signup'}>Sign Up</Link>
    </main>
  );
}
