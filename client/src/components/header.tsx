"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { LogOut } from "lucide-react";

import { useToast } from "@/hooks/use-toast";
import { getUserFromHeader } from "@/lib/axios";
import { useToken } from "@/hooks/use-context";

export default function Header() {
  const [name, setName] = useState("");
  const { toast } = useToast();
  const { token: accessToken, removeToken } = useToken();
  useEffect(() => {
    const fetchData = async () => {
      if (!accessToken) return;
      const res = await getUserFromHeader(accessToken);
      if (!res)
        return toast({
          title: "Login Expired",
          description: "Please Login again",
          variant: "destructive",
        });

      setName(res.data?.full_name ?? "");
    };
    fetchData();
  }, []);

  return (
    <header className="px-4 lg:px-6 h-14 flex items-center">
      {name && (
        <div className="flex items-center justify-center gap-4">
          <p className="text-black text-sm font-semibold">{name}</p>
          <button onClick={() => removeToken()}>
            <LogOut color="#000" size={14} />
          </button>
        </div>
      )}
      <nav className="ml-auto flex gap-4 sm:gap-6">
        <Link
          className="text-sm font-medium hover:underline underline-offset-4"
          href="/"
        >
          Home
        </Link>
        <Link
          className="text-sm font-medium hover:underline underline-offset-4"
          href="/posts/user"
        >
          My Blogs
        </Link>
        <Link
          className="text-sm font-medium hover:underline underline-offset-4"
          href="/auth/sign-up"
        >
          Join Us
        </Link>
      </nav>
    </header>
  );
}
