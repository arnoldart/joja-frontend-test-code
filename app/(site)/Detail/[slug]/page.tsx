"use client"
import { useDetail } from "@/utils/api"
import { useParams } from "next/navigation"
import { IoStar } from "react-icons/io5";
import Image from 'next/image'

const Detail = () => {
  const router = useParams()
  const { data, isLoading } = useDetail(router.slug)

  return (
    <div>
      {data && !isLoading && (
          <div className="flex gap-5">
            <div className="flex-2">
              <Image 
              src={data.Poster} 
              alt={data.Title} 
              width={400}
              height={550}
              />
            </div>
            <div className="flex-1 ">
              <div className="flex items-center justify-between">
                <p className="text-5xl font-bold">{data.Title}</p>
              </div>
              <div className="flex items-center pt-3">
                <div className="flex items-center gap-1 pr-3">
                  <IoStar className="text-yellow-500" />
                  <p>{data.Ratings[0].Value}</p>
                </div>
                <p className="border-l-2 border-gray-500 px-3">{data.Rated}</p>
                <p className="border-l-2 border-gray-500 px-3">{data.Year}</p>
                <p className="border-l-2 border-gray-500 px-3">{data.Type}</p>
              </div>
              
              <p>{data.Director}</p>
              <p>{data.Writer}</p>
              <p>{data.Actors}</p>
              <p>{data.Plot}</p>
              <p>{data.Language}</p>
              <p>{data.Country}</p>
            </div>
          </div>
        )
      }
    </div>
  )
}

export default Detail