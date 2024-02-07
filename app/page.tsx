'use client'

import Image from "next/image";
import loginImg from "@/public/assets/login-img.png"
import LoginForm from "@/components/auth/login-form";
export default function Home() {
  return(
    <main className="h-[100vh] flex flex-col md:flex-row">
      <div className="border md:w-1/2 flex justify-center items-center">
        <Image className="max-h-[500px] w-[500px]" src={loginImg} alt={"Pigy bank drawing with coins"}/>
      </div>
      <div className="border flex text-center items-center md:w-1/2">
        <LoginForm/>
      </div>
    </main>
  );
}

//      Illustration by <a href="https://icons8.com/illustrations/author/eEbrZFlkyZbD">Anna A</a> from <a href="https://icons8.com/illustrations">Ouch!</a>
