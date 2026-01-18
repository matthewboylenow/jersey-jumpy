"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { MoreHorizontal, Eye, EyeOff, Trash2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface InflatableActionsProps {
  id: number;
  isActive: boolean;
}

export function InflatableActions({ id, isActive }: InflatableActionsProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const toggleActive = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/admin/inflatables/${id}/toggle`, {
        method: "POST",
      });
      if (response.ok) {
        router.refresh();
      }
    } catch (error) {
      console.error("Error toggling inflatable:", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteInflatable = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/admin/inflatables/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        router.refresh();
      }
    } catch (error) {
      console.error("Error deleting inflatable:", error);
    } finally {
      setLoading(false);
      setShowDeleteDialog(false);
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm" disabled={loading}>
            {loading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <MoreHorizontal className="w-4 h-4" />
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={toggleActive}>
            {isActive ? (
              <>
                <EyeOff className="w-4 h-4 mr-2" />
                Hide from site
              </>
            ) : (
              <>
                <Eye className="w-4 h-4 mr-2" />
                Show on site
              </>
            )}
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => setShowDeleteDialog(true)}
            className="text-red-600"
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Inflatable</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this inflatable? This action cannot
              be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={deleteInflatable}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
