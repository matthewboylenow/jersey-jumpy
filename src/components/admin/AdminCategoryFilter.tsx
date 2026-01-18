"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useTransition } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface AdminCategoryFilterProps {
  categories: { value: string; label: string }[];
}

export function AdminCategoryFilter({ categories }: AdminCategoryFilterProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const currentCategory = searchParams.get("category") || "all";

  const handleChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value && value !== "all") {
      params.set("category", value);
    } else {
      params.delete("category");
    }
    params.delete("page"); // Reset to first page on filter change

    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`);
    });
  };

  return (
    <Select value={currentCategory} onValueChange={handleChange} disabled={isPending}>
      <SelectTrigger className={`w-48 ${isPending ? "opacity-60" : ""}`}>
        <SelectValue placeholder="All Categories" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">All Categories</SelectItem>
        {categories.map((cat) => (
          <SelectItem key={cat.value} value={cat.value}>
            {cat.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
