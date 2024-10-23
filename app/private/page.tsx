import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";

export default async function PrivatePage() {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/login");
  }

  console.log("data issssssssss", data);

  return (
    <div>
      <p>Hello {data.user.email}</p>
    </div>
  );
}
