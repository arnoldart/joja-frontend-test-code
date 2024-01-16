"use client"
import { useDetail } from "@/utils/api"
import { usePathname } from "next/navigation"
import { IoStar } from "react-icons/io5";
import Image from 'next/image'
import SkeletonLoading from "../../_components/SkeletonLoading";
import Result from "../../_components/Result";

const Detail = () => {
  const router = usePathname()
  const { data, isLoading } = useDetail(router.split('/')[2])

  return (
    <div className="max-w-screen-2xl w-full mx-auto md:py-16 py-7 xl:px-5 px-7">
      {isLoading ? (
        <div className="flex md:flex-row flex-col gap-5">
          <div className="flex-2">
            <SkeletonLoading className="md:w-[400px] w-full h-[550px]" />
          </div>
          <div className="flex-1 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <SkeletonLoading className="w-full h-10" />
            </div>
            <div className="flex items-center pt-3">
              <SkeletonLoading className="w-full h-10" />
            </div>
            <div>
              <SkeletonLoading className="w-full h-10" />
            </div>
            <div>
              <SkeletonLoading className="w-full h-10" />
            </div>
            <div>
              <SkeletonLoading className="w-full h-10" />
            </div>
            <div>
              <SkeletonLoading className="w-full h-[15rem]" />
            </div>
            <div>
              <SkeletonLoading className="w-full h-10" />
            </div>
            <div>
              <SkeletonLoading className="w-full h-10" />
            </div>
          </div>
        </div>
      ): (
        (
          <div className="flex md:flex-row flex-col gap-5">
            <div className="flex-2 flex md:justify-start justify-center">
              <Image 
              src={data.Poster === 'N/A' ? '/img/no-image.png' : data.Poster}
              alt={data.Title} 
              width={400}
              height={550}
              />
            </div>
            <div className="flex-1 flex flex-col gap-4">
              <div>
                <div className="flex items-center justify-between">
                  <p className="text-5xl font-bold">{data.Title}</p>
                </div>
                <div className="flex items-center pt-2">
                  <div className="flex items-center gap-1 pr-3">
                    <IoStar className="text-yellow-500" />
                    <p>{data?.Ratings?.length === 0 ? 'N/A' : data?.Ratings[0].Value}</p>
                  </div>
                  <p className="border-l-2 border-gray-500 px-3">{data.Rated}</p>
                  <p className="border-l-2 border-gray-500 px-3">{data.Year}</p>
                  <p className="border-l-2 border-gray-500 px-3">{data.Type}</p>
                </div>
              </div>
              <div>
                <p className="pb-2 font-bold">Genre:</p>
                <div className="flex flex-wrap gap-3">
                  {data.Genre.split(',').map((genre:string, index:number) => {
                    return (
                      <p className="bg-gray-400 bg-opacity-30 px-2 rounded" key={index}>{genre}</p>
                    )
                  })}
                </div>
              </div>
              <div>
                <p className="pb-2 font-bold">Writer:</p>
                <div className="flex flex-wrap gap-3">
                  {data.Writer.split(',').map((genre:string, index:number) => {
                    return (
                      <p className="bg-gray-400 bg-opacity-30 px-2 rounded" key={index}>{genre}</p>
                    )
                  })}
                </div>
              </div>
              <div>
                <p className="pb-2 font-bold">Actors:</p>
                <div className="flex flex-wrap gap-3">
                  {data.Actors.split(',').map((genre:string, index:number) => {
                    return (
                      <p className="bg-gray-400 bg-opacity-30 px-2 rounded" key={index}>{genre}</p>
                    )
                  })}
                </div>
              </div>
              <div>
                <p className="pb-1 font-bold">Plot:</p>
                <p>{data.Plot}</p>
              </div>
              <div>
                <p className="pb-1 font-bold">Language:</p>
                <p className="bg-gray-400 bg-opacity-30 px-2 rounded inline-block">{data.Language}</p>
              </div>
              <div>
                <p className="pb-1 font-bold">Country:</p>
                <p className="bg-gray-400 bg-opacity-30 px-2 rounded inline-block">{data.Country}</p>
              </div>
            </div>
          </div>
        )
      )}
      <Result type={router.split('/')[1].toLowerCase()} />
    </div>
  )
}

export default Detail