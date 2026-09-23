import { AdminDashboard } from "@/components/admin/AdminDashboard";
import { AdminLogin } from "@/components/admin/AdminLogin";
import { getAdminSession, isAdminAuthConfigured } from "@/lib/admin-auth";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  if (!isAdminAuthConfigured()) {
    return (
      <div className="opening-bg flex min-h-dvh items-center justify-center px-4">
        <div className="glass-card max-w-md rounded-[2rem] px-6 py-8 text-center">
          <h1 className="font-display text-3xl text-ink italic">Admin setup needed</h1>
          <p className="mt-3 text-sm leading-relaxed text-ink-soft">
            Add ADMIN_EMAIL and ADMIN_SESSION_SECRET on the server, then create the matching
            Supabase Auth user.
          </p>
        </div>
      </div>
    );
  }

  const session = await getAdminSession();
  if (!session) return <AdminLogin />;

  return <AdminDashboard email={session.email} />;
}
