"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronUp, ChevronDown, LoaderPinwheel } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getGeneratedSummary } from "@/lib/axios";
import { useToast } from "@/hooks/use-toast";
import { marked } from "marked";
import parse from "html-react-parser";

export default function SummaryGenerator({ content }: { content: string }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => setIsExpanded(!isExpanded);
  const setExpandToFalse = () => setIsExpanded(false);

  return (
    <div className="fixed bottom-4 right-4 z-50 ml-4 max-w-[400px]">
      <AnimatePresence>
        {isExpanded && (
          <SummaryViewer
            content={content}
            setExpandToFalse={setExpandToFalse}
          />
        )}
      </AnimatePresence>
      <Button
        onClick={toggleExpand}
        variant="default"
        size="sm"
        className="w-full flex items-center justify-between"
      >
        Generate Summary
        {isExpanded ? (
          <ChevronDown className="h-4 w-4 ml-2" />
        ) : (
          <ChevronUp className="h-4 w-4 ml-2" />
        )}
      </Button>
    </div>
  );
}

export const SummaryViewer = ({
  content,
  setExpandToFalse,
}: {
  content: string;
  setExpandToFalse: () => void;
}) => {
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState("");

  const { toast } = useToast();

  useEffect(() => {
    const fetchSummary = async () => {
      setLoading(true);
      try {
        const res = await getGeneratedSummary(content);
        if (!res || !(res.status === 200)) {
          setExpandToFalse();
          return toast({
            title: "Error Generating Summary",
            description: "Something went wrong! Please try again later",
            variant: "destructive",
          });
        }

        const parsedSummary = await marked.parse(res.data.summary);

        setSummary(parsedSummary);
      } catch {
        setExpandToFalse();
        return toast({
          title: "Error Generating Summary",
          description: "Something went wrong! Please try again later",
          variant: "destructive",
        });
      }
    };
    fetchSummary().finally(() => setLoading(false));
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      transition={{ duration: 0.3 }}
      className="mb-2"
    >
      <Card>
        <CardContent className="p-4 h-[400px] overflow-y-scroll">
          <h3 className="font-semibold mb-2">{loading && "Loading "}Summary</h3>
          {loading || !summary ? (
            <LoaderPinwheel
              size={30}
              color="black"
              className="animate-spin mx-auto"
            />
          ) : (
            <div className="text-sm text-muted-foreground">
              {parse(summary)}
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};
