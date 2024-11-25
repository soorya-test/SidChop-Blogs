"use client";

import { use, useEffect, useState } from "react";
import { format } from "date-fns";
import { notFound } from "next/navigation";

import { getBlogById } from "@/lib/axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEditBlog } from "@/hooks/use-edit-blog";
import { Textarea } from "@/components/ui/textarea";
import { TBlogPost } from "@/types/blog";
export default function BlogPostEditPage({
  params,
}: {
  params: { id: string };
}) {
  // @ts-expect-error
  const resolvedParams: { id: string } = use(params);

  if (!resolvedParams.id) notFound();

  const [finalPost, setFinalPost] = useState<TBlogPost>();

  const { errors, handleSubmit, isSubmitting, register, setValue } =
    useEditBlog(+resolvedParams.id);
  useEffect(() => {
    const fetchData = async () => {
      const post = await getBlogById(+resolvedParams.id);
      console.log({ post: post?.data });
      if (!post) notFound();

      setFinalPost(post.data);
      setValue("title", post.data.title);
      setValue("content", post.data.content);
    };

    fetchData();
  }, []);

  if (!finalPost) return;

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto px-4 py-12">
      <header className="mb-8">
        <Input {...register("title")} className="w-full" />
        {errors.title && errors.title.message && (
          <span className="text-xs text-red-500">{errors.title.message}</span>
        )}
        <div className="text-sm text-gray-500 mt-2 ml-2">
          <span>By You</span>
          <span className="mx-2">•</span>
          <time dateTime={finalPost.created_at}>
            {format(new Date(finalPost.created_at), "MMMM d, yyyy")}
          </time>
        </div>
      </header>
      <Textarea {...register("content")} className="w-full min-h-[200px]" />
      <Button className="mt-5" disabled={isSubmitting} type="submit">
        Submit
      </Button>
    </form>
  );
}
