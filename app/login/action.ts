"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";

export async function login({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const supabase = createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email,
    password,
  };

  const { error, data: authUserData } = await supabase.auth.signInWithPassword(
    data
  );

  if (error) {
    redirect("/error");
  }

  const { data: userData } = await supabase
    .from("user")
    .select("*")
    .eq("user_uuid", authUserData.user.id)
    .single();

  revalidatePath("/", "layout");

  if (userData.role === "Doctor") {
    redirect("/dashboard/doctor");
  }

  if (userData.role === "Patient") {
    redirect("/dashboard/patient");
  }
}

export async function signup({
  email,
  password,
  role,
}: {
  email: string;
  password: string;
  role: string;
}) {
  const supabase = createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email,
    password,
  };

  try {
    const { error, data: userData } = await supabase.auth.signUp(data);

    const user = userData?.user;

    if (user) {
      // Step 2: Insert into public.user table
      const { data: userData, error: userInsertError } = await supabase
        .from("user")
        .insert([
          {
            user_uuid: user.id, // Insert the user's UUID from Supabase Auth
            name: email, // Assuming name is same as email, update if you collect name separately
            phone: null,
            role: role,
          },
        ])
        .select(); // Retrieve inserted data, including user ID

      if (userInsertError) {
        console.error(
          "Error inserting into user table:",
          userInsertError.message
        );
        throw userInsertError;
        return;
      }

      // Extract user_id from inserted user record
      const userId = userData?.[0]?.id;

      if (userId) {
        // Step 3: Conditionally insert into doctor or patients table based on the role
        if (role === "Doctor") {
          // Insert into doctor table
          const { data: doctorData, error: doctorInsertError } = await supabase
            .from("doctor")
            .insert([
              {
                user_id: userId, // Link to the user table
                qualification: null, // Insert qualification if provided
              },
            ]);

          if (doctorInsertError) {
            console.error(
              "Error inserting into doctor table:",
              doctorInsertError.message
            );
            throw doctorInsertError;
          } else {
            console.log("Doctor created successfully:", doctorData);
          }
        } else if (role === "Patient") {
          // Insert into patients table
          const { data: patientData, error: patientInsertError } =
            await supabase.from("patients").insert([
              {
                user_id: userId, // Link to the user table
                reminders: {}, // Insert reminders as JSONB if provided
              },
            ]);

          if (patientInsertError) {
            console.error(
              "Error inserting into patients table:",
              patientInsertError.message
            );
            throw patientInsertError;
          } else {
            console.log("Patient created successfully:", patientData);
          }
        }
      } else {
        console.error(
          "Failed to retrieve user ID from the inserted user data."
        );
      }
    }
  } catch (error) {
    console.log("error occueed", error);
    redirect("/error");
  }
  revalidatePath("/", "layout");

  if (role === "Doctor") {
    redirect("/dashboard/doctor");
  } else if (role === "Patient") {
    redirect("/dashboard/patient");
  }
}
