import Link from 'next/link'
import { ArrowUpRight, Home, Compass } from 'lucide-react'

export default function NotFound() {
  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden bg-brand-ink pt-[var(--nav-h)]">
      <div className="absolute inset-0 bg-gradient-to-br from-[#1C1210] via-[#2A0F0D] to-[#5C1212]" />
      <div className="absolute inset-0 bg-grid opacity-50" />
      <div className="absolute -left-24 top-1/4 h-96 w-96 rounded-full bg-primary/25 blur-[120px] animate-float" />

      <div className="relative mx-auto max-w-content px-6 py-24 text-center">
        <p className="animate-fade-up font-heading text-[8rem] font-black leading-none text-white/10 md:text-[12rem]">
          404
        </p>
        <h1 className="animate-fade-up anim-delay-100 -mt-8 font-heading text-3xl font-black text-white md:-mt-14 md:text-5xl">
          Page not found
        </h1>
        <p className="animate-fade-up anim-delay-200 mx-auto mt-5 max-w-md text-gray-400">
          The page you&apos;re after has moved or never existed. Let&apos;s get you back on solid ground.
        </p>
        <div className="animate-fade-up anim-delay-300 mt-10 flex flex-col justify-center gap-3 sm:flex-row">
          <Link href="/" className="btn-primary px-8 py-4 text-base">
            <Home size={17} /> Back to Home
          </Link>
          <Link href="/projects" className="btn-ghost-light px-8 py-4 text-base">
            <Compass size={17} /> Browse Projects <ArrowUpRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  )
}
