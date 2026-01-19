"use client";

import { signIn } from "next-auth/react";
import Image from "next/image";
import { Button } from "../ui/button";

const GoogleLoginButton = () => {
  return (
    <Button variant={"secondary"}
      onClick={() => signIn("google", { callbackUrl: "/" })}
      className="items-center mt-4 gap-3 border border-gray-300  shadow-sm hover:shadow-md transition bg-white flex relative justify-center rounded-md  px-3 py-1.5 text-sm/6 font-semibold text-white focus-visible:outline-offset-2 w-full lg:py-6 cursor-pointer"
    >
      <Image
        src="/assets/images/google.png"
        alt="Google logo"
        width={20}
        height={20}
      />
      <span className="text-sm text-gray-700 font-medium md:text-lg lg:text-xl">Sign in with Google</span>
    </Button>
  );
}

export default GoogleLoginButton 