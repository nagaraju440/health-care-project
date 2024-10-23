"use client";
import { createClient } from "@/utils/supabase/client";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

export const Logout = () => {
  const supabase = createClient();
  const route = useRouter();
  return (
    <Button
      variant="default"
      onClick={async () => {
        await supabase.auth.signOut();
        route.replace("/login");
      }}
      className="absolute top-10 right-10"
    >
      Logout
    </Button>
  );
};
