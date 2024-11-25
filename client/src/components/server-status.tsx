"use client";

import { AlertCircle } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useEffect, useState } from "react";
import { checkHealth } from "@/lib/axios";

export default function ServerStatus() {
  const [status, setStatus] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const res = await checkHealth();
      if (res && res.data && res.data.status) setStatus(true);
    };
    fetchData();
  }, []);

  if (status) return null;

  return (
    <Alert
      className="absolute bottom-12 backdrop-blur-sm max-w-[90%] ml-[5%]"
      variant="destructive"
    >
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Server Warning</AlertTitle>
      <AlertDescription>Server is not yet up</AlertDescription>
    </Alert>
  );
}
