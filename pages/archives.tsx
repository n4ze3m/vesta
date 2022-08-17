import DashboardArchives from "components/Archives";
import DashboardLayout from "components/Layout/Dashboard";
import type { NextPage } from "next";
import Head from "next/head";

const Archives: NextPage = () => {
  return (
    <DashboardLayout>
      <Head>
        <title>Archives / Dashboard</title>
      </Head>
      <DashboardArchives />
    </DashboardLayout>
  );
};

export default Archives;
