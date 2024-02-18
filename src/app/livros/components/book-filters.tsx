"use client";
import { Combobox } from "@/components/ui/combobox";
import { SeparatorTitle } from "@/components/ui/separator-title";
import { filterOptions } from "./constants";
import { useBooksContext } from "@/context/book-context";

const BookFilters = () => {
  const { bookFilters } = useBooksContext();

  return filterOptions.map((option) => (
    <div>
      <SeparatorTitle>{option.name}</SeparatorTitle>
      <Combobox
        key={option.key}
        data={option.filters}
        name={option.name}
        compare={option.compare as "value" | "label"}
        onSelect={(values) => {
          bookFilters.current = {
            ...bookFilters.current,
            [option.key]: values,
          };
        }}
        multiple
      />
    </div>
  ));
};

export default BookFilters;
