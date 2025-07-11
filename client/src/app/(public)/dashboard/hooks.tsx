"use client";

import { TNewsArticle } from "@/services/news/types";
import useTopNewList from "@/services/news/useTopNewsList";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";

const useDashboardHooks = () => {
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

  const { data: topNewsList, isPending: isLoadingTopNewList } = useTopNewList({
    params: {
      country: "us",
      pageSize: 10,
    },
  });

  const {
    data: topEntertaimentList,
    isPending: isLoadingTopEntertaimentList,
    isError: isErrorTopEntertaiment,
    error: errorTopEntertaiment,
  } = useTopNewList({
    params: {
      category: "entertainment",
      country: "us",
      pageSize: 2,
    },
  });

  const {
    data: topSportList,
    isPending: isLoadingTopSportList,
    isError: isErrorTopSport,
    error: errorTopSport,
  } = useTopNewList({
    params: {
      category: "sport",
      pageSize: 5,
    },
  });

  const globalLoading = useMemo(() => {
    return (
      isLoadingTopNewList ||
      isLoadingTopEntertaimentList ||
      isLoadingTopSportList
    );
  }, [
    isLoadingTopNewList,
    isLoadingTopEntertaimentList,
    isLoadingTopSportList,
  ]);

  useEffect(() => {
    if (isErrorTopEntertaiment || isErrorTopSport) {
      const message = errorTopEntertaiment || errorTopSport;

      toast.error(message as unknown as string);
    }
  }, [isErrorTopEntertaiment, isErrorTopSport]);

  return {
    openModalNewsDetail,
    setOpenModalNewsDetail,
    articleDetail,
    setArticleDetail,
    globalLoading,
    topSportList,
    isLoadingTopSportList,
    topEntertaimentList,
    isLoadingTopEntertaimentList,
    topNewsList,
    isLoadingTopNewList,
  };
};

const useDashboardContext = createContext<
  ReturnType<typeof useDashboardHooks> | undefined
>(undefined);

export const DashboardProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const value = useDashboardHooks();
  return (
    <useDashboardContext.Provider value={value}>
      {children}
    </useDashboardContext.Provider>
  );
};

export const useDashboard = () => {
  const context = useContext(useDashboardContext);
  if (context === undefined) {
    throw new Error(
      "useDashboardContext must be used within an DashboardProvider"
    );
  }
  return context;
};
export default useDashboard;
