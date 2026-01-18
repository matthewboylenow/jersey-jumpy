import { getDb } from "@/lib/db";
import { settings } from "@/lib/db/schema";
import { SettingsForm } from "@/components/admin/SettingsForm";

export default async function SettingsPage() {
  const db = getDb();
  const allSettings = await db.select().from(settings);

  // Convert to a key-value object
  const settingsMap: Record<string, string> = {};
  allSettings.forEach((s) => {
    if (s.key && s.value) {
      settingsMap[s.key] = s.value;
    }
  });

  return (
    <div className="max-w-3xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Site Settings</h1>
        <p className="text-slate-600 mt-1">
          Configure global settings for your website
        </p>
      </div>

      <SettingsForm settings={settingsMap} />
    </div>
  );
}
