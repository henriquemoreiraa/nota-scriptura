"use client";
import { Combobox } from "@/components/ui/combobox";
import { SeparatorTitle } from "@/components/ui/separator-title";
import { filterOptions } from "../../constants";
import { useBooksContext } from "@/context/book-context";

export const BookFilters = () => {
  const { bookFilters } = useBooksContext();

  return filterOptions.map((option) => (
    <div key={option.key}>
      <SeparatorTitle>{option.name}</SeparatorTitle>
      <Combobox
        options={option.filters}
        name={option.name}
        placeholder={`Selecione ${option.name.toLowerCase()}`}
        onSelect={(_, valuesObj) => {
          bookFilters.current = {
            ...bookFilters.current,
            [option.key]: valuesObj,
          };
        }}
        values={bookFilters.current?.[option.key]}
        multiple
      />
    </div>
  ));
};
