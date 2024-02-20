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
        options={option.filters}
        name={option.name}
        onSelect={(values, valuesObj) => {
          bookFilters.current = {
            ...bookFilters.current,
            [option.key]:
              option.key === "testament"
                ? values
                : valuesObj.map((option) => option.label),
          };
        }}
        multiple
      />
    </div>
  ));
};

export default BookFilters;
