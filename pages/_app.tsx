import "bootstrap/dist/css/bootstrap.css";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "react-query";
import { MantineProvider } from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";
import { SupabaseProvider } from "lib/supabase";

export const queryClient = new QueryClient();
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SupabaseProvider>
    <QueryClientProvider client={queryClient}>
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          colorScheme: "dark",
          fontFamily: "Poppins",
        }}
      >
        <NotificationsProvider>
          <Component {...pageProps} />
        </NotificationsProvider>
      </MantineProvider>
    </QueryClientProvider>
    </SupabaseProvider>
  );
}

export default MyApp;
