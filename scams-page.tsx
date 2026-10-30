// Project: ScamCheck NG | Developer: Qunbuliy
import { useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronDown } from "lucide-react";

interface Scam {
  title: string;
  spot: string;
  action: string;
}

const SCAMS: Scam[] = [
  {
    title: "Fake POS alerts",
    spot: "A POS operator shows a fake debit alert or claims a transfer failed after you leave.",
    action: "Always confirm the credit alert on your own bank app before handing over cash.",
  },
  {
    title: "Wrong-transfer refund scams",
    spot: "Someone calls claiming they sent you money by mistake and asks you to refund it.",
    action: "Check your bank app. If no money arrived, do not send anything. Report the number.",
  },
  {
    title: "Fake job offers",
    spot: "A recruiter asks for a registration, training, or CV fee before you are hired.",
    action: "Legitimate employers never charge you to get a job. Walk away and report them.",
  },
  {
    title: "Ponzi schemes",
    spot: "Promises of very high returns in a short time, with pressure to recruit others.",
    action: "If returns sound too good to be true, they are. Report to the EFCC.",
  },
  {
    title: "Fake online vendors",
    spot: "A seller collects payment on social media then blocks you or never delivers.",
    action: "Buy from verified vendors, use escrow, and keep all chat receipts.",
  },
  {
    title: "Fake loan apps",
    spot: "An app charges hidden fees, harvests your contacts, and threatens you.",
    action: "Only use CBN-licensed lenders. Report threatening apps to the authorities.",
  },
  {
    title: "Romance scams",
    spot: "An online partner quickly asks for money, airtime, or gift cards.",
    action: "Never send money to someone you have not met. Report and block them.",
  },
  {
    title: "Bank impersonation",
    spot: "A caller claims to be your bank and asks for your OTP, PIN, or card details.",
    action: "Your bank will never ask for your OTP or PIN. Hang up and call your bank directly.",
  },
];

export function ScamsPage() {
  const [q, setQ] = useState("");
  const [open, setOpen] = useState<string | null>(null);

  const filtered = useMemo(
    () =>
      SCAMS.filter(
        (s) =>
          s.title.toLowerCase().includes(q.toLowerCase()) ||
          s.spot.toLowerCase().includes(q.toLowerCase())
      ),
    [q]
  );

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="font-serif text-3xl font-bold text-slate-900">Common scams in Nigeria</h1>
      <p className="mt-2 text-sm text-slate-500">
        Search the scams below to learn how to spot them and what to do.
      </p>
      <Input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search scams…"
        className="mt-6"
      />
      <div className="mt-6 space-y-3">
        {filtered.map((s) => (
          <Card key={s.title} className="border-emerald-900/10 shadow-sm">
            <button
              onClick={() => setOpen(open === s.title ? null : s.title)}
              className="flex w-full items-center justify-between p-5 text-left"
            >
              <span className="font-semibold text-slate-900">{s.title}</span>
              <ChevronDown
                className={`h-5 w-5 text-emerald-600 transition ${open === s.title ? "rotate-180" : ""}`}
              />
            </button>
            {open === s.title && (
              <CardContent className="space-y-3 border-t border-slate-100 p-5 pt-4 text-sm">
                <div>
                  <p className="font-medium text-emerald-700">How to spot it</p>
                  <p className="mt-1 text-slate-600">{s.spot}</p>
                </div>
                <div>
                  <p className="font-medium text-emerald-700">What to do</p>
                  <p className="mt-1 text-slate-600">{s.action}</p>
                </div>
              </CardContent>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}