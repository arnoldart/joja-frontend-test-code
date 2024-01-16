'use client'
import { useSearchContext } from "@/context/SearchProvider";
import { useSearch } from "@/utils/api";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { FaSearch } from "react-icons/fa";

type LiveSearchProps = {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
};

const Navbar = () => {
  const { searchQuery, setSearchQuery } = useSearchContext();
  const { data, isLoading } = useSearch(searchQuery);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [searchActive, setSearchActive] = useState<boolean>(false);
  const router = useRouter();
  
  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchQuery.trim() !== "") {
      router.push(`/Search/${searchQuery}`);
      setSearchActive(false);
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchIconClick = () => setSearchActive(!searchActive);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (inputRef.current && !inputRef.current.contains(e.target as Node)) {
        setSearchQuery("");
        setSearchActive(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setSearchQuery]);

  return (
    <div className="flex items-center justify-between md:py-6 py-2 max-w-screen-2xl w-full mx-auto xl:px-5 px-7">
      <Link href={"/"} className={`text-2xl font-bold text-red-500 ${searchActive ? 'hidden' : 'block'}`}>
        Flix
      </Link>
      <div
        onClick={handleSearchIconClick}
        className={`hover:text-red-500 text-white ${searchActive ? 'md:block hidden' : 'md:hidden block'}`}
      >
        <FaSearch />
      </div>
      <div className={`relative md:w-auto w-full ${searchActive ? 'md:hidden block' : 'md:block hidden'}`} ref={inputRef}>
        <form onSubmit={handleSearchSubmit} className="flex items-center">
          <div className="bg-gray-300 bg-opacity-10 px-3 py-1 rounded flex items-center w-full">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="bg-transparent outline-none text-white flex-grow"
            />
            <button
              type="submit"
              className="border-l-2 border-gray-300 border-opacity-30 pl-3 hover:text-red-500 text-white ease-in-out duration-300"
            >
              <FaSearch />
            </button>
          </div>
        </form>
        {data && !isLoading && searchQuery !== "" && (
          <div className="absolute z-20 top-16 md:top-10 left-0 w-full bg-gray-800 p-4 rounded-md flex flex-col">
            {data?.Search?.map((result: LiveSearchProps, index: number) => (
              <Link
                onClick={() => setSearchQuery('')}
                href={`/Detail/${result.imdbID}`}
                key={index}
                className={`${index === data?.Search.length - 1 ? "pb-0" : "pb-3"} hover:text-red-500 text-white`}
              >
                <p className="text-sm">{result.Title}</p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
