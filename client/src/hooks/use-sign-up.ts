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
      const { status } = await signUpFunc(val);
      if (+status !== 200)
        return toast({
          title: "Sign Up Failed",
          variant: "destructive",
          description: "Something went wrong",
          duration: 4000,
        });

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
        description: "Something went wrong",
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
