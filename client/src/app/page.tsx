import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { cn } from "@/utils/cn";
import Header from "@/components/header";

export default function Home() {
  const blogs = [1, 2, 3];

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <section
          className={cn(
            "w-full flex justify-center items-center py-12 md:py-24 lg:py-32",
            blogs.length == 0 && "xl:py-48"
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
                <Link href="/">
                  <Button>Browse Blogs</Button>
                </Link>
                <Link href="/posts/create">
                  <Button variant="outline">Create a Blog</Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
        {blogs.length > 0 && (
          <section className="w-full flex justify-center items-center py-12 md:py-24 lg:py-32 bg-white dark:bg-gray-800">
            <div className="container px-4 md:px-6">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8">
                Recent Posts
              </h2>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {blogs.map((i) => (
                  <Card key={i}>
                    <CardHeader>
                      <CardTitle>Blog Post {i}</CardTitle>
                      <CardDescription>
                        Posted on January {i}, 2023
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p>
                        This is a brief excerpt from blog post {i}. Click to
                        read more...
                      </p>
                    </CardContent>
                    <CardFooter>
                      <Button variant="link">Read More</Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          © 2023 Madeline Blog. All rights reserved.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  );
}
