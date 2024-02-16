"use client";

import { useMemo, useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";

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

interface ComboboxProps {
  data: {
    value: string;
    label: string;
  }[];
  name: string;
  multiple?: boolean;
  compare?: "values" | "label";
}

export const Combobox = ({
  data,
  name,
  multiple,
  compare = "values",
}: ComboboxProps) => {
  const [open, setOpen] = useState(false);
  const [values, setValues] = useState<string[]>([]);

  const renderSelectedValue = useMemo(() => {
    return () => {
      if (values.length && multiple) {
        return (
          <div className="flex flex-wrap gap-3">
            {values.map((label) => (
              <div key={label} className="bg-zinc-100 px-2 py-1 rounded-sm">
                {label}
              </div>
            ))}
          </div>
        );
      }

      return values[0] || `Selecione um ${name.toLowerCase()}`;
    };
  }, [values]);

  const onSelect = useMemo(() => {
    return (currentValue: string) => {
      const valueExists = values.find((value) => value === currentValue);

      if (valueExists) {
        setValues((prevValues) => [
          ...prevValues.filter((value) => value !== currentValue),
        ]);
      } else {
        setValues((prevValues) => [...prevValues, currentValue]);
      }

      if (!multiple) {
        setOpen(false);
      }
    };
  }, [values]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="justify-between w-full h-max"
        >
          {renderSelectedValue()}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0">
        <Command className="max-h-[245px]">
          <CommandInput placeholder={`Pesquise um ${name.toLowerCase()}`} />
          <CommandEmpty>Nenhum {name.toLowerCase()} encontrado.</CommandEmpty>
          <CommandGroup className="overflow-y-auto">
            {data.map((d) => (
              <CommandItem
                key={d.value}
                value={d.value}
                onSelect={(value) =>
                  onSelect(compare === "values" ? value : d.label)
                }
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    values.find((label) => label === d.label)
                      ? "opacity-100"
                      : "opacity-0"
                  )}
                />
                {d.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
