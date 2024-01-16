import Link from "next/link";
import SkeletonLoading from "./SkeletonLoading";
import Image from "next/image";
import { useSearch } from "@/utils/api";
import { TruncateTitle } from "@/utils/TruncateTItle";
import { useState } from "react";

type ResultProps = {
  slug?: string;
  type: string;
  showPagination?: boolean;
};

type SearchResultType = {
  Title: string,
  imdbID: string,
  Poster: string,
}

export default function Result({ slug, type, showPagination = true }: ResultProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading } = useSearch(slug || "star" , currentPage || 8);

  const totalPages = data?.totalResults ? Math.ceil(data.totalResults / 10) : 1;
  const maxVisiblePages = 5;

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const renderPageNumbers = () => {
    const startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    return Array.from({ length: endPage - startPage + 1 }, (_, index) => startPage + index);
  };

  return (
     <div className={`max-w-screen-2xl w-full mx-auto relative ${type !== 'detail' && "md:h-screen h-auto px-5" }`}>
      {
        type === 'detail' ?
        (
          <>
            <div className="flex flex-col gap-5 mt-10 relative">
              <div className="flex items-center gap-5">
                <p className="text-2xl font-bold flex-2">Film Lainnya</p>
                <div className="border-[.1rem] border-red-500 w-full flex-1"></div>
              </div>
            </div>
            <div className="flex gap-x-5 overflow-x-auto py-5">
              {isLoading ? (
                <div className="flex flex-wrap gap-5 md:justify-between justify-center">
                  {Array.from({ length: 8 }).map((_, index) => (
                    <SkeletonLoading key={index} className="w-[16rem] h-[20rem] mt-5" />
                  ))}
                </div>
              ) : (
                <>
                  {data?.Search?.map((item: SearchResultType, index: number) => (
                    <Link href={`/Detail/${item.imdbID}`} key={index} className="cursor-pointer relative">
                      <div className="relative rounded-md w-[16rem] h-[20rem] overflow-hidden group">
                        <Image
                          src={item.Poster === 'N/A' ? '/img/no-image.png' : item.Poster}
                          alt={item.Title}
                          fill
                          sizes="100%"
                          style={{ objectFit: "cover"}}
                          className="transition-transform duration-300 transform group-hover:scale-105"
                        />
                      </div>
                      <div className="absolute bottom-0 left-0 w-full h-16 p-3 bg-gradient-to-t from-black to-transparent">
                        <p className="text-md font-bold text-white">{TruncateTitle(item.Title, 50)}</p>
                      </div>
                    </Link>
                  ))}
                </>
              )}
            </div>
          </>

        ) : (
          <div className="w-full max-w-[99%] mx-auto py-7 md:py-16">
            <div className="flex flex-wrap gap-12 md:justify-start justify-center ">
            {isLoading ? (
              <div className="flex flex-wrap gap-5 md:justify-between justify-center">
                {Array.from({ length: data?.Search?.length || 10 }).map((_, index) => (
                  <SkeletonLoading key={index} className="w-[16rem] h-[20rem] mt-5" />
                ))}
              </div>
            ) : (
              <>
                {data?.Search?.map((item: SearchResultType, index: number) => (
                  <Link href={`/Detail/${item.imdbID}`} key={index} className="w-[16rem] cursor-pointer overflow-hidden relative">
                    <div className="relative rounded-md h-[20rem] overflow-hidden group">
                      <Image
                        src={item.Poster === 'N/A' ? '/img/no-image.png' : item.Poster}
                        alt={item.Title}
                        fill
                        style={{ objectFit: "cover"}}
                        className="transition-transform duration-300 transform group-hover:scale-105 select-none"
                      />
                    </div>
                    <div className="absolute bottom-0 left-0 w-full h-16 p-3 bg-gradient-to-t from-black to-transparant">
                      <p className="text-md font-bold text-white">{TruncateTitle(item.Title, 50)}</p>
                    </div>
                  </Link>
                ))}
              </>
            )}
            {showPagination && totalPages > 1 && (
              <div className="flex w-full justify-center mt-5">
                {renderPageNumbers().map((page) => (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`mx-1 w-10 px-1 py-2 rounded ${
                      currentPage === page
                        ? 'text-red-500 border-2 border-red-500'
                        : 'border-white border-2 hover:border-red-500 hover:bg-red-500 duration-300 ease-in-out'
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>
            )}
          </div>
          </div>
        )}
    </div>
  )
}
