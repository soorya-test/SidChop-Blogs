import Link from "next/link";

import { Button } from "@/components/ui/button";
import { cn } from "@/utils/cn";

export default function Home() {
  return (
    <div className="flex flex-col min-h-[92%]">
      <main className="flex-1">
        <section
          className={cn(
            "w-full flex justify-center items-center py-12 md:py-24 lg:py-32",
            "xl:py-48"
          )}
        >
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Welcome to Madeline Blog
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  Discover insightful articles, expert opinions, and the latest
                  trends in technology and beyond.
                </p>
              </div>
              <div className="3xs:space-x-4 space-y-4 justify-center">
                <Link href="/posts">
                  <Button>Browse Blogs</Button>
                </Link>
                <Link href="/posts/create">
                  <Button variant="outline">Create a Blog</Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          © 2024 Madeline Blog. All rights reserved.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link
            className="text-xs hover:underline underline-offset-4"
            href="https://github.com/soorya-u/Madeline-Blog"
            target="_blank"
          >
            Source Code
          </Link>
        </nav>
      </footer>
    </div>
  );
}
