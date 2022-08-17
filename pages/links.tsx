import DashboardLayout from "components/Layout/Dashboard";
import DashboardLink from "components/Links";
import type { NextPage } from "next";
import Head from "next/head";
import React from "react";


const Links: NextPage = () => {
 
  return (
    <DashboardLayout>
      <Head>
        <title>Links / Dashboard</title>
      </Head>
      <DashboardLink />
    </DashboardLayout>
  );
};

export default Links;
