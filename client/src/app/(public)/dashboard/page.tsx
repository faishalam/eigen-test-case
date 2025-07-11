"use client";

import useDashboard from "./hooks";
import HeroCard from "./components/HeroCard";
import HeroHeadline from "./components/HeroHeadline";
import { Spin } from "antd";
import CardOverlay from "./components/CardOverlay";
import ModalNewsDetail from "./components/ModalNewsDetail";

export default function DashboardPage() {
  const {
    topEntertaimentList,
    topSportList,
    globalLoading,
    openModalNewsDetail,
  } = useDashboard();

  return (
    <>
      {globalLoading && (
        <div className="h-screen z-100 inset-0 w-full flex justify-center items-center">
          <Spin />
        </div>
      )}
      <div className={`w-full h-full ${globalLoading && "hidden"}`}>
        <div className="w-full h-full lg:h-[calc(100vh-64px)] flex flex-col gap-10 bg-gray-200 px-4 p-12 sm:px-6 lg:px-20">
          <div>
            <p className="text-black text-3xl font-semibold">
              Top Headlines from US
            </p>
          </div>
          <div className="w-full flex flex-col lg:flex-row gap-10 h-full">
            <div className="w-full max-w-ful h-full">
              <HeroHeadline />
            </div>

            <div className="w-full max-w-full flex flex-col gap-3 ">
              <HeroCard />
            </div>
          </div>
        </div>
        {openModalNewsDetail && <ModalNewsDetail />}
        <div className="bg-white h-full lg:h-screen w-full flex justify-center items-center px-4 pb-10 sm:px-6 lg:px-20 ">
          <div className="w-full flex flex-col gap-5 ">
            <div className="w-full">
              <p className="text-black text-3xl font-semibold py-5">
                Hot Entertaiment
              </p>
            </div>
            <div className="flex flex-col lg:flex-row w-full gap-5">
              {topEntertaimentList?.articles.slice(0, 2).map((item, index) => (
                <CardOverlay
                  key={index}
                  item={item}
                  index={index}
                  classnames="relative w-full h-[400px] rounded-xl overflow-hidden group cursor-pointer shadow-md"
                />
              ))}
            </div>
            <div className="w-full py-5">
              <p className="text-black text-3xl font-semibold">Hot Sports</p>
            </div>
            <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              {topSportList?.articles?.slice(0, 4).map((item, index) => (
                <CardOverlay
                  key={item.title}
                  item={item}
                  index={index}
                  classnames="relative h-[250px] group overflow-hidden rounded-lg cursor-pointer shadow-md"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
