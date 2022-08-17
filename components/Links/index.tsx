import { Container} from "@mantine/core";
import React from "react";
import KeepLoading from "components/Common/Loading";
import CommonKeepDnd from "components/Common/CommonDnd";
import { useRouter } from "next/router";
import { Auth } from "@supabase/ui";
import axios from "axios";
import { useQuery } from "react-query";
import { User } from "@supabase/supabase-js";

export default function DashboardLink() {
 
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
  } = useQuery(["fetchLinks", user], async () => {
    const response = await axios.get("/api/keep/get?type=link", {
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

      {status === "success" && <CommonKeepDnd type="link" data={data!} />}
    </Container>
  );
}
