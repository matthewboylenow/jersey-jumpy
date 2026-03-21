import { ExternalLink, BarChart2 } from "lucide-react";

const FATHOM_SITE_ID = "rfhdatok";
const FATHOM_SHARE_URL = `https://app.usefathom.com/share/${FATHOM_SITE_ID}/jersey+jumpy`;

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Analytics</h1>
          <p className="text-slate-600 mt-1">
            Site traffic and visitor statistics via Fathom Analytics
          </p>
        </div>
        <a
          href={FATHOM_SHARE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-lg text-sm font-medium hover:bg-slate-700 transition-colors"
        >
          <ExternalLink className="w-4 h-4" />
          Open in Fathom
        </a>
      </div>

      {/* Info card */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-start gap-3">
        <BarChart2 className="w-5 h-5 text-blue-500 mt-0.5 shrink-0" />
        <div className="text-sm text-blue-700">
          <p className="font-medium">Fathom Shared Dashboard</p>
          <p className="mt-1">
            Site ID: <code className="bg-blue-100 px-1 rounded font-mono">{FATHOM_SITE_ID}</code>
            {" · "}If prompted for a password, use your shared dashboard password.
          </p>
        </div>
      </div>

      {/* Fathom embed */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <iframe
          src={FATHOM_SHARE_URL}
          className="w-full"
          style={{ height: "calc(100vh - 280px)", minHeight: "600px", border: "none" }}
          title="Fathom Analytics Dashboard"
          loading="lazy"
        />
      </div>
    </div>
  );
}
