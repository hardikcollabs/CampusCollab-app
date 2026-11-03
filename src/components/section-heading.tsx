export function SectionHeading({ eyebrow, title, description }: { eyebrow?: string; title: string; description?: string }) {
  return <div><p className="text-sm font-semibold uppercase tracking-widest text-blue-600">{eyebrow ?? "CampusCollab"}</p><h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">{title}</h1>{description && <p className="mt-3 max-w-2xl text-base leading-7 text-slate-600">{description}</p>}</div>;
}
