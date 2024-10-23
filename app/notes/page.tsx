"use client";
import { supabaseClient } from "@/utils/supabase/supabaseClient";
import { useEffect } from "react";

export default function Notes() {
  return <Sample />;
}

const Sample = () => {
  useEffect(() => {
    const fetch = async () => {
      const { data: notes } = await supabaseClient.from("user").select("*");

      console.log("notes ", notes);
    };
    fetch();
  }, []);
  return <div>hello</div>;
};
