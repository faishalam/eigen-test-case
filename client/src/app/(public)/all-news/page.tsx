"use client";

import { Input, Select, Spin } from "antd";
import Card from "./components/Card";
import useAllNews from "./hooks";
import ModalNewsDetail from "./components/ModalNewsDetail";

export default function AllNewsPage() {
  const {
    filter,
    setFilter,
    languageOptions,
    globalLoading,
    openModalNewsDetail,
    setSearchTerm,
    searchTerm,
  } = useAllNews();

  return (
    <>
      <div className={`w-full min-h-screen lg:min-h-[calc(100vh-64px)]`}>
        {openModalNewsDetail && <ModalNewsDetail />}
        <div className="max-w-full w-full flex justify-center py-4 mb-4">
          <div className="max-w-7xl w-full flex flex-col gap-5 justify-center items-center px-4 sm:px-6 lg:px-20">
            <div className="w-full flex gap-2">
              <div className="w-full">
                <Input.Search
                  placeholder="Search news"
                  allowClear
                  enterButton
                  className="w-full"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="w-full flex justify-center items-center gap-2">
                <Select
                  className="w-full"
                  placeholder="Select Language"
                  allowClear
                  value={filter.language || undefined}
                  options={languageOptions}
                  onChange={(val) =>
                    setFilter({ ...filter, language: val || null })
                  }
                  style={{ width: "100%" }}
                />
                <Select
                  placeholder="Sort by"
                  value={filter.sortBy}
                  options={[
                    { label: "Published At", value: "publishedAt" },
                    { label: "Relevancy", value: "relevancy" },
                    { label: "Popularity", value: "popularity" },
                  ]}
                  onChange={(val) => setFilter({ ...filter, sortBy: val })}
                  style={{ width: "100%" }}
                />
              </div>
            </div>
          </div>
        </div>

        {globalLoading ? (
          <div className="h-screen inset-0 w-full flex justify-center items-center">
            <Spin />
          </div>
        ) : (
          <div className="w-full h-full flex justify-center items-center overflow-auto">
            <div className="w-full max-w-5xl flex flex-col gap-7 justify-center items-center px-4 sm:px-6 lg:px-20 mb-4">
              <Card />
            </div>
          </div>
        )}
      </div>
    </>
  );
}
