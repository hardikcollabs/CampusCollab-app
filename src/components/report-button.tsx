"use client";
import { useState } from "react";
import { Flag } from "lucide-react";
export function ReportButton() { const [reported, setReported] = useState(false); return reported ? <p className="mt-4 rounded-lg bg-emerald-50 p-3 text-sm text-emerald-700">Report received. A moderator will review it.</p> : <button onClick={() => setReported(true)} className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-600 hover:bg-slate-50"><Flag size={15} /> Report project</button>; }
