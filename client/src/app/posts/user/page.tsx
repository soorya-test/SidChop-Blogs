"use client";

import { useState, useEffect } from "react";

import { getUserFromHeader, getBlogPosts, deleteBlogFunc } from "@/lib/axios";
import { TBlogWithUserName } from "@/types/blog";
import BlogPostCard from "@/components/blog-post-card";
import { notFound, useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { LoaderPinwheel } from "lucide-react";
import { useToken } from "@/hooks/use-context";

export default function UserBlogListingPage() {
  const [posts, setPosts] = useState<TBlogWithUserName[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const { token: accessToken } = useToken();

  const deleteFn = async (id: number) => {
    try {
      if (!accessToken)
        return toast({
          title: "Not Logged In",
          description: "You need to login to delete Blog Post",
          variant: "destructive",
        });

      const res = await deleteBlogFunc(accessToken, id);
      if (res && +res.status !== 200)
        return toast({
          title: "Blog Delete Failed",
          variant: "destructive",
          description: "Something went wrong",
          duration: 4000,
        });

      toast({
        title: "Blog Delete Successfully",
        variant: "default",
        duration: 4000,
      });
      fetchPosts().finally(() => setLoading(false));
    } catch (err) {
      return toast({
        title: "Blog Delete Failed",
        variant: "destructive",
        description:
          err instanceof Error ? err.message : "Something went wrong",
        duration: 4000,
      });
    }
  };

  const fetchPosts = async () => {
    setLoading(true);

    if (!accessToken) {
      toast({ title: "Unauthorized accesss", variant: "destructive" });
      return router.replace("/");
    }

    const user = await getUserFromHeader(accessToken);
    if (!user) {
      toast({ title: "Expired Token", variant: "destructive" });
      return router.replace("/auth/login");
    }

    const blogs = await getBlogPosts();
    if (!blogs) return notFound();

    setPosts(
      blogs.data
        .filter((b) => b.author_id === user.data.id)
        .map((b) => ({ ...b, full_name: user.data.full_name }))
    );
  };

  useEffect(() => {
    fetchPosts().finally(() => setLoading(false));
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Blog Posts</h1>

      {loading ? (
        <div className="w-screen mt-16">
          <LoaderPinwheel
            size={50}
            color="black"
            className="animate-spin mx-auto"
          />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.length > 0 ? (
            posts.map((post) => (
              <BlogPostCard
                key={post.id}
                post={post}
                isEdit
                deleteFn={() => deleteFn(post.id)}
              />
            ))
          ) : (
            <h1>No Posts Available</h1>
          )}
        </div>
      )}
    </div>
  );
}
