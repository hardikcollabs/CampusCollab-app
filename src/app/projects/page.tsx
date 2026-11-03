"use client";
import { useMemo, useState } from "react";
import Link from "next/link";
import { Search, SlidersHorizontal, Sparkles } from "lucide-react";
import { demoProjects } from "@/lib/demo-data";
import { ProjectCard } from "@/components/project-card";
import { SectionHeading } from "@/components/section-heading";

export default function ProjectsPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All categories");
  const projects = useMemo(() => demoProjects.filter((project) => (category === "All categories" || project.category === category) && `${project.title} ${project.description} ${project.skills.join(" ")}`.toLowerCase().includes(query.toLowerCase())), [query, category]);
  return <main className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
    <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end"><SectionHeading eyebrow="Discover your next challenge" title="Explore projects" description="Find open opportunities from students across campus. Filter by what you want to learn and how you want to contribute." /><Link href="/projects/new" className="shrink-0 rounded-xl bg-blue-600 px-4 py-3 text-center text-sm font-semibold text-white hover:bg-blue-700">+ Post a project</Link></div>
    <div className="mt-10 flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-3 shadow-sm sm:flex-row"><label className="relative flex-1"><Search className="absolute left-3 top-3 text-slate-400" size={18} /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search project titles, skills, or keywords" className="w-full rounded-xl bg-slate-50 py-2.5 pl-10 pr-3 text-sm outline-none ring-blue-500 focus:ring-2" /></label><label className="flex items-center gap-2 rounded-xl bg-slate-50 px-3 text-sm text-slate-600"><SlidersHorizontal size={16} /><select value={category} onChange={(e) => setCategory(e.target.value)} className="bg-transparent py-2.5 outline-none"><option>All categories</option><option>Academic</option><option>Hackathon</option><option>Startup</option><option>Competition</option></select></label></div>
    <div className="mt-8 flex items-center justify-between"><p className="text-sm text-slate-500">{projects.length} projects found</p><p className="inline-flex items-center gap-1.5 text-xs text-slate-500"><Sparkles size={14} className="text-blue-500" /> Safe, student-led opportunities</p></div>
    {projects.length ? <div className="mt-4 grid gap-5 md:grid-cols-2 lg:grid-cols-3">{projects.map((project) => <ProjectCard key={project.id} project={project} />)}</div> : <div className="mt-6 rounded-2xl border border-dashed border-slate-300 p-12 text-center"><h2 className="font-semibold text-slate-900">No projects match that search</h2><p className="mt-2 text-sm text-slate-500">Try another keyword or clear your filters.</p></div>}
  </main>;
}
