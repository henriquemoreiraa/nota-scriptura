export interface NotionPageType {
  object: string;
  id: string;
  created_time: string;
  last_edited_time: string;
  created_by: CreatedBy;
  last_edited_by: LastEditedBy;
  cover: Cover;
  icon: Icon;
  parent: Parent;
  archived: boolean;
  properties: Properties;
  url: string;
  public_url: any;
}

export interface CreatedBy {
  object: string;
  id: string;
}

export interface LastEditedBy {
  object: string;
  id: string;
}

export interface Cover {
  type: string;
  external: External;
}

export interface External {
  url: string;
}

export interface Icon {
  type: string;
  emoji: string;
}

export interface Parent {
  type: string;
  database_id: string;
}

export interface Properties {
  "Hora da última edição": LastEditTime;
  Abreviação: Abbrev;
  Capítulo: Chapter;
  Livro: Book;
}

interface LastEditTime {
  id: string;
  type: string;
  last_edited_time: string;
}

interface Abbrev {
  id: string;
  type: string;
  rich_text: RichText[];
}

interface Chapter {
  id: string;
  type: string;
  number: number;
}

export interface RichText {
  type: string;
  text: Text;
  annotations: Annotations;
  plain_text: string;
  href: any;
}

export interface Text {
  content: string;
  link: any;
}

export interface Annotations {
  bold: boolean;
  italic: boolean;
  strikethrough: boolean;
  underline: boolean;
  code: boolean;
  color: string;
}

interface Book {
  id: string;
  type: string;
  title: Title[];
}

export interface Title {
  type: string;
  text: Text2;
  annotations: Annotations2;
  plain_text: string;
  href: any;
}

export interface Text2 {
  content: string;
  link: any;
}

export interface Annotations2 {
  bold: boolean;
  italic: boolean;
  strikethrough: boolean;
  underline: boolean;
  code: boolean;
  color: string;
}

export interface NotionPageContent {
  parent?: string;
}
