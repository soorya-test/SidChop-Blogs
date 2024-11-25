"use client";

import { use, useEffect, useState } from "react";
import { format } from "date-fns";
import { notFound } from "next/navigation";

import { getBlogById, getUserFromId } from "@/lib/axios";
import { TBlogWithUserName } from "@/types/blog";
export default function BlogPostPage({ params }: { params: { id: string } }) {
  // @ts-ignore
  const resolvedParams: { id: string } = use(params);

  if (!resolvedParams.id) notFound();

  const [finalPost, setFinalPost] = useState<TBlogWithUserName>();

  useEffect(() => {
    const fetchData = async () => {
      const post = await getBlogById(+resolvedParams.id);
      console.log({ post: post?.data });
      if (!post) notFound();
      const user = await getUserFromId(post?.data.author_id);
      console.log({ user: user?.data });
      if (!user) notFound();
      const finalPost: TBlogWithUserName = {
        ...post.data,
        full_name: user.data.full_name,
      };

      setFinalPost(finalPost);
    };

    fetchData();
  }, []);

  if (!finalPost) return;

  return (
    <article className="max-w-2xl mx-auto px-4 py-12">
      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-2">{finalPost.title}</h1>
        <div className="text-sm text-gray-500">
          <span>By {finalPost.full_name}</span>
          <span className="mx-2">•</span>
          <time dateTime={finalPost.created_at}>
            {format(new Date(finalPost.created_at), "MMMM d, yyyy")}
          </time>
        </div>
      </header>
      <div className="prose max-w-none">
        {finalPost.content.split("\n").map((paragraph, index) => (
          <p key={index} className="mb-4">
            {paragraph}
          </p>
        ))}
      </div>
    </article>
  );
}
