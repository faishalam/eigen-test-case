import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { NetworkAPIError } from "@/utils/response-type";
import { HeroServices } from "../HeroServices";
import { TNewsApiResponse, TNewsParams } from "./types";

type TuseNewsListProps = {
  onSuccess?: (data: string) => void;
  onError?: (error: AxiosError<NetworkAPIError> | Error) => void;
  params?: TNewsParams;
};

const useNewsList = (props?: TuseNewsListProps) => {
  const useNewsListFn = async () => {
    try {
      const response = await HeroServices.get<TNewsApiResponse>("/everything", {
        params: {
          ...(props?.params?.q && { q: props.params.q }),
          ...(props?.params?.from && { from: props.params.from }),
          ...(props?.params?.sortBy && { sortBy: props.params.sortBy }),
          ...(props?.params?.page && { page: props.params.page }),
          ...(props?.params?.pageSize && { pageSize: props.params.pageSize }),
          ...(props?.params?.country && { country: props.params.country }),
          ...(props?.params?.category && { category: props.params.category }),
          ...(props?.params?.source && { source: props.params.source }),
          ...(props?.params?.language && { language: props.params.language }),
          apiKey: process.env.NEXT_PUBLIC_NEWS_API_KEY,
        },
      });

      const { status } = response;

      if (status !== 200) return;

      return response.data;
    } catch (error) {
      const err = error as AxiosError<NetworkAPIError>;
      throw err?.response?.data?.message || "Unknown error";
    }
  };

  const query = useQuery({
    queryKey: ["useNewsList", props?.params],
    queryFn: useNewsListFn,
    staleTime: Infinity,
    enabled: !!props?.params,
  });

  return { ...query };
};

export default useNewsList;
