"use client";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/router";
import { useReducer } from "react";

export default function SampleComponent() {
  const router = useRouter();
  const supabase = createClient();
  return (
    <div>
      <p>Sample Component</p>
      <button
        onClick={async () => {
          const { error } = await supabase.auth.signOut();
          if (!error) {
            router.push("/");
          }
          console.log("error", error);
        }}
      >
        log out
      </button>
    </div>
  );
}
