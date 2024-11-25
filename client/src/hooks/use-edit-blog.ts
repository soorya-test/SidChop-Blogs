import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { blogSchema, TBlog } from "@/schema/blog";
import { useRouter } from "next/navigation";
import { useToast } from "./use-toast";
import { editBlogFunc } from "@/lib/axios";

export const useEditBlog = (id: number) => {
  const {
    register,
    handleSubmit,

    setValue,
    formState: { isSubmitting, errors },
  } = useForm<TBlog>({
    resolver: zodResolver(blogSchema),
    defaultValues: { title: "", content: "" },
  });

  const { toast } = useToast();
  const router = useRouter();

  const onSubmitFunc = async (val: TBlog) => {
    try {
      const accessToken = localStorage.getItem("access_token");
      if (!accessToken)
        return toast({
          title: "Not Logged In",
          description: "You need to login to edit Blog Post",
          variant: "destructive",
        });

      const res = await editBlogFunc(val, accessToken, id);
      if (res && +res.status !== 200)
        return toast({
          title: "Blog Edit Failed",
          variant: "destructive",
          description: "Something went wrong",
          duration: 4000,
        });

      toast({
        title: "Blog Edit Successfully",
        variant: "default",
        duration: 4000,
      });

      return router.replace("/");
    } catch (err) {
      return toast({
        title: "Blog Edit Failed",
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
    setValue,
  };
};
