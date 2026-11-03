import Link from "next/link";
import { CalendarDays, Clock3, Flag, MapPin, Users } from "lucide-react";
import type { Project } from "@/lib/types";

export function ProjectCard({ project }: { project: Project }) {
  return <article className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md">
    <div className="flex items-start justify-between gap-3"><span className="rounded-full bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-700">{project.category}</span><button aria-label={`Report ${project.title}`} className="text-slate-400 hover:text-red-500"><Flag size={16} /></button></div>
    <h3 className="mt-4 text-lg font-semibold text-slate-950">{project.title}</h3>
    <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-600">{project.description}</p>
    <div className="mt-4 flex flex-wrap gap-1.5">{project.skills.map((skill) => <span key={skill} className="rounded-md bg-slate-100 px-2 py-1 text-xs text-slate-600">{skill}</span>)}</div>
    <div className="mt-5 space-y-2 border-t border-slate-100 pt-4 text-xs text-slate-500"><p className="flex items-center gap-2"><Users size={14} /> {project.members}/{project.members + project.needed} teammates <span className={`ml-auto font-medium ${project.status === "Open" ? "text-emerald-600" : "text-slate-500"}`}>{project.status}</span></p><p className="flex items-center gap-2"><CalendarDays size={14} /> Due {project.deadline}</p><p className="flex items-center gap-2"><Clock3 size={14} /> {project.commitment}</p><p className="flex items-center gap-2"><MapPin size={14} /> {project.college}</p></div>
    <div className="mt-auto flex items-center justify-between pt-5"><span className="text-sm text-slate-500">by <span className="font-medium text-slate-700">{project.owner}</span></span><Link href={`/projects/${project.id}`} className="text-sm font-semibold text-blue-600 hover:text-blue-700">View project →</Link></div>
  </article>;
}
