import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { NetworkAPIError } from "@/utils/response-type";
import { HeroServices } from "../HeroServices";
import { TNewsApiResponse, TNewsParams } from "./types";

type TuseTopNewListProps = {
  onSuccess?: (data: string) => void;
  onError?: (error: AxiosError<NetworkAPIError> | Error) => void;
  params?: TNewsParams;
};

const useTopNewList = (props?: TuseTopNewListProps) => {
  const useTopNewListFn = async () => {
    try {
      const response = await HeroServices.get<TNewsApiResponse>(
        "/top-headlines",
        {
          params: {
            q: props?.params?.q,
            from: props?.params?.from,
            sortBy: props?.params?.sortBy,
            page: props?.params?.page,
            pageSize: props?.params?.pageSize,
            apiKey: process.env.NEXT_PUBLIC_NEWS_API_KEY,
            country: props?.params?.country ?? "us",
            category: props?.params?.category,
          },
        }
      );

      const { status } = response;

      if (status !== 200) return;

      return response.data;
    } catch (error) {
      const err = error as AxiosError<NetworkAPIError>;
      throw err?.response?.data?.message || "Unknown error";
    }
  };

  const query = useQuery({
    queryKey: ["useTopNewList", props?.params],
    queryFn: useTopNewListFn,
    staleTime: Infinity,
    enabled: !!props?.params,
  });

  return { ...query };
};

export default useTopNewList;
