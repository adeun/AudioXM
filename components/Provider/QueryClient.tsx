"use client"
import {
     QueryClient,
     QueryClientProvider,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useState } from 'react';

export default function ProviderQueryClient({ children }: { children: React.ReactNode }) {

     const [queryClient] = useState(() => new QueryClient({
          defaultOptions: {
               queries: {
                    // General settings for query behavior
                    staleTime: 60 * 1000, // 1 minute
                    refetchInterval: 60 * 1000, // Refetch the data every minute
                    refetchOnWindowFocus: false, // Don't refetch when window regains focus
                    refetchOnReconnect: true, // Refetch when reconnecting to the internet
                    refetchOnMount: false, // Don't refetch when the component remounts
                    retry: 3, // Retry failed queries 3 times before throwing an error
                    retryDelay: (attemptIndex: number) => Math.min(1000 * 2 ** attemptIndex, 30000), // Exponential backoff with max 30s
                    
                    
               },
               mutations: {
                    // Mutation-specific settings
                    retry: 3,
                    onError: (error: any) => {
                         console.error("Error performing mutation: ", error);
                    },
               },
          },
     }));

     return (
          <QueryClientProvider client={queryClient}>
               {children}
               <ReactQueryDevtools initialIsOpen={true} />
          </QueryClientProvider>
     )
}
