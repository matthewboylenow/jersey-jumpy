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

interface AdminStatusFilterProps {
  statuses?: { value: string; label: string }[];
  paramName?: string;
}

const defaultStatuses = [
  { value: "all", label: "All Status" },
  { value: "active", label: "Active" },
  { value: "hidden", label: "Hidden" },
];

export function AdminStatusFilter({ statuses = defaultStatuses, paramName = "status" }: AdminStatusFilterProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const currentValue = searchParams.get(paramName) || "all";

  const handleChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value && value !== "all") {
      params.set(paramName, value);
    } else {
      params.delete(paramName);
    }
    params.delete("page"); // Reset to first page on filter change

    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`);
    });
  };

  return (
    <Select value={currentValue} onValueChange={handleChange} disabled={isPending}>
      <SelectTrigger className={`w-36 ${isPending ? "opacity-60" : ""}`}>
        <SelectValue placeholder="All Status" />
      </SelectTrigger>
      <SelectContent>
        {statuses.map((status) => (
          <SelectItem key={status.value} value={status.value}>
            {status.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
