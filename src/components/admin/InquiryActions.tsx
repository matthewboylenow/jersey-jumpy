"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Inquiry } from "@/lib/db/schema";

interface InquiryActionsProps {
  inquiry: Inquiry;
}

const statuses = [
  { value: "new", label: "New" },
  { value: "contacted", label: "Contacted" },
  { value: "booked", label: "Booked" },
  { value: "completed", label: "Completed" },
  { value: "cancelled", label: "Cancelled" },
];

export function InquiryActions({ inquiry }: InquiryActionsProps) {
  const router = useRouter();
  const [status, setStatus] = useState(inquiry.status || "new");
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const handleStatusChange = async (newStatus: string) => {
    setStatus(newStatus);
    setLoading(true);
    try {
      await fetch(`/api/admin/inquiries/${inquiry.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      router.refresh();
    } catch (error) {
      console.error("Error updating status:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await fetch(`/api/admin/inquiries/${inquiry.id}`, {
        method: "DELETE",
      });
      router.push("/admin/inquiries");
      router.refresh();
    } catch (error) {
      console.error("Error deleting inquiry:", error);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-700">Status</label>
        <Select value={status} onValueChange={handleStatusChange} disabled={loading}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {statuses.map((s) => (
              <SelectItem key={s.value} value={s.value}>
                {s.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="pt-4 border-t border-slate-200">
        <a
          href={`mailto:${inquiry.email}`}
          className="block w-full text-center py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Send Email
        </a>
      </div>

      {inquiry.phone && (
        <a
          href={`tel:${inquiry.phone}`}
          className="block w-full text-center py-2 px-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
        >
          Call Customer
        </a>
      )}

      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="outline" className="w-full text-red-600 hover:text-red-700">
            <Trash2 className="w-4 h-4 mr-2" />
            Delete Inquiry
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Inquiry</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this inquiry? This action cannot be
              undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-red-600 hover:bg-red-700"
              disabled={deleting}
            >
              {deleting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Deleting...
                </>
              ) : (
                "Delete"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
