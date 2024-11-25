import Link from "next/link";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TBlogWithUserName } from "@/types/blog";
import { format } from "date-fns";
import { Button } from "./ui/button";

type BlogPostCardProps = {
  post: TBlogWithUserName;
  isEdit?: boolean;
  deleteFn?: () => void;
};

export default function BlogPostCard({
  post,
  isEdit = false,
  deleteFn,
}: BlogPostCardProps) {
  return (
    <Card className="flex flex-col h-full">
      <CardHeader className="flex flex-row justify-between items-center">
        <CardTitle>{post.title}</CardTitle>
        <p className="text-sm text-muted-foreground mb-2">
          {format(new Date(post.created_at), "MMMM d, yyyy")}
        </p>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-2">
          By: <span className="italic">{post.full_name}</span>
        </p>
      </CardContent>
      <CardFooter className="mt-auto flex flex-row gap-4">
        <Link
          href={!isEdit ? `/posts/${post.id}` : `/posts/user/edit/${post.id}`}
          className="text-primary text-sm hover:underline"
        >
          {!isEdit ? "Read more" : "Edit"}
        </Link>
        <Button onClick={deleteFn} className="text-red-500" variant="link">
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
}
