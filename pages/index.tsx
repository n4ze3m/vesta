import DashboardHome from "components/Home";
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

const Home: NextPage = ({ user }: any) => {
  // const [isConnected, setIsConnected] = useState(false)
  // const [err, setErr] = useState('')
  // const [haveError, setHaveError] = useState(false)

  // useEffect(() => {
  //   checkConnection()
  // }, [])

  // const checkConnection = async () => {
  //   try {

  //   } catch (e) {
  //     setErr('Sorry, your browser is not supported')
  //     setHaveError(true)
  //   }
  // }

  return (
    <DashboardLayout user={user}>

      <Head>
        <title>Home / Dashboard</title>
      </Head>
      <DashboardHome />
    </DashboardLayout>
  );
};

export default Home;
