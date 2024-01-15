'use client'
import { useSearchContext } from "@/context/SearchProvider";

const Navbar = () => {
  const { searchQuery, setSearchQuery } = useSearchContext();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="flex justify-between py-5 px-10">
      <div className="flex gap-5">
        <p>Flix Galaxy</p>
        <p>K-Drama</p>
        <p>Movie</p>
        <p>Anime</p>
      </div>
      <div>
        <form>
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </form>
      </div>
    </div>
  );

}

export default Navbar