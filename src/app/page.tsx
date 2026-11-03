import Link from "next/link";
import { ArrowRight, CheckCircle2, GraduationCap, KanbanSquare, Users } from "lucide-react";

const features = [
  {
    icon: Users,
    title: "Find teammates",
    text: "Discover motivated students with the skills and availability your next idea needs.",
  },
  {
    icon: KanbanSquare,
    title: "Manage projects",
    text: "Keep project details, join requests, teammates, and tasks in one calm workspace.",
  },
  {
    icon: GraduationCap,
    title: "Build your portfolio",
    text: "Turn class projects, hackathons, and startup ideas into a visible record of your work.",
  },
];

export default function Home() {
  return (
    <main>
      <section className="relative overflow-hidden bg-slate-950 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(59,130,246,0.28),_transparent_44%),radial-gradient(circle_at_bottom_left,_rgba(99,102,241,0.2),_transparent_40%)]" />
        <div className="relative mx-auto max-w-7xl px-6 pb-24 pt-16 lg:px-8 lg:pb-32 lg:pt-24">
          <div className="max-w-3xl">
            <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-blue-400/30 bg-blue-400/10 px-4 py-2 text-sm text-blue-200">
              <span className="h-2 w-2 rounded-full bg-blue-300" />
              Made for ambitious students
            </div>
            <h1 className="text-5xl font-semibold tracking-tight sm:text-6xl lg:text-7xl">
              Find your team.
              <span className="block text-blue-300">Build your future.</span>
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-300">
              CampusCollab helps college students find reliable teammates for academic projects, hackathons, competitions, and startup ideas.
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Link href="/projects" className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-500 px-5 py-3.5 font-semibold text-white transition hover:bg-blue-400">
                Explore Projects <ArrowRight size={18} />
              </Link>
              <Link href="/projects/new" className="inline-flex items-center justify-center rounded-xl border border-white/20 px-5 py-3.5 font-semibold text-white transition hover:bg-white/10">
                Create a Project
              </Link>
            </div>
          </div>
          <div className="mt-16 grid max-w-3xl grid-cols-3 gap-3 sm:gap-8">
            {["1,240+ students", "380 projects", "62 colleges"].map((item) => (
              <div key={item} className="border-l border-white/15 pl-3 sm:pl-5">
                <p className="text-sm text-slate-400">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-blue-600">One place to collaborate</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">Your next great project starts with the right people.</h2>
        </div>
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {features.map(({ icon: Icon, title, text }) => (
            <article key={title} className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600"><Icon size={22} /></div>
              <h3 className="mt-6 text-lg font-semibold text-slate-950">{title}</h3>
              <p className="mt-2 leading-7 text-slate-600">{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto mb-20 max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-8 rounded-3xl bg-blue-600 px-7 py-10 text-white sm:flex-row sm:items-center sm:px-12">
          <div>
            <h2 className="text-2xl font-semibold">Build with people who get it.</h2>
            <p className="mt-2 text-blue-100">Safe by default, portfolio-friendly, and free for students.</p>
          </div>
          <Link href="/signup" className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 font-semibold text-blue-700 hover:bg-blue-50">
            Join CampusCollab <CheckCircle2 size={18} />
          </Link>
        </div>
      </section>
    </main>
  );
}
