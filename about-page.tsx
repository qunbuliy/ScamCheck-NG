// Project: ScamCheck NG | Developer: Qunbuliy
import { Card, CardContent } from "@/components/ui/card";
import { ShieldCheck, User } from "lucide-react";

export function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="font-serif text-3xl font-bold text-slate-900">About ScamCheck NG</h1>
      <p className="mt-3 text-slate-600">
        ScamCheck NG is a community-powered platform that helps Nigerians check phone numbers,
        accounts, websites, and handles before they pay. Reports are submitted by users and
        reviewed before appearing publicly.
      </p>

      <Card className="mt-8 border-emerald-900/10 shadow-sm">
        <CardContent className="flex gap-4 p-6">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
            <User className="h-6 w-6" />
          </div>
          <div>
            <h2 className="font-semibold text-slate-900">About the developer</h2>
            <p className="mt-1 text-sm text-slate-600">
              ScamCheck NG was designed and developed by{" "}
              <strong className="text-emerald-700">Qunbuliy</strong>, a developer focused on
              practical tools that protect everyday people from fraud.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card className="mt-6 border-emerald-900/10 shadow-sm">
        <CardContent className="flex gap-4 p-6">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-700">
            <ShieldCheck className="h-6 w-6" />
          </div>
          <div>
            <h2 className="font-semibold text-slate-900">Important disclaimer</h2>
            <p className="mt-1 text-sm text-slate-600">
              Reports are submitted by users and are not independently verified. Do not treat them
              as proof of guilt.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}