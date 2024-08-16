"use client";

import { useAuth } from "@/hooks/useAuth";
import { ChakraProvider } from "@chakra-ui/react";
import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { persistQueryClient } from "@tanstack/react-query-persist-client";
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user } = useAuth();
  const router = useRouter();
  console.log(user);
  if (user === null) {
    router.push("/auth");
  }
  return (
    <html lang="en" style={{ height: "100%" }}>
      <body style={{ height: "100%" }}>
        <ChakraProvider>
          <QueryClientProvider client={queryClient}>
            <main style={{ height: "100%" }}>{children}</main>
          </QueryClientProvider>
        </ChakraProvider>
      </body>
    </html>
  );
}
