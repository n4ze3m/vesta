import LandingLayout from "components/Layout/Landing";
import LoginBody from "components/Login";
import type { NextPage } from "next";
import Head from "next/head";

const LoginPage: NextPage = () => {
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
