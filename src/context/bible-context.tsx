"use client";

import { highlightVerses } from "@/app/ler/utils/verses";
import { Verse } from "@/types/bible";
import { UseMutationResult, useMutation } from "@tanstack/react-query";
import axios, { AxiosResponse } from "axios";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useMemo,
  useState,
} from "react";

type BibleContextType = {
  versesQuery?: UseMutationResult<
    AxiosResponse<any, any>,
    Error,
    {
      book: string;
      chapter: number;
      highlighted?: string;
    },
    unknown
  >;
  verses: Verse[];
  setVerses: Dispatch<SetStateAction<Verse[]>>;
};

export const BibleContext = createContext<BibleContextType>({
  verses: [],
  versesQuery: undefined,
  setVerses: () => {},
});

export const useBibleContext = () => useContext(BibleContext);

export function BibleContextProvider({ children }: { children: ReactNode }) {
  const [verses, setVerses] = useState<Verse[]>([]);

  const getVerses = async ({
    book,
    chapter,
    highlighted,
  }: {
    book: string;
    chapter: number;
    highlighted?: string;
  }) => {
    const response = await axios.get(
      `/api/bible/verses/nvi/${book}/${chapter}`
    );

    const responseVerses = highlighted
      ? highlightVerses({
          highlighted,
          verses: response.data.verses,
          chapter,
        })
      : response.data.verses;

    setVerses(responseVerses);

    return {
      ...response,
      data: {
        ...response.data,
        verses: responseVerses,
      },
    };
  };

  const versesQuery = useMutation({
    mutationFn: getVerses,
    retry: false,
  });

  const value: BibleContextType = useMemo(
    () => ({
      versesQuery,
      verses,
      setVerses,
    }),
    [versesQuery, verses]
  );

  return (
    <BibleContext.Provider value={value}>{children}</BibleContext.Provider>
  );
}
