"use client";

import Google from "@/components/icons/google";
import { Button } from "@/components/ui/button";
import { useSession, signIn } from "next-auth/react";

function AuthGoogle() {
  const { data: session } = useSession();

  return (
    <>
      {/* {session?.user?.email} */}
      <Button className="flex gap-2" onClick={() => signIn()}>
        <div className="bg-white p-1 rounded-full">
          <Google className="size-5" />
        </div>
        Continuar com o Google
      </Button>
    </>
  );
}

export default AuthGoogle;
