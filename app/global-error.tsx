'use client'
import { Button } from "@/components/ui/button"

 // Error boundaries must be Client Components

export default function GlobalError({
     error,
     reset,
}: {
     error: Error & { digest?: string }
     reset: () => void
}) {
     return (
          // global-error must include html and body tags
          <html>
               <body className="min-h-screen bg-background font-sans antialiased flex items-center justify-center">
                    <h2 className=" text-5xl">Something went wrong!</h2>
                    <Button size={"lg"} variant={"destructive"} onClick={() => reset()}>Try again</Button>
               </body>
          </html>
     )
}