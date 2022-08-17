import CallbackBody from "components/Callback";
import LandingLayout from "components/Layout/Landing";
import type { NextPage } from "next";
import Head from "next/head";

const CallbackPage: NextPage = () => {
  return (
    <LandingLayout>
      <Head>
        <title>Please Wait... / Vesta</title>
      </Head>
      <CallbackBody />
    </LandingLayout>
  );
};

export default CallbackPage;
