"use client"
import {
     QueryClient,
     QueryClientProvider,
   } from '@tanstack/react-query';
   import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
   import { useState } from 'react';
function makeQueryClient() {
     return new QueryClient({
          defaultOptions: {
               queries: {
                    // With SSR, we usually want to set some default staleTime
                    // above 0 to avoid refetching immediately on the client
                    staleTime: 60 * 1000,
               },
          },
     })
}

let browserQueryClient: QueryClient | undefined = undefined



export default function ProviderQueryClient({ children }: { children: React.ReactNode }) {

     const [queryClient] = useState(() => new QueryClient({
          defaultOptions: {
               queries: {
                    // With SSR, we usually want to set some default staleTime
                    // above 0 to avoid refetching immediately on the client
                    staleTime: 60 * 1000, // Keep the data fresh for 1 minute


                    refetchInterval: 60 * 1000, // Refetch the data every minute

                   
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
