'use client';

import Image from "next/image";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { Button } from "@/components/ui/button"
import Link from "next/link";
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {

  const { data: session, status } = useSession();
  const router = useRouter();

  const handleLogin = async () => {
    const response = await signIn('google', { redirect: false });
    if (response?.ok) {
      router.push('/properties');  // Redirect to properties page
    }
  };

  useEffect(() => {
    if (status === "authenticated") {
      router.push('/properties');
    }
  }, [status, router]);

  return (
    <div className="h-screen w-screen bg-black flex flex-col justify-center items-center">
      {/* <BackgroundBeams /> */}
      <h1 className="text-8xl font-semibold bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 py-8">
        EstateSpot.
      </h1>

      <h1 className="text-gray-200 text-xl font-semibold ">
        Find your dream home with us.
      </h1>

      <Button variant="outline" className="absolute h-10 w-20 flex justify-center items-center bottom-14 z-20 font-bold transition-all ease-in-out delay-75 hover:bg-gray-200"
      
      onClick={handleLogin} 
      >
        Login
      </Button>

      <BackgroundBeams />
    </div>
  );
}
