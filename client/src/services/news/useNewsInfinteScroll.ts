import { useInfiniteQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { HeroServices } from "../HeroServices";
import { TNewsApiResponse, TNewsParams } from "./types";
import { NetworkAPIError } from "@/utils/response-type";

type TuseNewsListProps = {
  params: Omit<TNewsParams, "page">;
  onSuccess?: (data: TNewsApiResponse) => void;
};

const useInfiniteNewsList = (props: TuseNewsListProps) => {
  return useInfiniteQuery<
    TNewsApiResponse,
    AxiosError<NetworkAPIError> | Error,
    TNewsApiResponse,
    [string, Omit<TNewsParams, "page">],
    number
  >({
    queryKey: ["useNewsList", props.params],
    initialPageParam: 1,
    queryFn: async ({ pageParam = 1 }) => {
      const response = await HeroServices.get<TNewsApiResponse>("/everything", {
        params: {
          ...props.params,
          apiKey: process.env.NEXT_PUBLIC_NEWS_API_KEY,
          page: pageParam,
        },
      });

      const { status, data } = response;
      if (status !== 200) throw new Error("Failed to fetch");

      props.onSuccess?.(data);
      return data;
    },
    getNextPageParam: (lastPage, allPages) => {
      const totalFetched = allPages.reduce(
        (acc, page) => acc + page.articles.length,
        0
      );

      if (totalFetched >= lastPage.totalResults) {
        return undefined;
      }

      return allPages.length + 1; // karena page dimulai dari 1
    },
    enabled: !!props.params,
    staleTime: 1000 * 60 * 5,
  });
};

export default useInfiniteNewsList;
