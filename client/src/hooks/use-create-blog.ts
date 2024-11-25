import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { blogSchema, TBlog } from "@/schema/blog";
import { useRouter } from "next/navigation";
import { useToast } from "./use-toast";
import { createBlogFunc } from "@/lib/axios";
import { useToken } from "./use-context";

export const useCreateBlog = () => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<TBlog>({
    resolver: zodResolver(blogSchema),
    defaultValues: { title: "", content: "" },
  });

  const { toast } = useToast();
  const router = useRouter();
  const { token: accessToken } = useToken();

  const onSubmitFunc = async (val: TBlog) => {
    try {
      if (!accessToken)
        return toast({
          title: "Not Logged In",
          description: "You need to login to create Blog Post",
          variant: "destructive",
        });

      const res = await createBlogFunc(val, accessToken);
      if (res && +res.status !== 200)
        return toast({
          title: "Blog Creation Failed",
          variant: "destructive",
          description: "Something went wrong",
          duration: 4000,
        });

      toast({
        title: "Blog Created Successfully",
        variant: "default",
        duration: 4000,
      });

      return router.replace("/");
    } catch (err) {
      return toast({
        title: "Blog Creation Failed",
        variant: "destructive",
        description:
          err instanceof Error ? err.message : "Something went wrong",
        duration: 4000,
      });
    }
  };

  return {
    handleSubmit: handleSubmit(onSubmitFunc),
    register,
    isSubmitting,
    errors,
  };
};
