"use client";

import { Button } from "antd";
import Link from "next/link";
import { toast } from "react-toastify";

export default function Navbar() {
  const navList = [
    { name: "Home", link: "/dashboard" },
    { name: "All News", link: "/all-news" },
  ];

  return (
    <>
      <div className="h-16 top-0 z-50 flex shrink-0 items-center gap-x-4 border-b border-gray-200 bg-black px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center p-2 w-full">
          <div>
            <Link href={"/dashboard"} className="text-xl font-bold">Eigen News</Link>
          </div>

          <div className="text-sm flex gap-4">
            {navList.map((item) => (
              <Link
                href={item.link}
                className="text-white mx-2"
                key={item.name}
              >
                {item.name}
              </Link>
            ))}
          </div>

          <div>
            <Button
              type="primary"
              className="!bg-orange-500 !hover:bg-orange-600 !border-none !text-white !font-semibold"
              onClick={() => {
                toast.error("This feature is not available yet");
              }}
            >
              Subscribe
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
