import { supabaseClient } from "../supabase/supabaseClient";

export const handleSignUp = async ({
  email,
  password,
  phone,
  role,
  qualification, // Qualification for doctors
  reminders, // Reminders for patients
}: {
  email: string;
  password: string;
  phone?: string;
  role: "Doctor" | "Patient";
  qualification?: string; // Qualification field for doctors
  reminders?: object; // Reminders field for patients
}) => {
  // Step 1: Sign up the user using Supabase Auth
  const { data: signUpData, error: signUpError } =
    await supabaseClient.auth.signUp({
      email,
      password,
    });

  if (signUpError) {
    console.error("Error signing up:", signUpError.message);
    return;
  }

  const user = signUpData?.user;

  if (user) {
    // Step 2: Insert into public.user table
    const { data: userData, error: userInsertError } = await supabaseClient
      .from("user")
      .insert([
        {
          user_uuid: user.id, // Insert the user's UUID from Supabase Auth
          name: email, // Assuming name is same as email, update if you collect name separately
          phone: phone ? parseInt(phone, 10) : null,
          role: role,
        },
      ])
      .select(); // Retrieve inserted data, including user ID

    if (userInsertError) {
      console.error(
        "Error inserting into user table:",
        userInsertError.message
      );
      return;
    }

    // Extract user_id from inserted user record
    const userId = userData?.[0]?.id;

    if (userId) {
      // Step 3: Conditionally insert into doctor or patients table based on the role
      if (role === "Doctor") {
        // Insert into doctor table
        const { data: doctorData, error: doctorInsertError } =
          await supabaseClient.from("doctor").insert([
            {
              user_id: userId, // Link to the user table
              qualification: qualification || null, // Insert qualification if provided
            },
          ]);

        if (doctorInsertError) {
          console.error(
            "Error inserting into doctor table:",
            doctorInsertError.message
          );
        } else {
          console.log("Doctor created successfully:", doctorData);
        }
      } else if (role === "Patient") {
        // Insert into patients table
        const { data: patientData, error: patientInsertError } =
          await supabaseClient.from("patients").insert([
            {
              user_id: userId, // Link to the user table
              reminders: reminders || {}, // Insert reminders as JSONB if provided
            },
          ]);

        if (patientInsertError) {
          console.error(
            "Error inserting into patients table:",
            patientInsertError.message
          );
        } else {
          console.log("Patient created successfully:", patientData);
        }
      }
    } else {
      console.error("Failed to retrieve user ID from the inserted user data.");
    }
  }
};

export const handleLogin = async (email: string, password: string) => {
  const { data, error } = await supabaseClient.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.error("Login error:", error.message);
    return { error: error.message };
  }

  // Return the session data if successful
  return { session: data.session, user: data.user };
};
