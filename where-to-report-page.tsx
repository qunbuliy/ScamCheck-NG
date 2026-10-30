// Project: ScamCheck NG | Developer: Qunbuliy
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

const STEPS = [
  { title: "Contact your bank immediately", body: "Ask them to freeze or reverse the transaction and flag the receiving account." },
  { title: "Keep all evidence", body: "Save screenshots, receipts, chat logs, and transaction references." },
  { title: "Report to the EFCC", body: "Use their official website to file a complaint." },
  { title: "Report to the Nigeria Police Force", body: "Visit your nearest station or their official online portal." },
  { title: "Contact the CBN Consumer Protection unit", body: "Use their official website to report the incident." },
  { title: "Warn others", body: "Submit a report here so the community can check before they pay." },
];

const LINKS = [
  { label: "EFCC official site", url: "https://www.efcc.gov.ng" },
  { label: "Nigeria Police Force", url: "https://www.npf.gov.ng" },
  { label: "Central Bank of Nigeria", url: "https://www.cbn.gov.ng" },
];

export function WhereToReportPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="font-serif text-3xl font-bold text-slate-900">Where to report a scam</h1>
      <p className="mt-2 text-sm text-slate-500">
        If you have been scammed, act quickly. Follow these steps in order.
      </p>
      <div className="mt-6 space-y-3">
        {STEPS.map((s, i) => (
          <Card key={s.title} className="border-emerald-900/10 shadow-sm">
            <CardContent className="flex gap-4 p-5">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-100 font-bold text-emerald-700">
                {i + 1}
              </div>
              <div>
                <p className="font-semibold text-slate-900">{s.title}</p>
                <p className="mt-1 text-sm text-slate-600">{s.body}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <p className="mt-6 rounded-xl bg-amber-50 p-4 text-sm text-amber-800">
        Always verify official contact details on the agency's own website. We do not list phone
        numbers here because they can change.
      </p>
      <div className="mt-6 flex flex-wrap gap-3">
        {LINKS.map((l) => (
          <a key={l.url} href={l.url} target="_blank" rel="noopener noreferrer">
            <Button variant="outline">
              {l.label} <ExternalLink className="ml-1 h-3.5 w-3.5" />
            </Button>
          </a>
        ))}
      </div>
    </div>
  );
}