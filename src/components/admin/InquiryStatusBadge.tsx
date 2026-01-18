"use client";

interface InquiryStatusBadgeProps {
  status: string;
}

export function InquiryStatusBadge({ status }: InquiryStatusBadgeProps) {
  const statusClasses: Record<string, string> = {
    new: "bg-sky/20 text-sky-dark",
    contacted: "bg-butter/30 text-butter-dark",
    booked: "bg-mint/20 text-mint-dark",
    cancelled: "bg-slate-100 text-slate-500",
  };

  return (
    <span
      className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
        statusClasses[status] || statusClasses.new
      }`}
    >
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
}
