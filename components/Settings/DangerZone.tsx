import { Button } from "@mantine/core";
import { supabase } from "lib/supabase";
import { useRouter } from "next/router";
import React from "react";
import { Logout } from "tabler-icons-react";

export default function DangerZone() {
  const router = useRouter();

  return (
    <div>
      <Button
        onClick={async () => {
          await supabase.auth.signOut();
          router.push("/login");
        }}
        size="xs"
        color="red"
        leftIcon={<Logout />}
        variant="white"
      >
        Logout
      </Button>
    </div>
  );
}
