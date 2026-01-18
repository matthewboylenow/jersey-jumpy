"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useState, useTransition, useEffect } from "react";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";

interface AdminSearchProps {
  placeholder?: string;
}

export function AdminSearch({ placeholder = "Search..." }: AdminSearchProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [value, setValue] = useState(searchParams.get("q") || "");

  useEffect(() => {
    setValue(searchParams.get("q") || "");
  }, [searchParams]);

  const handleSearch = (term: string) => {
    setValue(term);
    const params = new URLSearchParams(searchParams.toString());

    if (term) {
      params.set("q", term);
      params.delete("page"); // Reset to first page on new search
    } else {
      params.delete("q");
    }

    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`);
    });
  };

  const clearSearch = () => {
    setValue("");
    const params = new URLSearchParams(searchParams.toString());
    params.delete("q");
    params.delete("page");
    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`);
    });
  };

  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
      <Input
        type="search"
        placeholder={placeholder}
        value={value}
        onChange={(e) => handleSearch(e.target.value)}
        className={`pl-9 pr-9 w-64 ${isPending ? "opacity-60" : ""}`}
      />
      {value && (
        <button
          onClick={clearSearch}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
