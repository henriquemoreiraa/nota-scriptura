"use client";

import { UseMutateAsyncFunction, useMutation } from "@tanstack/react-query";
import axios from "axios";
import {
  MutableRefObject,
  ReactNode,
  createContext,
  useContext,
  useMemo,
  useRef,
} from "react";

type BookFiltersType = {
  testament?: string[];
  group?: string[];
  author?: string[];
};

type BookContextType = {
  bookFilters: MutableRefObject<BookFiltersType | undefined>;
  getBooksFn: UseMutateAsyncFunction<void, Error, void, unknown>;
  books: any[];
};

export const BookContext = createContext<BookContextType>({
  bookFilters: { current: {} },
  getBooksFn: async () => new Promise(() => {}),
  books: [],
});

export const useBooksContext = () => useContext(BookContext);

export function BookContextProvider({ children }: { children: ReactNode }) {
  const bookFilters = useRef<BookFiltersType>();

  const getBooks = async () => {
    const { data } = await axios.get(`/api/books/`, {
      params: {
        author: bookFilters.current?.author?.join(",") || undefined,
        testament:
          bookFilters.current?.testament?.join(",").toUpperCase() || undefined,
        group: bookFilters.current?.group?.join(",") || undefined,
      },
    });
    return data;
  };

  const { mutateAsync: getBooksFn, data: books } = useMutation({
    mutationFn: getBooks,
  });

  const value: BookContextType = useMemo(
    () => ({
      bookFilters,
      getBooksFn,
      books,
    }),
    [bookFilters, books]
  );

  return <BookContext.Provider value={value}>{children}</BookContext.Provider>;
}
