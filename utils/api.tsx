'use client'
import { useState, useContext, createContext } from 'react';
import useSWR from 'swr';

const fetcher = (url:string) => fetch(url).then(r => r.json())

export const useAPi = (endpoint: string) => {
  const url = `https://www.omdbapi.com/?apikey=71d58ec2&s=${endpoint}`
  const { data, error, isLoading } = useSWR(url, fetcher)

  return {
    data,
    error,
    isLoading,
  }

}