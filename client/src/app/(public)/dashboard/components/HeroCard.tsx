"use client";

import Image from "next/image";
import useDashboard from "../hooks";

export default function HeroCard() {
  const { topNewsList, setArticleDetail, setOpenModalNewsDetail } =
    useDashboard();
  return (
    <>
      {topNewsList?.articles?.slice(1, 6).map((item, index) => (
        <div
          key={index}
          className="flex w-full gap-10 cursor-pointer"
          onClick={() => {
            setArticleDetail(item);
            setOpenModalNewsDetail(true);
          }}
        >
          <div className="flex flex-col justify-between w-full h-[120px] py-3">
            <div>
              <p className="text-black text-sm font-medium line-clamp-2">
                {item.title}
              </p>
              <p className="text-gray-500 text-xs mt-1">
                {item?.description &&
                  (item.description.length > 150
                    ? item.description.slice(0, 100) + "..."
                    : item.description)}
              </p>
            </div>

            <div className="flex gap-5 w-full items-center justify-start">
              <p className="text-orange-500 text-xs">{item.author}</p>
              <p className="text-xs text-gray-500">
                {new Date(item.publishedAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
          </div>

          <div className="relative w-[190px] h-[120px] flex-shrink-0 shadow-md">
            <Image
              src={item?.urlToImage || "/placeholder.jpg"}
              alt={item.title}
              fill
              unoptimized
              className="rounded-md object-cover"
            />
          </div>
        </div>
      ))}
    </>
  );
}
