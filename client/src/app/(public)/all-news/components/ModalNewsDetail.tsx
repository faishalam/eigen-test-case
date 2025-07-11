"use client";

import { Modal } from "antd";
import Image from "next/image";
import useAllNews from "../hooks";

export default function ModalNewsDetail() {
  const { openModalNewsDetail, setOpenModalNewsDetail, articleDetail } =
    useAllNews();
  return (
    <Modal
      open={openModalNewsDetail}
      onCancel={() => setOpenModalNewsDetail(false)}
      footer={null}
      centered
      width={700}
      title={articleDetail?.title || "News Detail"}
    >
      {articleDetail ? (
        <div className="flex flex-col gap-4">
          <div className="relative w-full h-[300px]">
            <Image
              src={articleDetail.urlToImage || "/placeholder.jpg"}
              alt={articleDetail.title}
              fill
              unoptimized
              className="rounded-md object-cover"
            />
          </div>

          <div>
            <p className="text-sm text-gray-500 mb-1">
              {articleDetail.author} —{" "}
              {new Date(articleDetail.publishedAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
            <p className="text-base text-gray-700">
              {articleDetail.content || articleDetail.description}
            </p>
            <a
              href={articleDetail.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline mt-3 inline-block"
            >
              Read full article →
            </a>
          </div>
        </div>
      ) : (
        <p className="text-gray-400">No article selected.</p>
      )}
    </Modal>
  );
}
