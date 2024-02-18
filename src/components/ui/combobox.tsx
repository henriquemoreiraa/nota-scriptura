"use client";

import { useMemo, useState } from "react";
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

interface ComboboxProps {
  data?: {
    value: string;
    label: string;
  }[];
  name: string;
  multiple?: boolean;
  compare?: "value" | "label";
  onSelect?: (values: string[]) => void;
  onFocus?: () => void;
}

export const Combobox = ({
  data,
  name,
  multiple,
  compare = "value",
  onSelect,
  onFocus,
}: ComboboxProps) => {
  const [open, setOpen] = useState(false);
  const [values, setValues] = useState<string[]>([]);

  const compareValue = compare === "value";

  const renderSelectedValue = useMemo(() => {
    return () => {
      if (values.length && multiple) {
        return (
          <div className="flex flex-wrap gap-3">
            {values.map((value) => (
              <div
                key={value}
                data-testid="multiple-div"
                className="bg-zinc-100 px-2 py-1 rounded-sm"
              >
                {
                  data?.find(
                    (v) => (compareValue ? v.value : v.label) === value
                  )?.label
                }
              </div>
            ))}
          </div>
        );
      }

      return values[0] || `Selecione um ${name.toLowerCase()}`;
    };
  }, [values]);

  const onSelectValue = useMemo(() => {
    return (currentValue: string) => {
      const valueExists = values.find((value) => value === currentValue);
      let newValues = [];

      if (valueExists) {
        newValues = values.filter((value) => value !== currentValue);
      } else {
        newValues = multiple ? [...values, currentValue] : [currentValue];
      }

      setValues(newValues);
      if (onSelect) {
        onSelect(newValues);
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
          data-testid="combobox-btn"
          onFocus={onFocus}
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
            {!data ? (
              <div className="flex justify-center items-center p-5">
                <Loader2 className="size-4 animate-spin text-zinc-400" />
              </div>
            ) : (
              data.map((d) => (
                <CommandItem
                  key={d.value}
                  value={d.value}
                  onSelect={(value) =>
                    onSelectValue(compareValue ? value : d.label)
                  }
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      values.find(
                        (value) => value === (compareValue ? d.value : d.label)
                      )
                        ? "opacity-100"
                        : "opacity-0"
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
