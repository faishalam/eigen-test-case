import { TNewsArticle } from "@/services/news/types";
import Image from "next/image";
import useDashboard from "../hooks";

type Props = {
  item: TNewsArticle;
  index: number;
  classnames: string;
};

export default function CardOverlay({ item, index, classnames }: Props) {
  const { setArticleDetail, setOpenModalNewsDetail } = useDashboard();
  return (
    <>
      <div
        key={index}
        className={classnames}
        onClick={() => {
          setArticleDetail(item);
          setOpenModalNewsDetail(true);
        }}
      >
        <Image
          src={item?.urlToImage || "/placeholder.jpg"}
          alt={item.title}
          fill
          unoptimized
          className="object-cover w-full object-center transition-transform duration-300 ease-in-out group-hover:scale-110 cursor-pointer"
        />

        <div className="absolute inset-0 bg-black opacity-50 z-10" />

        <div className="absolute w-full inset-0 flex justify-end items-end z-20">
          <div className="flex flex-col justify-between w-full h-[120px] px-10 mb-10">
            <div className="w-full">
              <p className="text-white text-lg font-semibold line-clamp-2">
                {item.title}
              </p>
              <p className="text-white text-xs mt-1">
                {item?.description &&
                  (item.description.length > 150
                    ? item.description.slice(0, 100) + "..."
                    : item.description)}
              </p>
            </div>

            <div className="flex gap-5 w-full items-center justify-start">
              <p className="text-orange-500 text-xs">{item.author}</p>
              <p className="text-xs text-gray-400">
                {new Date(item.publishedAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
