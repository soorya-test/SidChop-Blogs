import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { signUpSchema, TSignUp } from "@/schema/auth";
import { useRouter } from "next/navigation";
import { useToast } from "./use-toast";
import { signUpFunc } from "@/lib/axios";

export const useSignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<TSignUp>({
    resolver: zodResolver(signUpSchema),
    defaultValues: { email: "", fullName: "", password: "" },
  });

  const { toast } = useToast();
  const router = useRouter();

  const onSubmitFunc = async (val: TSignUp) => {
    try {
      const res = await signUpFunc(val);
      if (res && +res.status !== 200)
        return toast({
          title: "Sign Up Failed",
          variant: "destructive",
          // @ts-expect-error
          description: res.data.detail ?? "Something went wrong",
          duration: 4000,
        });

      // @ts-expect-error
      const { access_token } = res.data;
      localStorage.setItem("access_token", access_token);
      
      toast({
        title: "Sign Up Successfull",
        variant: "default",
        duration: 4000,
      });

      return router.replace("/");
    } catch (err) {
      return toast({
        title: "Sign Up Failed",
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
