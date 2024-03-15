import { Book } from "./books";

export interface Bible {
  book: Book;
  chapter: Chapter;
  verses: Verse[];
}

export interface Abbrev {
  pt: string;
  en: string;
}

export interface Chapter {
  number: number;
  verses: number;
}

export interface Verse {
  number: number;
  text: string;
  color?: string;
  chapter: number;
}

export type SelectedVerseType = Verse & { color?: string };
