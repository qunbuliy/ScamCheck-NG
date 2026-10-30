// Project: ScamCheck NG | Developer: Qunbuliy
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, XCircle } from "lucide-react";

interface Question {
  scenario: string;
  isScam: boolean;
  explanation: string;
}

const QUESTIONS: Question[] = [
  { scenario: "A POS operator says your transfer failed and asks you to pay cash instead.", isScam: true, explanation: "Always confirm the credit alert on your own bank app first." },
  { scenario: "Your bank calls and asks you to read out your OTP to verify your account.", isScam: true, explanation: "Banks never ask for your OTP or PIN." },
  { scenario: "A recruiter asks for a ₦5,000 registration fee before an interview.", isScam: true, explanation: "Legitimate employers never charge you for a job." },
  { scenario: "A friend sends you money and you see the credit alert in your bank app.", isScam: false, explanation: "A real credit alert in your own app is normal." },
  { scenario: "An investment promises 50% returns in one week.", isScam: true, explanation: "Returns that high in that time are a classic Ponzi sign." },
  { scenario: "An online seller asks you to pay outside the platform to avoid fees.", isScam: true, explanation: "Off-platform payments remove your buyer protection." },
  { scenario: "A loan app asks for your BVN and contacts before disbursing.", isScam: true, explanation: "Predatory loan apps harvest contacts to threaten you." },
  { scenario: "A stranger on a dating app asks for airtime after two days.", isScam: true, explanation: "Early money requests are a romance scam red flag." },
  { scenario: "You receive a text saying you won a lottery and must pay a release fee.", isScam: true, explanation: "Real lotteries never ask winners to pay to receive winnings." },
  { scenario: "A vendor sends a receipt and you confirm the goods arrived.", isScam: false, explanation: "A completed, verified transaction is normal." },
];

export function QuizPage() {
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState<null | boolean>(null);
  const [done, setDone] = useState(false);
  const [best, setBest] = useState(0);

  useEffect(() => {
    const stored = Number(localStorage.getItem("scamcheck_best") || "0");
    setBest(stored);
  }, []);

  function answer(choice: boolean) {
    if (answered !== null) return;
    const correct = choice === QUESTIONS[index].isScam;
    setAnswered(correct);
    if (correct) setScore((s) => s + 1);
  }

  function next() {
    if (index + 1 >= QUESTIONS.length) {
      const finalScore = score;
      if (finalScore > best) {
        localStorage.setItem("scamcheck_best", String(finalScore));
        setBest(finalScore);
      }
      setDone(true);
      return;
    }
    setIndex((i) => i + 1);
    setAnswered(null);
  }

  function restart() {
    setIndex(0);
    setScore(0);
    setAnswered(null);
    setDone(false);
  }

  if (done) {
    return (
      <div className="mx-auto max-w-xl px-4 py-16 text-center">
        <Card className="border-emerald-900/10 shadow-md">
          <CardContent className="p-8">
            <h1 className="font-serif text-3xl font-bold text-slate-900">Quiz complete</h1>
            <p className="mt-4 text-5xl font-bold text-emerald-700">{score}/10</p>
            <p className="mt-2 text-sm text-slate-500">Best score: {best}/10</p>
            <div className="mt-6 flex justify-center gap-3">
              <Button onClick={restart} className="bg-emerald-700 hover:bg-emerald-800">
                Play again
              </Button>
              <Button
                variant="outline"
                onClick={() =>
                  navigator.clipboard.writeText(
                    `I scored ${score}/10 on the ScamCheck NG "Spot the Scam" quiz!`
                  )
                }
              >
                Share result
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const q = QUESTIONS[index];

  return (
    <div className="mx-auto max-w-xl px-4 py-10">
      <div className="flex items-center justify-between">
        <h1 className="font-serif text-2xl font-bold text-slate-900">Spot the Scam</h1>
        <span className="text-sm text-slate-500">
          {index + 1} / {QUESTIONS.length}
        </span>
      </div>
      <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-emerald-100">
        <div
          className="h-full rounded-full bg-emerald-600 transition-all"
          style={{ width: `${((index + 1) / QUESTIONS.length) * 100}%` }}
        />
      </div>

      <Card className="mt-6 border-emerald-900/10 shadow-sm">
        <CardContent className="p-6">
          <p className="text-lg font-medium text-slate-800">{q.scenario}</p>
          <div className="mt-6 flex gap-3">
            <Button
              onClick={() => answer(true)}
              disabled={answered !== null}
              className="flex-1 bg-rose-600 hover:bg-rose-700"
            >
              Scam
            </Button>
            <Button
              onClick={() => answer(false)}
              disabled={answered !== null}
              className="flex-1 bg-emerald-600 hover:bg-emerald-700"
            >
              Not a scam
            </Button>
          </div>

          {answered !== null && (
            <div
              className={`mt-5 flex items-start gap-2 rounded-xl p-4 text-sm ${
                answered ? "bg-emerald-50 text-emerald-800" : "bg-rose-50 text-rose-800"
              }`}
            >
              {answered ? (
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
              ) : (
                <XCircle className="mt-0.5 h-4 w-4 shrink-0" />
              )}
              <span>{q.explanation}</span>
            </div>
          )}

          {answered !== null && (
            <Button onClick={next} className="mt-5 w-full bg-emerald-700 hover:bg-emerald-800">
              {index + 1 >= QUESTIONS.length ? "See results" : "Next question"}
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
}