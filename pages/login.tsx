import { Auth } from "@supabase/ui";
import LandingLayout from "components/Layout/Landing";
import LoginBody from "components/Login";
import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";

const LoginPage: NextPage = () => {
  const session = Auth.useUser();
  const router = useRouter();
  React.useEffect(() => {
    if (session.user) {
      router.push("/");
    }
  }, [session]);
  return (
    <LandingLayout>
      <Head>
        <title>Login / Vesta</title>
      </Head>
      <LoginBody />
    </LandingLayout>
  );
};

export default LoginPage;
