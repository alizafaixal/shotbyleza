import { useState, useEffect } from "react";
import { useListInquiries, useUpdateInquiryStatus, getListInquiriesQueryKey, setAuthTokenGetter } from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";

type InquiryStatus = "new" | "replied" | "booked";

const STATUS_COLORS: Record<string, string> = {
  new: "bg-blue-500/20 text-blue-300 border-blue-500/30",
  replied: "bg-yellow-500/20 text-yellow-300 border-yellow-500/30",
  booked: "bg-green-500/20 text-green-300 border-green-500/30",
};

const SESSION_KEY = "sbl_admin_token";

function LoginGate({ onAuth }: { onAuth: (token: string) => void }) {
  const [secret, setSecret] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/inquiries", {
        headers: { Authorization: `Bearer ${secret}` },
      });
      if (res.ok) {
        sessionStorage.setItem(SESSION_KEY, secret);
        onAuth(secret);
      } else {
        setError("Incorrect password. Try again.");
      }
    } catch {
      setError("Could not reach the API server. Make sure it is running.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="w-full max-w-sm">
        <h1 className="text-2xl font-bold font-display text-foreground mb-1">
          ShotByLeza <span className="text-primary">Admin</span>
        </h1>
        <p className="text-muted-foreground text-sm mb-6">Enter the admin password to continue.</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="password"
            value={secret}
            onChange={(e) => setSecret(e.target.value)}
            placeholder="Admin password"
            required
            className="w-full px-4 py-2 rounded-lg bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
          {error && <p className="text-red-400 text-sm">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 rounded-lg bg-primary text-white font-medium hover:bg-primary/90 transition-colors disabled:opacity-50"
          >
            {loading ? "Checking…" : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}

function Dashboard() {
  const queryClient = useQueryClient();
  const { data: inquiries, isLoading, isError } = useListInquiries();
  const updateStatus = useUpdateInquiryStatus();
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const handleStatusChange = (id: number, status: InquiryStatus) => {
    updateStatus.mutate(
      { id, data: { status } },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: getListInquiriesQueryKey() });
        },
      }
    );
  };

  const total = inquiries?.length ?? 0;
  const byStatus = (inquiries ?? []).reduce<Record<string, number>>((acc, i) => {
    acc[i.status] = (acc[i.status] ?? 0) + 1;
    return acc;
  }, {});

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Loading inquiries…</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-red-400">Failed to load inquiries. Is the API server running?</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground p-6 md:p-10">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold font-display text-foreground">
              ShotByLeza <span className="text-primary">Inquiries</span>
            </h1>
            <p className="text-muted-foreground mt-1">All contact form submissions</p>
          </div>
          <button
            onClick={() => { sessionStorage.removeItem(SESSION_KEY); window.location.reload(); }}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Sign out
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-card border border-border rounded-xl p-4">
            <p className="text-sm text-muted-foreground">Total</p>
            <p className="text-3xl font-bold text-foreground">{total}</p>
          </div>
          <div className="bg-card border border-border rounded-xl p-4">
            <p className="text-sm text-muted-foreground">New</p>
            <p className="text-3xl font-bold text-blue-400">{byStatus.new ?? 0}</p>
          </div>
          <div className="bg-card border border-border rounded-xl p-4">
            <p className="text-sm text-muted-foreground">Replied</p>
            <p className="text-3xl font-bold text-yellow-400">{byStatus.replied ?? 0}</p>
          </div>
          <div className="bg-card border border-border rounded-xl p-4">
            <p className="text-sm text-muted-foreground">Booked</p>
            <p className="text-3xl font-bold text-green-400">{byStatus.booked ?? 0}</p>
          </div>
        </div>

        {/* Table */}
        {total === 0 ? (
          <div className="bg-card border border-border rounded-xl p-12 text-center text-muted-foreground">
            No inquiries yet. Submissions from the contact form will appear here.
          </div>
        ) : (
          <div className="space-y-3">
            {(inquiries ?? []).map((inq) => (
              <div key={inq.id} className="bg-card border border-border rounded-xl overflow-hidden">
                <div
                  className="flex items-center gap-4 p-4 cursor-pointer hover:bg-secondary/30 transition-colors"
                  onClick={() => setExpandedId(expandedId === inq.id ? null : inq.id)}
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 flex-wrap">
                      <p className="font-medium text-foreground">{inq.name}</p>
                      <span className="text-muted-foreground text-sm">{inq.email}</span>
                      {inq.instagram && (
                        <span className="text-muted-foreground text-sm">@{inq.instagram}</span>
                      )}
                      {inq.shootType && (
                        <span className="text-xs bg-secondary border border-border px-2 py-0.5 rounded-full text-muted-foreground">
                          {inq.shootType}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mt-1 truncate">{inq.message}</p>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <span className="text-xs text-muted-foreground hidden md:block">
                      {new Date(inq.createdAt).toLocaleDateString("en-AU", {
                        day: "numeric", month: "short", year: "numeric",
                      })}
                    </span>
                    <select
                      value={inq.status}
                      onClick={(e) => e.stopPropagation()}
                      onChange={(e) => handleStatusChange(inq.id, e.target.value as InquiryStatus)}
                      className={`text-xs border rounded-full px-3 py-1 cursor-pointer bg-transparent ${STATUS_COLORS[inq.status] ?? ""}`}
                    >
                      <option value="new">New</option>
                      <option value="replied">Replied</option>
                      <option value="booked">Booked</option>
                    </select>
                  </div>
                </div>

                {expandedId === inq.id && (
                  <div className="border-t border-border p-4 bg-secondary/20 space-y-3 text-sm">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Message</p>
                        <p className="text-foreground whitespace-pre-wrap">{inq.message}</p>
                      </div>
                      <div className="space-y-2">
                        <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Source Info</p>
                        {inq.pageSource && <p className="text-muted-foreground">Page: <span className="text-foreground">{inq.pageSource}</span></p>}
                        {inq.referrer && <p className="text-muted-foreground">Referrer: <span className="text-foreground break-all">{inq.referrer}</span></p>}
                        {inq.utmSource && <p className="text-muted-foreground">UTM Source: <span className="text-foreground">{inq.utmSource}</span></p>}
                        {inq.utmMedium && <p className="text-muted-foreground">UTM Medium: <span className="text-foreground">{inq.utmMedium}</span></p>}
                        {inq.utmCampaign && <p className="text-muted-foreground">UTM Campaign: <span className="text-foreground">{inq.utmCampaign}</span></p>}
                        <p className="text-muted-foreground">Submitted: <span className="text-foreground">{new Date(inq.createdAt).toLocaleString("en-AU")}</span></p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function Admin() {
  const [token, setToken] = useState<string | null>(() => sessionStorage.getItem(SESSION_KEY));

  useEffect(() => {
    if (token) {
      setAuthTokenGetter(() => token);
    } else {
      setAuthTokenGetter(null);
    }
  }, [token]);

  if (!token) {
    return <LoginGate onAuth={setToken} />;
  }

  return <Dashboard />;
}
