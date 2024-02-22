"use client";

import { Book } from "@/types/books";
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
  books: Book[];
  status: "error" | "idle" | "pending" | "success";
};

export const BookContext = createContext<BookContextType>({
  bookFilters: { current: {} },
  getBooksFn: async () => new Promise(() => {}),
  books: [],
  status: "idle",
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

  const {
    mutateAsync: getBooksFn,
    data: books,
    status,
  } = useMutation({
    mutationFn: getBooks,
  });

  const value: BookContextType = useMemo(
    () => ({
      bookFilters,
      getBooksFn,
      books,
      status,
    }),
    [bookFilters, books, status]
  );

  return <BookContext.Provider value={value}>{children}</BookContext.Provider>;
}
