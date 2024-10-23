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
import { createClient } from "@/utils/supabase/client";
import { useEffect } from "react";

export default async function Layout({ children }: { children: React.ReactNode }) {
  const supabase=createClient()

//   useEffect(() => {
//     // Function to fetch data from an API
//     const fetchData = async () => {
//       try {
//         let { data: appointments, error } = await supabase
// .from('appointments')
// .select('*')
//     console.log(appointments)
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };

//     fetchData();
//   }, []);


        
console.log("appointments",appointments)
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Today's Appointments</CardTitle>
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
        <CardFooter>
          {/* <p>Card Footer</p> */}
        </CardFooter>
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
        <CardFooter>
          {/* <p>Card Footer</p> */}
        </CardFooter>
      </Card>
    </div>
  );
}
