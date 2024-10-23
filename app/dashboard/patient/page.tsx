import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";
import DoctorDashboard from "@/components/Doctor/DoctorDashboard";
import { Logout } from "@/components/Auth/Logout";

export default async function PrivatePage() {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/login");
  }

  const { data: userData } = await supabase
    .from("user")
    .select("*")
    .eq("user_uuid", data.user.id)
    .single();

  if (userData?.role !== "Patient") {
    return <div>Not have access to see this </div>;
  }

  console.log("Doctor data", data);

  return (
    <div>
      <Logout />
      <p>Hello {data.user.email}</p>
    </div>
  );
}
