import { getDb } from "@/lib/db";
import { adminUsers } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { UserForm } from "@/components/admin/UserForm";
import { UserActions } from "@/components/admin/UserActions";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function UserDetailPage({ params }: PageProps) {
  const { id } = await params;

  // Handle "new" as a special case for creating users
  if (id === "new") {
    return (
      <div className="max-w-2xl">
        <Button variant="ghost" size="sm" asChild className="mb-4">
          <Link href="/admin/users">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Users
          </Link>
        </Button>
        <h1 className="text-2xl font-bold text-slate-900 mb-6">Create User</h1>
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <UserForm />
        </div>
      </div>
    );
  }

  const db = getDb();
  const result = await db
    .select({
      id: adminUsers.id,
      email: adminUsers.email,
      name: adminUsers.name,
      role: adminUsers.role,
      createdAt: adminUsers.createdAt,
    })
    .from(adminUsers)
    .where(eq(adminUsers.id, parseInt(id)))
    .limit(1);

  const user = result[0];

  if (!user) {
    notFound();
  }

  return (
    <div className="max-w-2xl">
      <Button variant="ghost" size="sm" asChild className="mb-4">
        <Link href="/admin/users">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Users
        </Link>
      </Button>
      <h1 className="text-2xl font-bold text-slate-900 mb-6">Edit User</h1>

      <div className="space-y-6">
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <UserForm user={user} />
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">Danger Zone</h2>
          <UserActions userId={user.id} />
        </div>
      </div>
    </div>
  );
}
