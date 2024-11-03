"use client";

import { useAuth } from "@/hooks/useAuth";
import { ChakraProvider } from "@chakra-ui/react";
import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { persistQueryClient } from "@tanstack/react-query-persist-client";
import { AppProps } from "next/app";
import { useRouter } from "next/navigation";

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
  // const { user } = useAuth();
  // const router = useRouter();

  // if (user === null) {
  //   router.push("/auth");
  // }

  return (
    <ChakraProvider>
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
      </QueryClientProvider>
    </ChakraProvider>
  );
}
