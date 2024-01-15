'use client'
import { useState, useContext, createContext } from 'react';
import useSWR from 'swr';

const API_URL = 'https://www.omdbapi.com'
const API_KEY = '71d58ec2'

const fetcher = (url:string) => fetch(url).then(r => r.json())

export const useSearch = (endpoint: string) => {
  const url = `${API_URL}/?apikey=${API_KEY}&s=${endpoint}`
  const { data, error, isLoading } = useSWR(url, fetcher)

  return {
    data,
    error,
    isLoading,
  }

}

export const useDetail = () => {
  
}