import DashboardArchives from "components/Archives";
import DashboardLayout from "components/Layout/Dashboard";
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
const Archives: NextPage = ({ user }: any) => {
  return (
    <DashboardLayout user={user}>
      <Head>
        <title>Archives / Dashboard</title>
      </Head>
      <DashboardArchives />
    </DashboardLayout>
  );
};

export default Archives;
