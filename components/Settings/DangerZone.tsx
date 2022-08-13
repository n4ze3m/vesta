import { Button } from "@mantine/core";
import { useRouter } from "next/router";
import React from "react";
import { Logout } from "tabler-icons-react";

export default function DangerZone() {
  const router = useRouter();

  return (
    <div>
      <Button
        onClick={() => router.push("/api/logout")}
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
