import DialogOverlayCustom from "@/components/ui/dialog-overlay-custom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookFilters } from "./book-filters";

export const TabsBookFilters = () => {
  return (
    <Tabs defaultValue="no-filter">
      <TabsList className="grid w-full grid-cols-2 mb-5">
        <TabsTrigger value="no-filter">Sem filtro</TabsTrigger>
        <TabsTrigger value="filter">Com filtro</TabsTrigger>
      </TabsList>
      <TabsContent
        value="filter"
        className="flex flex-col justify-center items-center"
      >
        <div className="w-full mb-8">
          <DialogOverlayCustom>
            <BookFilters />
          </DialogOverlayCustom>
        </div>
      </TabsContent>
    </Tabs>
  );
};
