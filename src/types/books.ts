export interface Book {
  id: number;
  abbrev: Abbrev;
  author: string;
  chapters: number;
  group: string;
  name: string;
  testament: string;
}

export interface Abbrev {
  en: string;
  pt: string;
}
