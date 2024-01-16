'use client'
import useSWR from 'swr';

const API_URL = process.env.NEXT_PUBLIC_API_URL
const API_KEY = process.env.NEXT_PUBLIC_API_KEY

const fetcher = (url:string) => fetch(url).then(r => r.json())

export const useSearch = (search: string | string[], page?:number) => {
  const url = `${API_URL}/?apikey=${API_KEY}&s=${search}&page=${page}`
  const { data, error, isLoading } = useSWR(url, fetcher)

  return {
    data,
    error,
    isLoading,
  }
}

export const useDetail = (id: string | string[]) => {
  const url = `${API_URL}/?apikey=${API_KEY}&i=${id}`
  const { data, error, isLoading } = useSWR(url, fetcher)

  return {
    data,
    error,
    isLoading,
  }
}

export const useAPIByType = (type: string) => {
  const url = `${API_URL}/?apikey=${API_KEY}&type=${type}`
  const { data, error, isLoading } = useSWR(url, fetcher)

  return {
    data,
    error,
    isLoading,
  }
}