import { getDb } from "@/lib/db";
import { inflatables, inquiries, testimonials, partyPackages } from "@/lib/db/schema";
import { count, eq, desc, sql } from "drizzle-orm";
import Link from "next/link";
import {
  Castle,
  Mail,
  MessageSquare,
  Package,
  TrendingUp,
  Clock,
  ArrowRight,
} from "lucide-react";

async function getDashboardStats() {
  const db = getDb();

  const [
    inflatableCount,
    packageCount,
    testimonialCount,
    inquiryStats,
    recentInquiries,
  ] = await Promise.all([
    db.select({ count: count() }).from(inflatables).where(eq(inflatables.isActive, true)),
    db.select({ count: count() }).from(partyPackages).where(eq(partyPackages.isActive, true)),
    db.select({ count: count() }).from(testimonials).where(eq(testimonials.isActive, true)),
    db.select({
      total: count(),
      new: sql<number>`count(*) filter (where ${inquiries.status} = 'new')`,
    }).from(inquiries),
    db.select({
      id: inquiries.id,
      name: inquiries.name,
      email: inquiries.email,
      requestedJumpy: inquiries.requestedJumpy,
      status: inquiries.status,
      createdAt: inquiries.createdAt,
    })
    .from(inquiries)
    .orderBy(desc(inquiries.createdAt))
    .limit(5),
  ]);

  return {
    inflatables: inflatableCount[0].count,
    packages: packageCount[0].count,
    testimonials: testimonialCount[0].count,
    totalInquiries: inquiryStats[0].total,
    newInquiries: inquiryStats[0].new,
    recentInquiries,
  };
}

export default async function AdminDashboardPage() {
  const stats = await getDashboardStats();

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Welcome back!</h1>
        <p className="text-slate-600 mt-1">
          Here&apos;s what&apos;s happening with Jersey Jumpy today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Active Inflatables"
          value={stats.inflatables}
          icon={Castle}
          href="/admin/inflatables"
          color="lavender"
        />
        <StatCard
          title="Party Packages"
          value={stats.packages}
          icon={Package}
          href="/admin/packages"
          color="mint"
        />
        <StatCard
          title="Testimonials"
          value={stats.testimonials}
          icon={MessageSquare}
          href="/admin/testimonials"
          color="peach"
        />
        <StatCard
          title="New Inquiries"
          value={stats.newInquiries}
          icon={Mail}
          href="/admin/inquiries"
          color="sky"
          highlight={stats.newInquiries > 0}
        />
      </div>

      {/* Recent Inquiries */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-sky/20 flex items-center justify-center">
              <Clock className="w-5 h-5 text-sky-dark" />
            </div>
            <div>
              <h2 className="font-semibold text-slate-900">Recent Inquiries</h2>
              <p className="text-sm text-slate-500">
                {stats.totalInquiries} total inquiries
              </p>
            </div>
          </div>
          <Link
            href="/admin/inquiries"
            className="text-sm font-medium text-cta-primary hover:text-cta-primary-hover flex items-center gap-1"
          >
            View all
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="divide-y divide-slate-100">
          {stats.recentInquiries.length === 0 ? (
            <div className="px-6 py-12 text-center text-slate-500">
              No inquiries yet
            </div>
          ) : (
            stats.recentInquiries.map((inquiry) => (
              <Link
                key={inquiry.id}
                href={`/admin/inquiries/${inquiry.id}`}
                className="block px-6 py-4 hover:bg-slate-50 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-slate-900">{inquiry.name}</p>
                    <p className="text-sm text-slate-500">
                      {inquiry.requestedJumpy || "General inquiry"}
                    </p>
                  </div>
                  <div className="text-right">
                    <StatusBadge status={inquiry.status || "new"} />
                    <p className="text-xs text-slate-400 mt-1">
                      {inquiry.createdAt
                        ? new Date(inquiry.createdAt).toLocaleDateString()
                        : "N/A"}
                    </p>
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <QuickAction
          title="Add Inflatable"
          description="Add a new bounce house or slide to your inventory"
          href="/admin/inflatables/new"
          icon={Castle}
        />
        <QuickAction
          title="View Inquiries"
          description="Check and respond to customer inquiries"
          href="/admin/inquiries"
          icon={Mail}
        />
        <QuickAction
          title="Manage FAQs"
          description="Update frequently asked questions"
          href="/admin/faqs"
          icon={TrendingUp}
        />
      </div>
    </div>
  );
}

function StatCard({
  title,
  value,
  icon: Icon,
  href,
  color,
  highlight = false,
}: {
  title: string;
  value: number;
  icon: React.ComponentType<{ className?: string }>;
  href: string;
  color: "lavender" | "mint" | "peach" | "sky";
  highlight?: boolean;
}) {
  const colorClasses = {
    lavender: "bg-lavender/20 text-lavender-dark",
    mint: "bg-mint/20 text-mint-dark",
    peach: "bg-peach/20 text-peach-dark",
    sky: "bg-sky/20 text-sky-dark",
  };

  return (
    <Link
      href={href}
      className={`block bg-white rounded-xl border p-6 hover:shadow-md transition-shadow ${
        highlight ? "border-sky ring-2 ring-sky/20" : "border-slate-200"
      }`}
    >
      <div className="flex items-center justify-between">
        <div className={`w-12 h-12 rounded-xl ${colorClasses[color]} flex items-center justify-center`}>
          <Icon className="w-6 h-6" />
        </div>
        {highlight && (
          <span className="px-2 py-1 text-xs font-bold bg-sky text-white rounded-full">
            New
          </span>
        )}
      </div>
      <p className="mt-4 text-3xl font-bold text-slate-900">{value}</p>
      <p className="text-sm text-slate-500">{title}</p>
    </Link>
  );
}

function QuickAction({
  title,
  description,
  href,
  icon: Icon,
}: {
  title: string;
  description: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}) {
  return (
    <Link
      href={href}
      className="block bg-white rounded-xl border border-slate-200 p-6 hover:shadow-md hover:border-cta-primary/30 transition-all group"
    >
      <div className="flex items-start gap-4">
        <div className="w-10 h-10 rounded-lg bg-cta-primary/10 flex items-center justify-center group-hover:bg-cta-primary/20 transition-colors">
          <Icon className="w-5 h-5 text-cta-primary" />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-slate-900 group-hover:text-cta-primary transition-colors">
            {title}
          </h3>
          <p className="text-sm text-slate-500 mt-1">{description}</p>
        </div>
        <ArrowRight className="w-5 h-5 text-slate-300 group-hover:text-cta-primary group-hover:translate-x-1 transition-all" />
      </div>
    </Link>
  );
}

function StatusBadge({ status }: { status: string }) {
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
