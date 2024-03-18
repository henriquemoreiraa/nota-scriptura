import { SelectedVerseType, Verse } from "@/types/bible";

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
