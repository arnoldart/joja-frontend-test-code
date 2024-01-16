'use client'
import { useSearch } from '@/utils/api'
import Link from 'next/link';
import Image from 'next/image';
import SkeletonLoading from './_components/SkeletonLoading';
import { TruncateTitle } from '@/utils/TruncateTItle';

type SearchResultType = {
  Title: string,
  imdbID: string,
  Poster: string
}


export default function Home() {
  const { data, isLoading } = useSearch('star', 8);
  
  return (
    <div className='max-w-screen-2xl md:h-screen h-auto w-full mx-auto xl:px-5 px-7 md:py-16 py-7'>
      <div className="flex flex-wrap gap-5 md:justify-between justify-center">
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
    </div>
  )
}
