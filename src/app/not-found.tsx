import { ErrorDisplay } from '@/components/atoms/ErrorDisplay';
import { monocraft } from "@/styles/fonts";

export default function RootNotFound() {
  return (
    <html lang="en" className={`${monocraft.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-[#020617] text-[#f8fafc] font-sans">
        <main className="flex-grow flex flex-col items-center justify-center min-h-screen p-4">
          <ErrorDisplay
            code="404"
            title="Page Not Found"
            description="The page you are looking for does not exist or has been moved. (Chunk error: Void detected)"
            buttonText="Go Home"
            href="/"
            variant="404"
          />
        </main>
      </body>
    </html>
  );
}
