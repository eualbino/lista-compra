"use client";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Header } from "@/components/header-page/header";
import { InsertPurchase } from "@/components/dialog-insert/insert-purchase";
import { TableData } from "@/components/table-data/table-data";
import { useForm } from "react-hook-form";
import { string, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDebounce } from "use-debounce";
import { useState } from "react";

const searchNameProduct = z.object({
  query: string(),
});

type SearchNameProduct = z.infer<typeof searchNameProduct>;

export default function HomePage() {
  const [page, setPage] = useState(1);
  const { register, watch } = useForm<SearchNameProduct>({
    resolver: zodResolver(searchNameProduct),
    defaultValues: {
      query: undefined,
    },
  });
  const query = watch("query");

  const [q] = useDebounce(query, 1000);

  return (
    <div>
      <Header />
      <div className="flex justify-center items-center min-h-[70vh] flex-col max-h-600:mt-auto">
        <div className="min-w-[40%]">
          <div className="flex justify-between gap-3 pb-8 pt-4 ring-zinc-300">
            <div className="flex items-center">
              <Search className="w-5 h-4 text-sm absolute ml-2 text-zinc-600 xs:ml-4" />
              <Input
                className=" placeholder:text-zinc-500  dark:border-none dark:bg-zinc-900 border-2 border-black rounded-xl max-w-80 text-sm pl-9"
                placeholder="Pesquisar..."
                {...register("query")}
                autoComplete="off"
              />
            </div>
            <div>
              <InsertPurchase page={page} q={q} />
            </div>
          </div>
          <TableData page={page} setPage={setPage} q={q} />
        </div>
      </div>
    </div>
  );
}
