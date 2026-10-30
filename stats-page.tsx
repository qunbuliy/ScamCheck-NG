// Project: ScamCheck NG | Developer: Qunbuliy
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { getReports, CATEGORIES } from "@/lib/store";

export function StatsPage() {
  const [total, setTotal] = useState(0);
  const [byCategory, setByCategory] = useState<Array<{ label: string; count: number }>>([]);
  const [byState, setByState] = useState<Array<{ label: string; count: number }>>([]);

  useEffect(() => {
    const approved = getReports().filter((r) => r.status === "approved");
    setTotal(approved.length);

    const catMap = new Map<string, number>();
    approved.forEach((r) => catMap.set(r.category, (catMap.get(r.category) || 0) + 1));
    setByCategory(
      Array.from(catMap.entries())
        .map(([value, count]) => ({
          label: CATEGORIES.find((c) => c.value === value)?.label ?? value,
          count,
        }))
        .sort((a, b) => b.count - a.count)
    );

    const stateMap = new Map<string, number>();
    approved.forEach((r) => {
      if (r.state) stateMap.set(r.state, (stateMap.get(r.state) || 0) + 1);
    });
    setByState(
      Array.from(stateMap.entries())
        .map(([label, count]) => ({ label, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 8)
    );
  }, []);

  const maxCat = Math.max(1, ...byCategory.map((c) => c.count));
  const maxState = Math.max(1, ...byState.map((s) => s.count));

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <h1 className="font-serif text-3xl font-bold text-slate-900">Scam statistics</h1>
      <p className="mt-2 text-sm text-slate-500">
        Reports are submitted by users and are not independently verified. Do not treat them as
        proof of guilt.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        <Card className="border-emerald-900/10 bg-emerald-900 text-white shadow-sm">
          <CardContent className="p-6">
            <p className="text-4xl font-bold text-emerald-300">{total}</p>
            <p className="mt-1 text-sm text-emerald-100/80">Approved reports</p>
          </CardContent>
        </Card>
        <Card className="border-emerald-900/10 shadow-sm">
          <CardContent className="p-6">
            <p className="text-4xl font-bold text-emerald-700">{byCategory.length}</p>
            <p className="mt-1 text-sm text-slate-500">Categories</p>
          </CardContent>
        </Card>
        <Card className="border-emerald-900/10 shadow-sm">
          <CardContent className="p-6">
            <p className="text-4xl font-bold text-emerald-700">{byState.length}</p>
            <p className="mt-1 text-sm text-slate-500">States covered</p>
          </CardContent>
        </Card>
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <Card className="border-emerald-900/10 shadow-sm">
          <CardContent className="p-6">
            <h3 className="font-semibold text-slate-900">By category</h3>
            <div className="mt-4 space-y-3">
              {byCategory.map((c) => (
                <div key={c.label}>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">{c.label}</span>
                    <span className="font-medium text-slate-800">{c.count}</span>
                  </div>
                  <div className="mt-1 h-2 w-full overflow-hidden rounded-full bg-slate-100">
                    <div
                      className="h-full rounded-full bg-emerald-500 transition-all"
                      style={{ width: `${(c.count / maxCat) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-emerald-900/10 shadow-sm">
          <CardContent className="p-6">
            <h3 className="font-semibold text-slate-900">Top states</h3>
            <div className="mt-4 space-y-3">
              {byState.map((s) => (
                <div key={s.label}>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">{s.label}</span>
                    <span className="font-medium text-slate-800">{s.count}</span>
                  </div>
                  <div className="mt-1 h-2 w-full overflow-hidden rounded-full bg-slate-100">
                    <div
                      className="h-full rounded-full bg-teal-500 transition-all"
                      style={{ width: `${(s.count / maxState) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}