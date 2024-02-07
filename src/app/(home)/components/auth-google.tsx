"use client";

import GoogleIcon from "@/components/icons/google";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";

function AuthGoogle() {
  return (
    <Button
      className="flex gap-2"
      type="submit"
      onClick={() => signIn("google", { callbackUrl: "/" })}
    >
      <div className="bg-white p-1 rounded-full">
        <GoogleIcon className="size-5" />
      </div>
      Continuar com o Google
    </Button>
  );
}

export default AuthGoogle;
