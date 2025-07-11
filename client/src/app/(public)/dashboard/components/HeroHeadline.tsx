import Image from "next/image";
import useDashboard from "../hooks";

export default function HeroHeadline() {
  const { topNewsList, setArticleDetail, setOpenModalNewsDetail } = useDashboard();
  return (
    <>
      {topNewsList?.articles?.[0] && (
        <div
          className="w-full max-w-full flex flex-col gap-3 cursor-pointer"
          onClick={() => {
            setArticleDetail(topNewsList?.articles?.[0])
            setOpenModalNewsDetail(true)
          }}
        >
          <p className="font-medium max-w-full mb-2 text-black text-3xl w-lg">
            {topNewsList?.articles?.[0].title}
          </p>
          <div className="h-full shadow-md">
            <Image
              src={topNewsList?.articles?.[0]?.urlToImage || "/placeholder.jpg"}
              alt={topNewsList?.articles?.[0].title}
              width={500}
              height={500}
              unoptimized
              className="rounded-lg w-full h-[550px] object-cover"
            />
          </div>
        </div>
      )}
    </>
  );
}
