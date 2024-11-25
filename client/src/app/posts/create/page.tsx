"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useCreateBlog } from "@/hooks/use-create-blog";

export default function CreateBlogPage() {
  const { errors, handleSubmit, isSubmitting, register } = useCreateBlog();

  return (
    <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center text-gray-900 mb-8">
          Create New Blog Post
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label
              htmlFor="title"
              className="text-sm font-medium text-gray-700"
            >
              Title
            </Label>
            <Input
              {...register("title")}
              id="title"
              name="title"
              placeholder="Enter your blog post title"
              className="w-full"
            />
            {errors.title && errors.title.message && (
              <span className="text-xs text-red-500">
                {errors.title.message}
              </span>
            )}
          </div>
          <div className="space-y-2">
            <Label
              htmlFor="content"
              className="text-sm font-medium text-gray-700"
            >
              Content
            </Label>
            <Textarea
              {...register("content")}
              id="content"
              name="content"
              placeholder="Write your blog post content here..."
              className="w-full min-h-[200px]"
            />
            {errors.content && errors.content.message && (
              <span className="text-xs text-red-500">
                {errors.content.message}
              </span>
            )}
          </div>
          <Button disabled={isSubmitting} type="submit" className="w-full">
            Publish
          </Button>
        </form>
      </div>
    </div>
  );
}
