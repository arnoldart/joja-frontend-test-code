'use client'
import { useSearch } from "@/utils/api";
import { useParams } from "next/navigation";
import Image from 'next/image';
import Link from "next/link";
import SkeletonLoading from "../../_components/SkeletonLoading";
import { useState } from "react";
import { TruncateTitle } from "@/utils/TruncateTItle";

type SearchResultProps = {
  Title: string,
  imdbID: string,
  Poster: string
}

const Search = () => {
  const { slug } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const { data, error, isLoading } = useSearch(slug, currentPage);

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
    <div className="max-w-screen-2xl w-full mx-auto xl:px-5 px-7 py-7">
      <div className="flex flex-wrap gap-5 md:justify-between justify-center">
        {isLoading ? (
          <div className="flex flex-wrap gap-5 md:justify-between justify-center">
            {Array.from({ length: data?.Search?.length || 10 }).map((_, index) => (
              <SkeletonLoading key={index} className="w-[16rem] h-[20rem] mt-5" />
            ))}
          </div>
        ) : (
          <>
            {data?.Search?.map((item: SearchResultProps, index: number) => (
              <Link href={`/Detail/${item.imdbID}`} key={index} className="w-[16rem] cursor-pointer overflow-hidden relative md:pt-5 pt-0">
                <div className="relative rounded-md h-[20rem] overflow-hidden group">
                  <Image
                    src={item.Poster === 'N/A' ? '/img/no-image.png' : item.Poster}
                    alt={item.Title}
                    fill
                    style={{ objectFit: "cover"}}
                    className="transition-transform duration-300 transform group-hover:scale-105"
                  />
                </div>
                <div className="absolute bottom-0 left-0 w-full h-16 p-3 bg-gradient-to-t from-black to-transparant">
                  <p className="text-md font-bold text-white">{TruncateTitle(item.Title, 50)}</p>
                </div>
              </Link>
            ))}
            
          </>
        )}
      </div>
      <div className="flex justify-center mt-5">
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
    </div>
  );
}

export default Search;
