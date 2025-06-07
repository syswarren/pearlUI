import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-background text-foreground p-8">
      <Image
        className="mb-8 dark:invert"
        src="/next.svg"
        alt="Next.js logo"
        width={180}
        height={38}
        priority
      />
      <h1 className="text-4xl font-bold mb-4">Welcome to Your Dashboard App</h1>
      <p className="text-lg mb-8 text-center max-w-xl">
        This is your new Next.js project with TailwindCSS, Shadcn UI, and Lucide icons. Click below to access your dashboard.
      </p>
      <Link
        href="/dashboard"
        className="inline-block rounded-lg bg-primary px-6 py-3 text-lg font-semibold text-primary-foreground shadow-md transition-colors hover:bg-primary/80 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
      >
        Go to Dashboard
      </Link>
    </div>
  );
}
