import { TLogin, TSignUp } from "@/schema/auth";
import { TBlog } from "@/schema/blog";
import axios, { AxiosError } from "axios";
import Error from "next/error";

const baseURL = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api`;

const client = axios.create({ baseURL, withCredentials: true });

type TResponse = {
  detail: string;
};

type TAuthResponse = { access_token: string } | TResponse;

export const signUpFunc = async (val: TSignUp) => {
  try {
    const { status, data } = await client.post<TAuthResponse>(`/auth/sign-up`, {
      full_name: val.fullName,
      ...val,
    });

    return { status, data };
  } catch (err) {
    if (err instanceof AxiosError)
      throw new Error(err.response?.data?.detail || "Something went wrong");
  }
};

export const loginFunc = async (val: TLogin) => {
  try {
    const { status, data } = await client.post<TAuthResponse>(
      `/auth/login`,
      val
    );

    return { status, data };
  } catch (err) {
    if (err instanceof AxiosError)
      throw new Error(err.response?.data?.detail || "Something went wrong");
  }
};
export const createBlogFunc = async (val: TBlog) => {
  try {
    const { status } = await client.post<TResponse>(`/posts`, val);

    return { status };
  } catch (err) {
    if (err instanceof AxiosError)
      throw new Error(err.response?.data?.detail || "Something went wrong");
  }
};
