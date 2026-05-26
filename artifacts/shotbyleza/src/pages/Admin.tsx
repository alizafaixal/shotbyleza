import { useState, useEffect, useRef } from "react";
import { useListInquiries, useUpdateInquiryStatus, getListInquiriesQueryKey, setAuthTokenGetter } from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import { Star, Upload, Eye, EyeOff, ChevronDown, ExternalLink, CheckCircle, XCircle, AlertCircle } from "lucide-react";

type InquiryStatus = "new" | "replied" | "booked";
type Tab = "inquiries" | "analytics" | "media";

const STATUS_COLORS: Record<string, string> = {
  new: "bg-blue-500/20 text-blue-300 border-blue-500/30",
  replied: "bg-yellow-500/20 text-yellow-300 border-yellow-500/30",
  booked: "bg-green-500/20 text-green-300 border-green-500/30",
};

const SESSION_KEY = "sbl_admin_token";

const PORTFOLIO_CATEGORIES = [
  { label: "All Categories", value: "all" },
  { label: "Model Portfolio", value: "Model Portfolio" },
  { label: "Event", value: "Event" },
  { label: "Fashion & E-Commerce", value: "Fashion & E-Commerce" },
  { label: "Club", value: "Club" },
  { label: "Portraits", value: "Portraits" },
];

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

function InquiriesTab() {
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

  if (isLoading) return <div className="flex items-center justify-center py-24 text-muted-foreground">Loading inquiries…</div>;
  if (isError) return <div className="flex items-center justify-center py-24 text-red-400">Failed to load inquiries. Is the API server running?</div>;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
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
                    {inq.instagram && <span className="text-muted-foreground text-sm">@{inq.instagram}</span>}
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
                    {new Date(inq.createdAt).toLocaleDateString("en-AU", { day: "numeric", month: "short", year: "numeric" })}
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
  );
}

