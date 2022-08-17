import { Container } from "@mantine/core";
import React from "react";
import KeepLoading from "components/Common/Loading";
import CommonKeepDnd from "components/Common/CommonDnd";
import { User } from "@supabase/supabase-js";
import { useRouter } from "next/router";
import { Auth } from "@supabase/ui";
import { useQuery } from "react-query";
import axios from "axios";

export default function DashboardArchives() {
  const [user, setUser] = React.useState<User | null>();
  const router = useRouter();
  const session = Auth.useUser();
  React.useEffect(() => {
    if (session.user === null) {
      router.push("/login");
    } else {
      setUser(session.user);
    }
  }, []);

  const {
    data,
    status
  } = useQuery(["fetchArchive", user], async () => {
    const response = await axios.get("/api/keep/get?type=archive", {
      headers: {
        user_id: user && user.id || "",
      }
    })
    return response.data;
  }, {
    enabled: Boolean(user),
  })

  return (
    <Container>
      {status === "loading" && <KeepLoading />}

      {status === "success" && <CommonKeepDnd type="archive" data={data!} />}
    </Container>
  );
}
