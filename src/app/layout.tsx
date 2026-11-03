import type { Metadata } from "next";
import Link from "next/link";
import { LogIn, Menu, Plus, UsersRound } from "lucide-react";
import "./globals.css";

export const metadata: Metadata = {
  title: "CampusCollab — Find your team. Build your future.",
  description: "A safer, simpler way for students to find reliable teammates.",
};

function Header() {
  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2 font-semibold text-slate-950">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-white"><UsersRound size={19} /></span>
          Campus<span className="text-blue-600">Collab</span>
        </Link>
        <nav className="hidden items-center gap-7 text-sm font-medium text-slate-600 md:flex">
          <Link href="/projects" className="hover:text-blue-600">Explore projects</Link>
          <Link href="/dashboard" className="hover:text-blue-600">Dashboard</Link>
          <Link href="/profile" className="hover:text-blue-600">My profile</Link>
        </nav>
        <div className="flex items-center gap-2">
          <Link href="/login" className="hidden items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50 sm:flex"><LogIn size={16} /> Log in</Link>
          <Link href="/projects/new" className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-3.5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"><Plus size={16} /> <span className="hidden sm:inline">Create project</span></Link>
          <Menu className="ml-1 text-slate-500 md:hidden" size={21} />
        </div>
      </div>
    </header>
  );
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body><Header />{children}<footer className="border-t border-slate-200 bg-white"><div className="mx-auto flex max-w-7xl flex-col gap-3 px-6 py-8 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between lg:px-8"><p>© 2025 CampusCollab. Built for student builders.</p><div className="flex flex-wrap gap-5"><Link href="/privacy" className="hover:text-blue-600">Privacy Policy</Link><Link href="/terms" className="hover:text-blue-600">Terms of Use</Link><Link href="/guidelines" className="hover:text-blue-600">Community guidelines</Link><Link href="/settings/privacy" className="hover:text-blue-600">Privacy Centre</Link><Link href="/contributing" className="hover:text-blue-600">Contributing</Link></div></div></footer></body></html>;
}
