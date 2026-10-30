// Project: ScamCheck NG | Developer: Qunbuliy
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";

export function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  function submit() {
    if (!name.trim() || !email.trim() || !subject.trim() || message.trim().length < 10) {
      setError("Please fill every field. Message must be at least 10 characters.");
      return;
    }
    setError("");
    setSent(true);
  }

  if (sent) {
    return (
      <div className="mx-auto max-w-xl px-4 py-16 text-center">
        <Card className="border-emerald-900/10 shadow-md">
          <CardContent className="p-8">
            <CheckCircle2 className="mx-auto h-14 w-14 text-emerald-600" />
            <h1 className="mt-4 font-serif text-2xl font-bold text-slate-900">Message sent</h1>
            <p className="mt-2 text-sm text-slate-500">
              Thanks for reaching out. We will review your message.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-xl px-4 py-10">
      <h1 className="font-serif text-3xl font-bold text-slate-900">Contact us</h1>
      <p className="mt-2 text-sm text-slate-500">Send feedback, report a bug, or suggest a feature.</p>
      <Card className="mt-6 border-emerald-900/10 shadow-sm">
        <CardContent className="space-y-4 p-6">
          <div>
            <Label>Name</Label>
            <Input value={name} onChange={(e) => setName(e.target.value)} className="mt-1" />
          </div>
          <div>
            <Label>Email</Label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1"
            />
          </div>
          <div>
            <Label>Subject</Label>
            <Input value={subject} onChange={(e) => setSubject(e.target.value)} className="mt-1" />
          </div>
          <div>
            <Label>Message</Label>
            <Textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={6}
              className="mt-1"
            />
          </div>
          {error && <p className="text-sm font-medium text-rose-600">{error}</p>}
          <Button onClick={submit} className="w-full bg-emerald-700 hover:bg-emerald-800">
            Send message
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}