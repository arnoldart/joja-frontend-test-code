'use client'
import { useState, useContext, createContext } from 'react';
import useSWR from 'swr';

const API_URL = 'https://www.omdbapi.com'
const API_KEY = '71d58ec2'

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
  console.log(url)
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