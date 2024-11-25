import { TLogin, TSignUp } from "@/schema/auth";
import { TBlog } from "@/schema/blog";
import { TBlogPost, TSummary } from "@/types/blog";
import { User } from "@/types/user";
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
export const createBlogFunc = async (val: TBlog, token: string) => {
  try {
    const { status } = await client.post<TResponse>(`/posts`, val, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return { status };
  } catch (err) {
    if (err instanceof AxiosError)
      throw new Error(err.response?.data?.detail || "Something went wrong");
  }
};

export const getUserFromHeader = async (token: string) => {
  try {
    const { data } = await client.get<User>(`/users/token/${token}`);
    return { data };
  } catch (err) {
    if (err instanceof AxiosError)
      throw new Error(err.response?.data?.detail || "Something went wrong");
  }
};

export const getBlogPosts = async () => {
  try {
    const { data } = await client.get<TBlogPost[]>(`/posts`);
    return { data };
  } catch (err) {
    if (err instanceof AxiosError)
      throw new Error(err.response?.data?.detail || "Something went wrong");
  }
};

export const getUserFromId = async (id: number) => {
  try {
    const { data } = await client.get<User>(`/users/${id}`);
    return { data };
  } catch (err) {
    if (err instanceof AxiosError)
      throw new Error(err.response?.data?.detail || "Something went wrong");
  }
};

export const getBlogById = async (id: number) => {
  try {
    const { data } = await client.get<TBlogPost>(`/posts/${id}`);
    return { data };
  } catch (err) {
    if (err instanceof AxiosError)
      throw new Error(err.response?.data?.detail || "Something went wrong");
  }
};

export const editBlogFunc = async (val: TBlog, token: string, id: number) => {
  try {
    const { status } = await client.patch<TResponse>(`/posts/${id}`, val, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return { status };
  } catch (err) {
    if (err instanceof AxiosError)
      throw new Error(err.response?.data?.detail || "Something went wrong");
  }
};

export const deleteBlogFunc = async (token: string, id: number) => {
  try {
    const { status } = await client.delete<TResponse>(`/posts/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return { status };
  } catch (err) {
    if (err instanceof AxiosError)
      throw new Error(err.response?.data?.detail || "Something went wrong");
  }
};

export const getGeneratedSummary = async (content: string) => {
  try {
    const { status, data } = await client.post<TSummary>(`/posts/summary`, {
      content,
    });

    return { status, data };
  } catch (err) {
    if (err instanceof AxiosError)
      throw new Error(err.response?.data?.detail || "Something went wrong");
  }
};
