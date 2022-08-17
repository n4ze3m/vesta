import React from "react";
import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { Auth } from "@supabase/ui";

const SupabaseClientContext = React.createContext<SupabaseClient | null>(null);

interface SupabaseProviderProps {
  children: React.ReactNode;
}

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);




export function SupabaseProvider({ children }: SupabaseProviderProps) {
  const [client] = React.useState(() => supabase);

  return (
    <SupabaseClientContext.Provider value={client}>
      <Auth.UserContextProvider supabaseClient={client}>
        {children}
      </Auth.UserContextProvider>
    </SupabaseClientContext.Provider>
  );
}

export function useSupabaseClient(): SupabaseClient {
  const client = React.useContext(SupabaseClientContext);
  if (client === null) {
    throw new Error(
      "Supabase client not provided via context.\n" +
        "Did you forget to wrap your component tree with SupabaseProvider?"
    );
  }
  return client;
}