import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";
import DoctorDashboard from "@/components/Doctor/DoctorDashboard";

export default async function PrivatePage() {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/login");
  }

  console.log("Doctor data", data);

  return (
    <div>
      <p>Hello {data.user.email}</p>
      <DoctorDashboard />
    </div>
  );
}
