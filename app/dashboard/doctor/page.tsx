import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";
import PatientDashboard from "@/components/Patient/PatientDashboard";

export default async function PrivatePage() {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/login");
  }

  console.log("Patient data", data);

  return (
    <div>
      <p>Hello {data.user.email}</p>
      <PatientDashboard />
    </div>
  );
}
