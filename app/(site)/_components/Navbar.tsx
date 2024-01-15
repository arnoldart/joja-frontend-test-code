'use client'
import { useSearchContext } from "@/context/SearchProvider";
import { FaSearch } from "react-icons/fa";

const Navbar = () => {
  const { searchQuery, setSearchQuery } = useSearchContext();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="flex items-center justify-between py-5 px-10">
      <div className="flex gap-5">
        <p>Flix Galaxy</p>
        <p>Movie</p>
        <p>Episode</p>
        <p>Series</p>
      </div>
      <div>
        <form>
          <div className="bg-gray-300 bg-opacity-10 px-3 py-1 rounded flex items-center">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="bg-transparent	outline-none text-white"
            />
            <div className="border-l-2 border-gray-300 border-opacity-30 pl-3">
              <FaSearch className="text-white" />
            </div>
          </div>
        </form>
      </div>
    </div>
  );

}

export default Navbar