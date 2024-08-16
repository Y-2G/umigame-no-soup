"use client";

import { ChakraProvider } from "@chakra-ui/react";
import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  persistQueryClient,
  PersistQueryClientProvider,
  persistQueryClientSave,
} from "@tanstack/react-query-persist-client";
import { useEffect } from "react";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: 1000 * 60 * 60 * 24, // 24 hours
    },
  },
});

const persister = createSyncStoragePersister({
  throttleTime: 3000,
  storage: globalThis.localStorage,
});

persistQueryClient({
  queryClient,
  persister,
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" style={{ height: "100%" }}>
      <body style={{ height: "100%" }}>
        <ChakraProvider>
          <PersistQueryClientProvider
            client={queryClient}
            persistOptions={{ persister }}
          >
            <main style={{ height: "100%" }}>{children}</main>
          </PersistQueryClientProvider>
        </ChakraProvider>
      </body>
    </html>
  );
}
