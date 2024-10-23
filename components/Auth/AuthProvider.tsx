import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { supabaseClient } from "@/utils/supabase/supabaseClient";
import { User } from "@supabase/supabase-js";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Fetch session on initial load
    const getSession = async () => {
      const { data } = await supabaseClient.auth.getSession();

      if (data?.session) {
        setUser(data.session.user);
      } else {
        setUser(null);
      }
    };

    getSession();

    // Listen to authentication state changes
    const { data: authListener } = supabaseClient.auth.onAuthStateChange(
      (event, session) => {
        if (event === "SIGNED_OUT") {
          setUser(null);
          router.push("/login");
        } else if (event === "SIGNED_IN") {
          setUser(session?.user ?? null);
        }
      }
    );

    // Cleanup the listener on unmount
    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, [router]);

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
