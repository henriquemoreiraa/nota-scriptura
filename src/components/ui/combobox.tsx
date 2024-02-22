"use client";

import { useEffect, useMemo, useState } from "react";
import { Check, ChevronsUpDown, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Loading } from "../loading";

type Options = {
  value: string | number;
  label: string;
}[];

interface ComboboxProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onSelect"> {
  options?: Options;
  multiple?: boolean;
  placeholder: string;
  isLoading?: boolean;
  onSelect?: (values: string[], valuesObj: Options) => void;
}

export const Combobox = ({
  options,
  name,
  multiple,
  value,
  onSelect,
  placeholder,
  disabled,
  isLoading,
  ...props
}: ComboboxProps) => {
  const [open, setOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState<Options>([]);

  const renderSelectedValue = useMemo(() => {
    return () => {
      if (selectedOptions.length && multiple) {
        return (
          <div className="flex flex-wrap gap-3">
            {selectedOptions.map((option) => (
              <div
                key={option.value}
                data-testid="multiple-div"
                className="bg-zinc-100 px-2 py-1 rounded-sm"
              >
                {option.label}
              </div>
            ))}
          </div>
        );
      }

      if (disabled && isLoading) {
        return <Loading />;
      }

      if (disabled && !value) {
        return `Nenhum ${name?.toLowerCase()} encontrado.`;
      }

      return selectedOptions[0]?.label || placeholder;
    };
  }, [selectedOptions, isLoading]);

  const onSelectValue = useMemo(() => {
    return (currentValue: string) => {
      const valueExists = selectedOptions.find(
        (option) => option.value.toString() === currentValue
      );
      const selectedOption = options?.find(
        (option) => option.value.toString() === currentValue
      );

      let newSelectedOptions: Options = [];

      if (valueExists && !disabled) {
        newSelectedOptions = selectedOptions.filter(
          (option) => option.value.toString() !== currentValue
        );
      } else {
        if (selectedOption) {
          newSelectedOptions = multiple
            ? [...selectedOptions, selectedOption]
            : [selectedOption];
        }
      }

      setSelectedOptions(newSelectedOptions);
      if (onSelect) {
        onSelect(
          newSelectedOptions.map((option) => option.value.toString()),
          newSelectedOptions
        );
      }

      if (!multiple) {
        setOpen(false);
      }
    };
  }, [selectedOptions, options]);

  useEffect(() => {
    if (value) {
      onSelectValue(value?.toString());
    }
  }, [value]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="justify-between w-full h-max"
          data-testid="combobox-btn"
          disabled={disabled}
          {...props}
        >
          {renderSelectedValue()}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0">
        <Command className="max-h-[245px]">
          <CommandInput placeholder={`Pesquise um ${name?.toLowerCase()}`} />
          <CommandEmpty>Nenhum {name?.toLowerCase()} encontrado.</CommandEmpty>
          <CommandGroup className="overflow-y-auto">
            {isLoading ? (
              <Loading />
            ) : (
              options?.map((d) => (
                <CommandItem
                  data-testid={d.value}
                  key={d.value}
                  value={d.value.toString()}
                  onSelect={onSelectValue}
                >
                  <Check
                    data-value={selectedOptions.find(
                      (option) => option.value === d.value
                    )}
                    className={cn(
                      "mr-2 h-4 w-4 opacity-0 data-[value]:opacity-100"
                    )}
                  />
                  {d.label}
                </CommandItem>
              ))
            )}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
