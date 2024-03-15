import { SelectedVerseType, Verse } from "@/types/bible";
import { AlignLeft, Clock9, HashIcon } from "lucide-react";

export const editorClass =
  "mt-10 mx-10 prose dark:prose-invert prose-headings:my-1 prose-p:my-0 prose-headings:text-zinc-800 marker:text-zinc-800 text-zinc-800";

export const pageProperties: {
  [key: string]: {
    icon: JSX.Element;
  };
} = {
  Abreviação: {
    icon: <AlignLeft className="size-4" />,
  },
  "Hora da última edição": {
    icon: <Clock9 className="size-4" />,
  },
  Capítulo: {
    icon: <HashIcon className="size-4" />,
  },
};

export const colors: { [key: string]: string } = {
  r: "bg-red-500",
  g: "bg-green-500",
  y: "bg-yellow-500",
  b: "bg-blue-500",
};

export const highlightVerses = ({
  highlighted,
  verses,
  chapter,
}: {
  highlighted: string;
  verses: Verse[];
  chapter: number;
}) => {
  highlighted.split(" ").forEach((pair) => {
    if (parseInt(pair.split(":")[0]) !== chapter) {
      return;
    }

    const [verseNumber, colorCode] = pair
      .split(":")[1]
      .match(/\d+|[^\d]+/g) || [""];

    const verseIndex = verses.findIndex(
      (verse) => verse.number === parseInt(verseNumber)
    );

    if (verseIndex !== -1) {
      verses[verseIndex].color = colorCode;
    }
  });

  return verses;
};

export const formatVerseToContent = ({
  verses,
  chapter,
}: {
  verses: SelectedVerseType[];
  chapter: number;
}) => {
  const firstVerse = verses[0].number;

  if (verses.length === 1) {
    return `${chapter}:${firstVerse}`;
  }

  const lastVerse = verses[verses.length - 1].number;

  if (firstVerse > lastVerse) {
    let versesSequence = `${chapter}:`;

    verses.forEach((verse, idx) => {
      versesSequence += `${idx !== 0 ? "," : ""}${verse.number}`;
    });
    return versesSequence;
  }

  return `${chapter}:${firstVerse}-${lastVerse}`;
};

export const formatVerseToProperty = ({
  verses,
  chapter,
}: {
  verses: SelectedVerseType[];
  chapter: number;
}) => {
  let versesSequence = "";

  verses.forEach((verse) => {
    versesSequence += ` ${chapter}:${verse.number}${verse.color}`;
  });
  return versesSequence.trim();
};
