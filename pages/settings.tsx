import DashboardLayout from "components/Layout/Dashboard";
import SettingsBody from "components/Settings";
import { withSessionSsr } from "lib/withSession";
import type { NextPage } from "next";
import Head from "next/head";
export const getServerSideProps = withSessionSsr(
  async function getServerSideProps({ req }) {
    const user = req.session.user;
    if (!user) {
      return {
        redirect: {
          destination: "/login",
          permanent: false,
        },
      };
    }

    return {
      props: {
        user: user,
      },
    };
  }
);
const Settings: NextPage = ({ user }: any) => {
  return (
    <DashboardLayout user={user}>

      <Head>
        <title>Settings / Dashboard</title>
      </Head>
      <SettingsBody />
    </DashboardLayout>
  );
};

export default Settings;
