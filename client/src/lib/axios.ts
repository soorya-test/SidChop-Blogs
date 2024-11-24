import { TLogin, TSignUp } from "@/schema/auth";
import { TBlog } from "@/schema/blog";
import axios from "axios";

const baseURL = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api`;

const client = axios.create({ baseURL, withCredentials: true });

export const signUpFunc = async (val: TSignUp) => {
  const { status } = await client.post(`/auth/sign-up`, {
    full_name: val.fullName,
    ...val,
  });

  return { status };
};

export const loginFunc = async (val: TLogin) => {
  const { status } = await client.post(`/auth/login`, val);

  return { status };
};

export const createBlogFunc = async (val: TBlog) => {
  const { status } = await client.post(`/posts`, val);

  return { status };
};
