"use client";

import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import {
    useQuery,
    useMutation,
    useQueryClient,
    QueryClient,
    QueryClientProvider,
} from "@tanstack/react-query";
import RefreshToken from "./refresh-token";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            refetchOnMount: false,
        },
    },
});

export default function AppProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <QueryClientProvider client={queryClient}>
            {children}
            <RefreshToken />
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    );
}
