import DashboardLayout from "components/Layout/Dashboard";
import SettingsBody from "components/Settings";
import type { NextPage } from "next";
import Head from "next/head";

const Settings: NextPage = () => {
  return (
    <DashboardLayout>
      <Head>
        <title>Settings / Dashboard</title>
      </Head>
      <SettingsBody />
    </DashboardLayout>
  );
};

export default Settings;
