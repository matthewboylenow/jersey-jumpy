import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminHeader } from "@/components/admin/AdminHeader";

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session?.user) {
    redirect("/admin/login");
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <AdminSidebar />
      <div className="lg:pl-64">
        <AdminHeader user={session.user} />
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
