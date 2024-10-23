import DoctorDashboard from "@/components/Doctor/DoctorDashboard";
import PatientDashboard from "@/components/Patient/PatientDashboard";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function Dashboard() {
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

  console.log("userData", userData, data.user.id);

  if (userData?.role === "Doctor") {
    return <DoctorDashboard />;
  }

  if (userData?.role === "Patient") {
    return <PatientDashboard />;
  }

  return <div>Invalid role</div>;
}
