"use client";

import { useState, useEffect } from "react";
import { LoaderPinwheel } from "lucide-react";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getBlogPosts, getUserFromId } from "@/lib/axios";
import { TBlogWithUserName } from "@/types/blog";
import BlogPostCard from "@/components/blog-post-card";

export default function BlogListingPage() {
  const [loading, setLoading] = useState(false);
  const [rawPosts, setRawPosts] = useState<TBlogWithUserName[]>([]);
  const [posts, setPosts] = useState<TBlogWithUserName[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("date");

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      const res = await getBlogPosts();
      if (res) {
        const blogwithUserName = await Promise.all(
          res.data.map(async (d) => {
            const res = await getUserFromId(d.author_id);
            if (res) {
              return { ...d, full_name: res.data.full_name };
            }
          })
        );

        const finalArray = blogwithUserName.filter((b) => !!b);

        setRawPosts(finalArray);
        setPosts(
          finalArray.sort(
            (a, b) =>
              new Date(b.updated_at).getTime() -
              new Date(a.updated_at).getTime()
          )
        );
      }
    };
    fetchPosts().finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    console.log({ searchTerm });
    setPosts(
      rawPosts.sort((a, b) => {
        if (sortBy === "date") {
          return (
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
          );
        } else {
          return a.title.localeCompare(b.title);
        }
      })
    );

    if (searchTerm)
      setPosts((prev) =>
        prev.filter(
          (p) =>
            p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            p.full_name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
  }, [sortBy, searchTerm, rawPosts]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Blog Posts</h1>

      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <Input
          type="text"
          placeholder="Search posts or author..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="md:w-1/3"
        />

        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="md:w-1/3">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="date">Date</SelectItem>
            <SelectItem value="title">Title</SelectItem>
          </SelectContent>
        </Select>
      </div>
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
            posts.map((post) => <BlogPostCard key={post.id} post={post} />)
          ) : (
            <h1>No Posts Available</h1>
          )}
        </div>
      )}
    </div>
  );
}
