import { useState } from "react";
import { useListInquiries, useUpdateInquiryStatus, getListInquiriesQueryKey } from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";

// @ts-ignore
type InquiryStatus = "new" | "replied" | "booked";

const STATUS_COLORS: Record<string, string> = {
  new: "bg-blue-500/20 text-blue-300 border-blue-500/30",
  replied: "bg-yellow-500/20 text-yellow-300 border-yellow-500/30",
  booked: "bg-green-500/20 text-green-300 border-green-500/30",
};

export default function Admin() {
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
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold font-display text-foreground">
            ShotByLeza <span className="text-primary">Inquiries</span>
          </h1>
          <p className="text-muted-foreground mt-1">All contact form submissions</p>
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
                {/* Row */}
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
                        day: "numeric", month: "short", year: "numeric"
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

                {/* Expanded detail */}
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
