import DashboardLayout from "components/Layout/Dashboard";
import DashboardLink from "components/Links";
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
const Links: NextPage = ({user}: any) => {
  //747gj4pwfrg67
  return (
    <DashboardLayout user={user}>
      <Head>
        <title>Links / Dashboard</title>
      </Head>
      <DashboardLink />
    </DashboardLayout>
  );
};

export default Links;
