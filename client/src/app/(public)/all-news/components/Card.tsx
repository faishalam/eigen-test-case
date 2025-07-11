"use client";

import Image from "next/image";
import { Spin } from "antd";
import { useEffect, useRef } from "react";
import useAllNews from "../hooks";

export default function Card() {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    setOpenModalNewsDetail,
    setArticleDetail,
  } = useAllNews();

  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!loadMoreRef.current || !hasNextPage) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchNextPage();
        }
      },
      { threshold: 1 }
    );

    observer.observe(loadMoreRef.current);

    return () => observer.disconnect();
  }, [data, hasNextPage, fetchNextPage]); 

  return (
    <>
      {data?.pages?.map((page, pageIndex) =>
        page?.articles?.map((item, index) => (
          <div
            key={`${pageIndex}-${index}`}
            className="flex w-full gap-10 cursor-pointer"
            onClick={() => {
              setArticleDetail(item);
              setOpenModalNewsDetail(true);
            }}
          >
            <div className="relative w-[190px] h-[120px] flex-shrink-0 shadow-md">
              <Image
                src={item?.urlToImage || "/placeholder.jpg"}
                alt={item.title}
                fill
                unoptimized
                className="rounded-md object-cover"
              />
            </div>
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
          </div>
        ))
      )}

      <div ref={loadMoreRef} className="py-10 w-full text-center">
        {isFetchingNextPage ? (
          <Spin />
        ) : !hasNextPage ? (
          <p className="text-gray-400 text-sm">No more news to load</p>
        ) : null}
      </div>
    </>
  );
}
