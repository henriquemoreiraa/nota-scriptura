import { Combobox } from "@/components/ui/combobox";
import { SeparatorTitle } from "@/components/ui/separator-title";
import { filterOptions } from "./constants";

const BookFilters = () => {
  return filterOptions.map((option) => (
    <div key={option.name}>
      <SeparatorTitle className="mb-1">{option.name}</SeparatorTitle>
      <Combobox
        data={option.filters}
        name={option.name}
        compare="label"
        multiple
      />
    </div>
  ));
};

export default BookFilters;
