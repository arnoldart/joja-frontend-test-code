'use client'
import { useState, useContext, createContext } from 'react';
import useSWR from 'swr';

const API_KEY = '71d58ec2';
const API_URL = 'http://www.omdbapi.com' || '';
const SearchContext = createContext({});

const fetcher = (url:string) => fetch(url).then(r => r.json())

export const useAPi = (endpoint: string) => {
  const url = `${API_URL}/?apikey=${API_KEY}&s=${endpoint}`
  const { data, error, isLoading } = useSWR(url, fetcher)

  return {
    data,
    error,
    isLoading,
  }

}

export const SearchProvider = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const updateSearchTerm = (term:string) => {
    setSearchTerm(term);
  };

  return (
    <SearchContext.Provider value={{ searchTerm, updateSearchTerm }}>
      {children}
    </SearchContext.Provider>
  );
};
