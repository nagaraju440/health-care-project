import { redirect } from "next/navigation";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { createClient } from "@/utils/supabase/server";
import { Button } from "@/components/ui/button";
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

  if (userData?.role !== "Doctor") {
    return <div>Not have access to see this </div>;
  }

  console.log("doctoe data", data);

  return (
    <div>
      <Logout />
      <div>
        <Card>
          <CardHeader>
            <CardTitle>Today Appointments</CardTitle>
            {/* <CardDescription>Card Description</CardDescription> */}
          </CardHeader>
          <CardContent>
            <Table>
              <TableCaption>A list of Appointments.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Time</TableHead>
                  <TableHead>Patient Name</TableHead>
                  <TableHead>Reason</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">09:00 AM</TableCell>
                  <TableCell>John Doe</TableCell>
                  <TableCell>Check-up</TableCell>
                </TableRow>
                {/* Add more rows as needed */}
              </TableBody>
            </Table>
          </CardContent>
          <CardFooter>{/* <p>Card Footer</p> */}</CardFooter>
        </Card>

        <Card className="mt-4">
          <CardHeader>
            <CardTitle>Recent Patients</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableCaption>Recent Patients List</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Name</TableHead>
                  <TableHead>Last Visit</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">Jane Smith</TableCell>
                  <TableCell>10/22/2024</TableCell>
                  <TableCell>Follow-up</TableCell>
                </TableRow>
                {/* Add more rows as needed */}
              </TableBody>
            </Table>
          </CardContent>
          <CardFooter>{/* <p>Card Footer</p> */}</CardFooter>
        </Card>
      </div>
    </div>
  );
}
