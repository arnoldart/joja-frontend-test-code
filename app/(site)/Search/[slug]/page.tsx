'use client'
import { usePathname } from "next/navigation";
import Result from "../../_components/Result";

const Search = () => {
  const router = usePathname()
  return (
    <div>
      <Result type={router.split('/')[1]} slug={router.split('/')[2]} />
    </div>
  )
}

export default Search;
