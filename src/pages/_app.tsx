import { useAuth } from "@/hooks/useAuth";
import { Provider as ChakraProvider } from "@/components/ui/provider";
import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { persistQueryClient } from "@tanstack/react-query-persist-client";
import { AppProps } from "next/app";
import { useRouter } from "next/navigation";
import { ThemeProvider } from "next-themes"


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: 1000 * 60 * 60 * 24,
    },
  },
});

const persister = createSyncStoragePersister({
  storage: globalThis.localStorage,
});

persistQueryClient({
  queryClient,
  persister,
});

export default function App({ Component, pageProps }: AppProps) {
  const { user } = useAuth();
  const router = useRouter();

  if (user === null) {
    router.push("/auth");
  }

  return (
      <QueryClientProvider client={queryClient}>
        <ChakraProvider>
          <ThemeProvider attribute="class" disableTransitionOnChange>
            <Component {...pageProps} />
          </ThemeProvider>
        </ChakraProvider>
      </QueryClientProvider>
  );
}
