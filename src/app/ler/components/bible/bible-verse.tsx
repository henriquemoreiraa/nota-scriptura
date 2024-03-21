import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useCustomSearchParams } from "@/hooks/use-set-search-params";
import { SelectedVerseType, Verse } from "@/types/bible";
import { ExternalLinkIcon } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
import { colors } from "../constants";
import { useBibleVerses } from "@/hooks/use-bible-verses";

export interface BibleVerseProps {
  verse: Verse;
  selectedVerses: SelectedVerseType[];
  setSelectedVerses: Dispatch<SetStateAction<SelectedVerseType[]>>;
}

export const BibleVerse = ({
  verse,
  selectedVerses,
  setSelectedVerses,
}: BibleVerseProps) => {
  const { searchParams, createSearchParams } = useCustomSearchParams();

  const {
    isVerseSelected,
    handleHighlightVerse,
    handleSaveHighlightedVerses,
    handleSelectVerse,
  } = useBibleVerses({
    selectedVerses,
    setSelectedVerses,
    verse,
  });

  return (
    <Popover
      key={verse.number}
      open={selectedVerses[selectedVerses.length - 1]?.number === verse.number}
    >
      <PopoverTrigger>
        <button
          disabled={searchParams.get("book") !== null}
          data-selected={
            selectedVerses.find((v) => v.number === verse.number) !== undefined
          }
          className={`text-start hover:underline data-[selected=true]:underline ${
            isVerseSelected ? "!no-underline" : ""
          }`}
          onClick={() => {
            handleSelectVerse();
            createSearchParams("highlight", "color");
          }}
        >
          <span
            className={`${
              colors[isVerseSelected || ""] ||
              "text-zinc-800 prose-strong:text-zinc-800"
            } text-white prose-strong:text-white p-[2px] box-decoration-clone`}
          >
            <strong>{verse.number}</strong> {verse.text}
          </span>
        </button>
      </PopoverTrigger>
      <PopoverContent
        data-highlight={searchParams.get("highlight")}
        className="p-0 data-[highlight=color]:p-2 w-max flex gap-2"
      >
        {searchParams.get("highlight") === "create" ? (
          <>
            <Button
              className="py-0 flex gap-1 text-link"
              variant="link"
              onClick={() => handleSaveHighlightedVerses({ noteVerse: true })}
            >
              Marcar e anotar versículo(s){" "}
              <ExternalLinkIcon size={10} className="relative bottom-1" />
            </Button>
            <Button
              className="py-0"
              variant="link"
              onClick={() => handleSaveHighlightedVerses({ noteVerse: false })}
            >
              Apenas marcar
            </Button>
          </>
        ) : (
          Object.entries(colors).map(([key, value]) => (
            <button
              className={`${value} w-6 h-6 rounded-sm m-0 hover:opacity-90`}
              onClick={() => {
                handleHighlightVerse(key);
                createSearchParams("highlight", "create");
              }}
            />
          ))
        )}
      </PopoverContent>
    </Popover>
  );
};
