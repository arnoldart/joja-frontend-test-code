import { useSearch } from "@/utils/api";
import Link from "next/link";
import Image from "next/image";

type SearchResultProps = {
  Title: string,
  imdbID: string,
  Poster: string
}

type ResultProps = {
  slug: string
}



const Result: React.FC<ResultProps> = ({ slug }) => {
  const { data, error, isLoading } = useSearch(slug);

  const truncateTitle = (title: string, maxLength: number) => {
    if (title.length > maxLength) {
      return title.slice(0, maxLength) + '...';
    }
    return title;
  };

  return (
    <div className="max-w-screen-2xl w-full mx-auto flex flex-wrap gap-5 md:justify-between justify-center xl:px-5 px-7">
      {data && !isLoading && (
        data.Search.map((item: SearchResultProps, index: number) => (
          <Link href={`/Detail/${item.imdbID}`} key={index} className=" sm:w-[16rem] w-full cursor-pointer overflow-hidden relative pt-5">
            <div className="relative rounded-md h-[20rem] overflow-hidden group">
              <Image
                src={item.Poster === 'N/A' ? 'https://m.media-amazon.com/images/M/MV5BYzM0NmQ2YzgtZWZkNC00N2JhLThjYzUtMDNlZDczMzJiMGY1XkEyXkFqcGdeQXVyNzkzODk2Mzc@._V1_SX300.jpg' : item.Poster}
                alt={item.Title}
                fill
                style={{ objectFit: "cover"}}
                className="transition-transform duration-300 transform group-hover:scale-105"
              />
            </div>
            <div className="absolute bottom-0 left-0 w-full h-16 p-3 bg-gradient-to-t from-black to-transparant">
              <p className="text-md font-bold text-white">{truncateTitle(item.Title, 50)}</p>
            </div>
          </Link>
        ))
      )}
    </div>
  )
}

export default Result