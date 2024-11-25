export type TBlogPost = {
  id: number;
  title: string;
  content: string;
  created_at: string;
  updated_at: string;
  author_id: number;
};

export type TBlogWithUserName = TBlogPost & { full_name: string };

export type TSummary = {
  summary: string;
};
