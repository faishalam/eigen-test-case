"use client";

import { TNewsArticle, TNewsParams } from "@/services/news/types";
import useInfiniteNewsList from "@/services/news/useNewsInfinteScroll";
import debounce from "lodash.debounce";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";

const useAllNewsHooks = () => {
  const [openModalNewsDetail, setOpenModalNewsDetail] =
    useState<boolean>(false);
  const [articleDetail, setArticleDetail] = useState<TNewsArticle>({
    source: {
      id: "",
      name: "",
    },
    author: "",
    title: "",
    description: "",
    url: "",
    urlToImage: "",
    publishedAt: "",
    content: "",
  });
  const [searchTerm, setSearchTerm] = useState<string>("bitcoin");

  const [filter, setFilter] = useState<TNewsParams>({
    q: "bitcoin",
    from: null,
    to: null,
    source: null,
    pageSize: 5,
    page: 1,
    language: "en",
    sortBy: "publishedAt" as "publishedAt" | "relevancy" | "popularity",
  });

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isPending,
    isError,
    error,
  } = useInfiniteNewsList({ params: filter });

  const globalLoading = useMemo(() => {
    return isPending;
  }, [isPending]);

  const languageOptions = [
    { label: "Arabic", value: "ar" },
    { label: "German", value: "de" },
    { label: "English", value: "en" },
    { label: "Spanish", value: "es" },
    { label: "French", value: "fr" },
    { label: "Hebrew", value: "he" },
    { label: "Italian", value: "it" },
    { label: "Dutch", value: "nl" },
    { label: "Norwegian", value: "no" },
    { label: "Portuguese", value: "pt" },
    { label: "Russian", value: "ru" },
    { label: "Northern Sami (Swedish)", value: "sv" },
    { label: "Chinese (Simplified)", value: "zh" },
    { label: "Ukrainian", value: "uk" },
  ];

  useEffect(() => {
    if (isError) {
      const message = error;

      toast.error(message as unknown as string);
    }
  }, [isError]);

  useEffect(() => {
    const debounceQ = debounce((value: string) => {
      setFilter((prev) => ({
        ...prev,
        q: value,
        page: 1,
      }));
    }, 2000);

    debounceQ(searchTerm);

    return () => debounceQ.cancel();
  }, [searchTerm]);

  return {
    searchTerm,
    setSearchTerm,
    openModalNewsDetail,
    setOpenModalNewsDetail,
    articleDetail,
    setArticleDetail,
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    globalLoading,
    isError,
    languageOptions,
    filter,
    setFilter,
  };
};

const useAllNewsContext = createContext<
  ReturnType<typeof useAllNewsHooks> | undefined
>(undefined);

export const AllNewsProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const value = useAllNewsHooks();
  return (
    <useAllNewsContext.Provider value={value}>
      {children}
    </useAllNewsContext.Provider>
  );
};

export const useAllNews = () => {
  const context = useContext(useAllNewsContext);
  if (context === undefined) {
    throw new Error("useAllNewsContext must be used within an AllNewsProvider");
  }
  return context;
};
export default useAllNews;
