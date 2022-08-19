import DashboardHome from "components/Home";
import DashboardLayout from "components/Layout/Dashboard";
import type { NextPage } from "next";
import Head from "next/head";
import { Auth } from "@supabase/ui"
import { useRouter } from "next/router";
import React from "react";
import { User } from "@supabase/supabase-js";
import { useQuery } from "react-query";
import axios from "axios";

const Home: NextPage = () => {
  const [user, setUser] = React.useState<User | null>();
  const router = useRouter();
  const session = Auth.useUser();
  React.useEffect(() => {
    if (session.user === null) {
      router.push("/login");
    } else {
      setUser(session.user);
    }
  }, [session]);


  const {
    data,
    status
  } = useQuery(["fetchInbox", user], async () => {
    const response = await axios.get("/api/keep/get", {
      headers: {
        user_id: user && user.id || "",
      }
    })
    return response.data;
  }, {
    enabled: Boolean(user),
    refetchIntervalInBackground: true,
    refetchInterval: 5000,
  })
  return (
    <DashboardLayout>
      <Head>
        <title>Home / Dashboard</title>
      </Head>
      <DashboardHome status={status} data={data || []} />
    </DashboardLayout>
  );
};

export default Home;
