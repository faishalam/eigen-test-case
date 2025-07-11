export type TNewsParams = {
  q?: string | null;
  from?: string | null;
  to?: string | null;
  sortBy?: "publishedAt" | "relevancy" | "popularity";
  page?: number | null;
  pageSize?: number | null;
  country?: string | null;
  category?: string | null;
  source?: string | null;
  language?: string | null;
};

export type TNewsArticle = {
  source: {
    id: string | null;
    name: string;
  };
  author: string | null;
  title: string;
  description: string | null;
  url: string;
  urlToImage: string | null;
  publishedAt: string;
  content: string | null;
};

export type TNewsApiResponse = {
  status: "ok" | "error";
  totalResults: number;
  articles: TNewsArticle[];
  pages: TNewsApiResponse[];
};
