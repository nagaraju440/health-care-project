"use client";
import { createClient } from "@/utils/supabase/client";

export default function SampleComponent() {
  const supabase = createClient();
  return (
    <div>
      <p>Sample Component</p>
      <button
        onClick={async () => {
          const { error } = await supabase.auth.signOut();
          console.log("error", error);
        }}
      >
        log out
      </button>
    </div>
  );
}
