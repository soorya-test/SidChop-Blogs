import { TLogin, TSignUp } from "@/schema/auth";
import { TBlog } from "@/schema/blog";
import axios, { AxiosError } from "axios";
import Error from "next/error";

const baseURL = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api`;

const client = axios.create({ baseURL, withCredentials: true });

type TResponse = {
  details: string;
};

export const signUpFunc = async (val: TSignUp) => {
  try {
    const { status } = await client.post<TResponse>(`/auth/sign-up`, {
      full_name: val.fullName,
      ...val,
    });

    return { status };
  } catch (err) {
    if (err instanceof AxiosError)
      throw new Error(err.response?.data?.details || "Something went wrong");
  }
};

export const loginFunc = async (val: TLogin) => {
  try {
    const { status } = await client.post<TResponse>(`/auth/login`, val);

    return { status };
  } catch (err) {
    if (err instanceof AxiosError)
      throw new Error(err.response?.data?.details || "Something went wrong");
  }
};
export const createBlogFunc = async (val: TBlog) => {
  try {
    const { status } = await client.post<TResponse>(`/posts`, val);

    return { status };
  } catch (err) {
    if (err instanceof AxiosError)
      throw new Error(err.response?.data?.details || "Something went wrong");
  }
};
