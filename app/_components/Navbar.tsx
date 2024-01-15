'use client'
import { useAPi } from "@/utils/api"

const Navbar = () => {

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
          <input type="text" placeholder="Search..." />
        </form>
      </div>
    </div>
  )
}

export default Navbar