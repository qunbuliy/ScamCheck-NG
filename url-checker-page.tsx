// Project: ScamCheck NG | Developer: Qunbuliy
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { ShieldAlert, ShieldCheck } from "lucide-react";

interface Finding {
  reason: string;
  weight: number;
}

const SUSPICIOUS_KEYWORDS = [
  "login",
  "verify",
  "secure",
  "update",
  "account",
  "bank",
  "win",
  "prize",
  "bonus",
];

const BANK_NAMES = ["gtbank", "accessbank", "zenith", "uba", "firstbank", "opay", "palmpay", "kuda"];

export function UrlCheckerPage() {
  const [url, setUrl] = useState("");
  const [findings, setFindings] = useState<Finding[] | null>(null);

  function check() {
    const raw = url.trim();
    const found: Finding[] = [];
    let host = "";
    let isIp = false;

    try {
      const withProto = raw.startsWith("http") ? raw : `http://${raw}`;
      const parsed = new URL(withProto);
      host = parsed.hostname;
      isIp = /^\d{1,3}(\.\d{1,3}){3}$/.test(host);
      if (parsed.protocol !== "https:") {
        found.push({ reason: "The link does not use HTTPS (not secure).", weight: 25 });
      }
    } catch {
      found.push({ reason: "This does not look like a valid URL.", weight: 40 });
    }

    if (isIp) {
      found.push({ reason: "The link uses a raw IP address instead of a domain name.", weight: 30 });
    }

    const hyphens = (host.match(/-/g) || []).length;
    if (hyphens >= 3) {
      found.push({ reason: "The domain has many hyphens, a common trick.", weight: 15 });
    }

    const lower = raw.toLowerCase();
    SUSPICIOUS_KEYWORDS.forEach((kw) => {
      if (lower.includes(kw)) {
        found.push({ reason: `Contains the suspicious keyword "${kw}".`, weight: 10 });
      }
    });

    BANK_NAMES.forEach((bank) => {
      if (lower.includes(bank) && !host.endsWith(`${bank}.com`) && !host.endsWith(`${bank}.ng`)) {
        found.push({ reason: `Mentions "${bank}" but is not its official domain.`, weight: 20 });
      }
    });

    setFindings(found);
  }

  const score = findings ? Math.min(100, findings.reduce((sum, f) => sum + f.weight, 0)) : 0;
  const safe = score < 30;

  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      <h1 className="font-serif text-3xl font-bold text-slate-900">URL safety checker</h1>
      <p className="mt-2 text-sm text-slate-500">
        Paste a link to scan it for common red flags. This is a heuristic check, not a guarantee.
      </p>
      <div className="mt-6 flex gap-2">
        <Input
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://example.com"
          onKeyDown={(e) => e.key === "Enter" && check()}
        />
        <Button onClick={check} className="bg-emerald-700 hover:bg-emerald-800">
          Check
        </Button>
      </div>

      {findings && (
        <Card className="mt-6 border-emerald-900/10 shadow-sm">
          <CardContent className="p-6">
            <div
              className={`flex items-center gap-3 rounded-xl p-4 ${
                safe ? "bg-emerald-50 text-emerald-800" : "bg-rose-50 text-rose-800"
              }`}
            >
              {safe ? <ShieldCheck className="h-6 w-6" /> : <ShieldAlert className="h-6 w-6" />}
              <div>
                <p className="font-semibold">Risk score: {score}/100</p>
                <p className="text-sm">
                  {safe ? "Few red flags found." : "Multiple red flags found."}
                </p>
              </div>
            </div>
            {findings.length > 0 ? (
              <ul className="mt-4 space-y-2 text-sm text-slate-600">
                {findings.map((f, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="text-rose-500">•</span> {f.reason}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-4 text-sm text-slate-500">No obvious red flags detected.</p>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}