function AnalyticsTab() {
  const gaId = import.meta.env.VITE_GA4_ID as string | undefined;

  return (
    <div className="space-y-6">
      <div className="bg-card border border-border rounded-xl p-6">
        <h2 className="text-lg font-semibold text-foreground mb-4">GA4 Analytics</h2>
        <div className="space-y-4">
          {gaId ? (
            <div className="flex items-start gap-3 p-4 bg-green-500/10 border border-green-500/30 rounded-xl">
              <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <div>
                <p className="text-green-300 font-medium">Active</p>
                <p className="text-sm text-muted-foreground mt-1">Measurement ID: <span className="text-foreground font-mono">{gaId}</span></p>
                <p className="text-sm text-muted-foreground mt-1">Tracking is live on all pages. Visit your GA4 dashboard to view real-time data.</p>
                <a
                  href="https://analytics.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-sm text-primary hover:underline mt-2"
                >
                  Open Google Analytics <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          ) : (
            <div className="flex items-start gap-3 p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-xl">
              <AlertCircle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <p className="text-yellow-300 font-medium">Not configured</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Add <span className="font-mono text-foreground">VITE_GA4_ID</span> to Replit Secrets with your GA4 Measurement ID (e.g. <span className="font-mono text-foreground">G-XXXXXXXXXX</span>) to enable tracking.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="bg-card border border-border rounded-xl p-6">
        <h2 className="text-lg font-semibold text-foreground mb-4">Google Search Console</h2>
        <div className="space-y-4">
          <div className="flex items-start gap-3 p-4 bg-green-500/10 border border-green-500/30 rounded-xl">
            <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
            <div>
              <p className="text-green-300 font-medium">Verification file deployed</p>
              <p className="text-sm text-muted-foreground mt-1">
                File: <span className="font-mono text-foreground">/google7c6b98f01a034f58.html</span>
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                If you haven't verified yet, go to Google Search Console and complete the HTML file verification for your site.
              </p>
              <a
                href="https://search.google.com/search-console"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-sm text-primary hover:underline mt-2"
              >
                Open Search Console <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-card border border-border rounded-xl p-6">
        <h2 className="text-lg font-semibold text-foreground mb-2">Google Reviews API</h2>
        <p className="text-sm text-muted-foreground mb-4">
          To show live Google Reviews on your Contact page, add these to Replit Secrets:
        </p>
        <div className="space-y-2 text-sm font-mono">
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground">GOOGLE_PLACES_API_KEY</span>
            <span className="text-muted-foreground">—</span>
            <span className="text-foreground">Your Google Places API key</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground">GOOGLE_PLACE_ID</span>
            <span className="text-muted-foreground">—</span>
            <span className="text-foreground">Optional — auto-discovered if not set</span>
          </div>
        </div>
        <p className="text-xs text-muted-foreground mt-4">
          Note: Google Places API returns a maximum of 5 reviews (most relevant only). Static reviews are shown as fallback when not configured.
        </p>
      </div>
    </div>
  );
}

interface PortfolioImage {
  imagePath: string;
  category: string;
  src: string;
  hidden: boolean;
  customTitle: string | null;
  caption: string | null;
}

function MediaTab({ token }: { token: string }) {
  const [images, setImages] = useState<PortfolioImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [editingPath, setEditingPath] = useState<string | null>(null);
  const [editValues, setEditValues] = useState({ customTitle: "", caption: "" });
  const [saving, setSaving] = useState<string | null>(null);
  const [uploadingFor, setUploadingFor] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const uploadTargetRef = useRef<string | null>(null);

  const fetchImages = () => {
    setLoading(true);
    fetch("/api/portfolio/images")
      .then((r) => r.json())
      .then((data: PortfolioImage[]) => { setImages(data); setLoading(false); })
      .catch(() => setLoading(false));
  };

  useEffect(() => { fetchImages(); }, []);

  const patchImage = async (imagePath: string, body: Record<string, unknown>) => {
    setSaving(imagePath);
    await fetch(`/api/portfolio/images`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ imagePath, ...body }),
    });
    setSaving(null);
    fetchImages();
  };

  const toggleHidden = (img: PortfolioImage) => patchImage(img.imagePath, { hidden: !img.hidden });

  const saveCaption = async (imagePath: string) => {
    await patchImage(imagePath, { customTitle: editValues.customTitle || null, caption: editValues.caption || null });
    setEditingPath(null);
  };

  const handleUpload = async (file: File) => {
    const imagePath = uploadTargetRef.current;
    if (!imagePath) return;
    setUploadingFor(imagePath);
    try {
      const form = new FormData();
      form.append("file", file);
      const res = await fetch("/api/portfolio/upload", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: form,
      });
      if (res.ok) {
        const { storagePath } = await res.json() as { storagePath: string };
        await fetch(`/api/portfolio/images/${imagePath}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
          body: JSON.stringify({ storagePath }),
        });
        fetchImages();
      }
    } finally {
      setUploadingFor(null);
      uploadTargetRef.current = null;
    }
  };

  const visibleImages = selectedCategory === "all"
    ? images
    : images.filter((img) => img.category === selectedCategory);

  if (loading) return <div className="flex items-center justify-center py-24 text-muted-foreground">Loading portfolio images…</div>;

  return (
    <div className="space-y-6">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => { const f = e.target.files?.[0]; if (f) handleUpload(f); e.target.value = ""; }}
      />

      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-2">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="bg-card border border-border rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          >
            {PORTFOLIO_CATEGORIES.map((c) => (
              <option key={c.value} value={c.value}>{c.label}</option>
            ))}
          </select>
          <span className="text-sm text-muted-foreground">{visibleImages.length} images</span>
        </div>
        <div className="flex gap-2 text-xs text-muted-foreground">
          <span className="flex items-center gap-1"><Eye className="w-3 h-3 text-green-400" /> Visible</span>
          <span className="flex items-center gap-1"><EyeOff className="w-3 h-3 text-red-400" /> Hidden from portfolio</span>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
        {visibleImages.map((img) => (
          <div
            key={img.imagePath}
            className={`relative bg-card border rounded-xl overflow-hidden group transition-all ${img.hidden ? "border-red-500/30 opacity-60" : "border-border"}`}
          >
            <div className="aspect-[3/4] relative">
              <img
                src={img.src}
                alt={img.imagePath}
                className="w-full h-full object-cover"
                loading="lazy"
              />
              {img.hidden && (
                <div className="absolute inset-0 bg-background/50 flex items-center justify-center">
                  <EyeOff className="w-6 h-6 text-red-400" />
                </div>
              )}
              {(saving === img.imagePath || uploadingFor === img.imagePath) && (
                <div className="absolute inset-0 bg-background/70 flex items-center justify-center">
                  <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                </div>
              )}
            </div>

            <div className="p-2 space-y-1">
              <p className="text-[10px] text-muted-foreground truncate">{img.imagePath}</p>
              {img.customTitle && <p className="text-[10px] text-foreground truncate">{img.customTitle}</p>}
              {img.caption && <p className="text-[10px] text-muted-foreground truncate italic">{img.caption}</p>}

              <div className="flex gap-1 pt-1">
                <button
                  onClick={() => toggleHidden(img)}
                  title={img.hidden ? "Show in portfolio" : "Hide from portfolio"}
                  className="flex-1 flex items-center justify-center py-1 rounded bg-secondary hover:bg-secondary/70 transition-colors"
                >
                  {img.hidden ? <Eye className="w-3 h-3 text-green-400" /> : <EyeOff className="w-3 h-3 text-red-400" />}
                </button>
                <button
                  onClick={() => {
                    setEditingPath(img.imagePath);
                    setEditValues({ customTitle: img.customTitle ?? "", caption: img.caption ?? "" });
                  }}
                  title="Edit caption"
                  className="flex-1 flex items-center justify-center py-1 rounded bg-secondary hover:bg-secondary/70 transition-colors"
                >
                  <ChevronDown className="w-3 h-3 text-muted-foreground" />
                </button>
                <button
                  onClick={() => { uploadTargetRef.current = img.imagePath; fileInputRef.current?.click(); }}
                  title="Replace image"
                  className="flex-1 flex items-center justify-center py-1 rounded bg-secondary hover:bg-secondary/70 transition-colors"
                >
                  <Upload className="w-3 h-3 text-primary" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {editingPath && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-6">
          <div className="bg-card border border-border rounded-2xl p-6 w-full max-w-sm space-y-4">
            <h3 className="font-semibold text-foreground">Edit Image Info</h3>
            <p className="text-xs text-muted-foreground font-mono">{editingPath}</p>
            <div className="space-y-3">
              <input
                type="text"
                placeholder="Custom title (optional)"
                value={editValues.customTitle}
                onChange={(e) => setEditValues((v) => ({ ...v, customTitle: e.target.value }))}
                className="w-full px-3 py-2 rounded-lg bg-secondary border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <textarea
                placeholder="Caption (optional)"
                value={editValues.caption}
                onChange={(e) => setEditValues((v) => ({ ...v, caption: e.target.value }))}
                rows={3}
                className="w-full px-3 py-2 rounded-lg bg-secondary border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary resize-none"
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setEditingPath(null)}
                className="flex-1 py-2 rounded-lg border border-border text-muted-foreground hover:text-foreground text-sm transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => saveCaption(editingPath)}
                className="flex-1 py-2 rounded-lg bg-primary text-white text-sm hover:bg-primary/90 transition-colors"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="bg-card border border-border rounded-xl p-4 text-sm text-muted-foreground">
        <p className="font-medium text-foreground mb-1">How image management works</p>
        <ul className="list-disc list-inside space-y-1 text-xs">
          <li><strong>Hide</strong> an image to remove it from the public portfolio without deleting it</li>
          <li><strong>Replace</strong> any image by uploading a new file — it's stored in cloud storage and persists after deployment</li>
          <li><strong>Caption</strong> lets you add searchable metadata and alt text for accessibility</li>
          <li>Changes take effect immediately on the portfolio page</li>
        </ul>
      </div>
    </div>
  );
}

function Dashboard({ token }: { token: string }) {
  const [activeTab, setActiveTab] = useState<Tab>("inquiries");

  return (
    <div className="min-h-screen bg-background text-foreground p-6 md:p-10">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold font-display text-foreground">
              ShotByLeza <span className="text-primary">Admin</span>
            </h1>
            <p className="text-muted-foreground mt-1">Manage your photography business</p>
          </div>
          <button
            onClick={() => { sessionStorage.removeItem(SESSION_KEY); window.location.reload(); }}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Sign out
          </button>
        </div>

        <div className="flex gap-1 border-b border-border mb-8">
          {(["inquiries", "analytics", "media"] as Tab[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2.5 text-sm font-medium capitalize rounded-t-lg transition-colors -mb-px ${
                activeTab === tab
                  ? "border border-b-background border-border bg-card text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab === "inquiries" ? "Inquiries" : tab === "analytics" ? "Analytics & SEO" : "Media Manager"}
            </button>
          ))}
        </div>

        {activeTab === "inquiries" && <InquiriesTab />}
        {activeTab === "analytics" && <AnalyticsTab />}
        {activeTab === "media" && <MediaTab token={token} />}
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

  return <Dashboard token={token} />;
}
