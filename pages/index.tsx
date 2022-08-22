import type { NextPage } from "next";
import Head from "next/head";
import { Auth } from "@supabase/ui"
import { useRouter } from "next/router";
import React from "react";
import LandingLayout from "components/Layout/Landing";
import LandingBody from "components/Landing";

const MainPage: NextPage = () => {
    const router = useRouter();
    const session = Auth.useUser();
    React.useEffect(() => {
        if (session.user) {
            router.push("/home");
        }
    }, [session]);

    return (
        <LandingLayout>
            <Head>
                <title>The Open Source Google Keep Alternative. / Vesta</title>
            </Head>
            <LandingBody />
        </LandingLayout>
    );
};

export default MainPage;
