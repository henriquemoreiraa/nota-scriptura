import { Button } from "@/components/ui/button";
import { LogInIcon } from "lucide-react";

export default function Home() {
  return (
    <div>
      <Button>
        <LogInIcon className="mr-2 size-5" />
        Login
      </Button>
    </div>
  );
}
