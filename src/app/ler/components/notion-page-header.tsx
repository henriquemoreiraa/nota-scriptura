import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { pageProperties } from "./constants";
import Image from "next/image";
import { useQueryClient } from "@tanstack/react-query";
import { NotionPageType } from "@/types/notion-pages";

export const NotionPageHeader = () => {
  const queryClient = useQueryClient();
  const queryState = queryClient.getQueryState(["notion-page"]);
  const page = //@ts-ignore
    queryClient.getQueryData(["notion-page"])?.data as NotionPageType;

  if (queryState?.status === "pending") {
    return <div>Carregando...</div>;
  }

  return (
    <>
      <div className="w-full h-[20vh] relative">
        <Image
          src={page?.cover?.external?.url}
          alt="Cover da página"
          className="object-cover object-center"
          priority
          fill
        />
      </div>
      <div className="prose dark:prose-invert my-5 mx-10 m prose-headings:my-1 prose-p:my-0 prose-headings:text-zinc-800 text-zinc-800">
        <h1>
          {page?.icon?.emoji} {page?.properties?.Livro?.title[0]?.text?.content}
        </h1>
        <div className="mt-8 flex flex-col-reverse">
          {Object.entries(page.properties).map(
            ([key, value]) =>
              pageProperties[key] && (
                <div key={key} className="flex gap-3 mt-3 text-sm">
                  <div className="w-44 text-ellipsis overflow-hidden text-nowrap text-zinc-500 flex gap-2 items-center">
                    {pageProperties[key].icon} {key}
                  </div>
                  <div className="capitalize">
                    {value?.type === "rich_text" &&
                      value?.rich_text[0]?.text?.content}
                    {value?.type === "last_edited_time" && (
                      <span className="lowercase">
                        {format(
                          value?.last_edited_time,
                          "d 'de' LLLL 'de' yyyy H':'m",
                          { locale: ptBR }
                        )}
                      </span>
                    )}
                  </div>
                </div>
              )
          )}
        </div>
      </div>
    </>
  );
};
