'use client'
import { useSearchContext } from "@/context/SearchProvider";
import { useSearch } from "@/utils/api";
import Link from "next/link";
import { FaSearch } from "react-icons/fa";

type LiveSearchProps = {
  Title: string,
  Year: string,
  imdbID: string,
  Type: string,
  Poster: string
}

const Navbar = () => {
  const { searchQuery, setSearchQuery } = useSearchContext();
  const { data, isLoading } = useSearch(searchQuery);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="flex items-center justify-between py-5 px-10">
      <div className="flex gap-5 items-center">
        <Link href={'/'} className="text-2xl font-bold text-red-500">
          Flix Galaxy
        </Link>
        <Link href={'/Movie'}>
          Movie
        </Link>
        <Link href={'/Episode'}>
          Episode
        </Link>
        <Link href={'/Series'}>
          Series
        </Link>
      </div>
      <div className="relative">
        <form>
          <div className="bg-gray-300 bg-opacity-10 px-3 py-1 rounded flex items-center">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="bg-transparent	outline-none text-white"
            />
            <div className="border-l-2 border-gray-300 border-opacity-30 pl-3 hover:text-red-500 text-white ease-in-out duration-300 cursor-pointer">
              <FaSearch />
            </div>
          </div>
        </form>
        {data && !isLoading && searchQuery !== '' && (
          <div className="absolute top-10 left-0 w-full bg-gray-800 bg-opacity-90 p-4 rounded-md flex flex-col">
            {data?.Search?.map((result:LiveSearchProps, index:number) => {
              return (
                <Link href={`slug/${result.imdbID}`} key={index} className={`pb-${index === data?.Search.length - 1 ? 0 : 4}`}>
                  <p className="text-sm">{result.Title}</p>
                </Link>
              )
            })}
          </div>
        )}
      </div>
    </div>
  );

}

export default Navbar