import LandingLayout from "components/Layout/Landing";
import RegisterBody from "components/Register";
import type { NextPage } from "next";
import Head from "next/head";

const RegisterPage: NextPage = () => {
  return (
    <LandingLayout>
      <Head>
        <title>Register / Keeppt</title>
      </Head>
      <RegisterBody />
    </LandingLayout>
  );
};

export default RegisterPage;
