"use client";
import Link from "next/link";
import { useState } from "react";
import { ArrowRight, LockKeyhole, UsersRound } from "lucide-react";
import { createClient } from "@/lib/supabase-browser";
export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault(); setLoading(true); setMessage("");
    const data = new FormData(event.currentTarget);
    const client = createClient();
    const result = client ? await client.auth.signInWithPassword({ email: String(data.get("email")), password: String(data.get("password")) }) : { error: null };
    setMessage(result.error?.message ?? (client ? "Signed in. Your dashboard is ready." : "Demo mode: add Supabase environment variables to enable sign in."));
    setLoading(false);
  }
  return <AuthShell title="Welcome back" subtitle="Pick up where you left off."><form onSubmit={submit} className="space-y-4"><Field name="email" label="Email address" type="email" placeholder="you@college.edu" /><Field name="password" label="Password" type="password" placeholder="••••••••" /><button disabled={loading} className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-3.5 font-semibold text-white hover:bg-blue-700 disabled:opacity-60">{loading ? "Signing in..." : "Sign in"} <ArrowRight size={17} /></button>{message && <p className="text-sm text-slate-600">{message}</p>}</form><p className="mt-6 text-center text-sm text-slate-500">New to CampusCollab? <Link href="/signup" className="font-semibold text-blue-600">Create an account</Link></p></AuthShell>;
}
export function AuthShell({ title, subtitle, children }: { title: string; subtitle: string; children: React.ReactNode }) { return <main className="flex min-h-[calc(100vh-160px)] items-center justify-center px-6 py-12"><div className="w-full max-w-md"><div className="mb-8 text-center"><div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600 text-white"><UsersRound size={23} /></div><h1 className="mt-5 text-2xl font-semibold text-slate-950">{title}</h1><p className="mt-2 text-sm text-slate-500">{subtitle}</p></div><div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">{children}<div className="mt-6 flex items-start gap-2 rounded-xl bg-slate-50 p-3 text-xs leading-5 text-slate-500"><LockKeyhole size={15} className="mt-0.5 shrink-0 text-blue-600" /> Your email is private and is never shown on public profiles.</div></div></div></main>; }
function Field({ name, label, type, placeholder }: { name: string; label: string; type: string; placeholder: string }) { return <label className="block text-sm font-medium text-slate-700">{label}<input name={name} required type={type} placeholder={placeholder} className="mt-2 w-full rounded-xl border border-slate-200 px-3.5 py-3 outline-none ring-blue-500 focus:ring-2" /></label>; }
