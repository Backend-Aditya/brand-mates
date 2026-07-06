import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { workProjects, getWorkProject } from "@/lib/work";
import Footer from "@/components/Footer";
import FooterReveal from "@/components/FooterReveal";

export async function generateStaticParams() {
  return workProjects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getWorkProject(slug);
  if (!project) return {};
  return {
    title: `${project.client} - BrandMates`,
    description: project.tagline,
    openGraph: {
      title: `${project.client} Case Study - BrandMates`,
      description: project.tagline,
      url: `https://brandmates.au/work/${slug}`,
      siteName: "BrandMates",
      locale: "en_AU",
      type: "article",
    },
    twitter: { card: "summary_large_image", title: `${project.client} - BrandMates` },
    alternates: { canonical: `https://brandmates.au/work/${slug}` },
  };
}

const ArrowRight = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ArrowLeft = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M13 8H3M3 8L7 4M3 8L7 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default async function WorkCaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getWorkProject(slug);
  if (!project) notFound();

  const currentIndex = workProjects.findIndex((p) => p.slug === slug);
  const prevProject = currentIndex > 0 ? workProjects[currentIndex - 1] : null;
  const nextProject = currentIndex < workProjects.length - 1 ? workProjects[currentIndex + 1] : null;

  return (
    <>
      {/* HERO */}
      <section className="relative w-full pt-36 md:pt-44 pb-20 overflow-hidden">
        <div className="px-6 sm:px-10 md:px-16 max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-10">
            <Link href="/work" className="inline-flex items-center gap-2 text-white/50 hover:text-brand-400 text-sm font-medium transition-colors">
              <ArrowLeft />
              All work
            </Link>
            <span className="text-white/20">/</span>
            <span className="text-white/40 text-sm">{project.client}</span>
          </div>

          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
            <div className="lg:col-span-7">
              <div className="flex flex-wrap items-center gap-3 mb-6">
                <span className="px-3 py-1 rounded-full bg-brand-400/15 border border-brand-400/25 text-brand-400 text-xs font-bold uppercase tracking-wider">
                  {project.category}
                </span>
                <span className="text-white/35 text-xs">{project.year}</span>
              </div>
              <h1 className="text-[2rem] sm:text-[2.75rem] md:text-[3.5rem] lg:text-[3.25rem] xl:text-[4rem] font-extrabold tracking-[-0.03em] leading-[1.05] text-white mb-6">
                {project.client}
              </h1>
              <p className="text-white/65 text-lg md:text-xl leading-relaxed max-w-xl">
                {project.tagline}
              </p>
              <div className="flex flex-wrap gap-2 mt-8">
                {project.tags.map((tag) => (
                  <span key={tag} className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/60 text-sm font-medium">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Metrics */}
            <div className="lg:col-span-5">
              <div className="grid grid-cols-2 gap-px bg-white/5 rounded-2xl overflow-hidden border border-white/5">
                {project.metrics.map(({ value, label }) => (
                  <div key={label} className="bg-brand-ink p-6 md:p-8 flex flex-col gap-1">
                    <span className="text-3xl md:text-4xl font-extrabold text-brand-400 tracking-tight leading-none">
                      {value}
                    </span>
                    <span className="text-xs text-white/45 uppercase tracking-wide mt-1">{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* VISUAL HERO */}
      <section className="px-6 sm:px-10 md:px-16 pb-20">
        <div className="max-w-7xl mx-auto">
          <div
            className={`relative rounded-3xl overflow-hidden aspect-16/7 bg-linear-to-br ${project.bgClass ?? ""}`}
            style={project.bgStyle}
          >
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_60%,rgba(255,255,255,0.08),transparent_55%)]"></div>
            <div className="absolute inset-0 flex items-center justify-center select-none">
              <span className="text-white/10 font-black leading-none tracking-tighter" style={{ fontSize: "clamp(6rem, 18vw, 20rem)" }}>
                {project.initials}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* CASE STUDY CONTENT */}
      <section className="px-6 sm:px-10 md:px-16 pb-24 md:pb-36">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-10 lg:gap-16">

          {/* Main content */}
          <div className="lg:col-span-8 flex flex-col gap-16">

            {/* Challenge */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <span className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/40 text-xs font-bold">01</span>
                <span className="text-xs font-bold uppercase tracking-[0.15em] text-white/40">The Challenge</span>
              </div>
              <p className="text-white/70 text-base md:text-lg leading-relaxed">{project.challenge}</p>
            </div>

            <div className="h-px bg-white/5"></div>

            {/* Approach */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <span className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/40 text-xs font-bold">02</span>
                <span className="text-xs font-bold uppercase tracking-[0.15em] text-white/40">Our Approach</span>
              </div>
              <p className="text-white/70 text-base md:text-lg leading-relaxed">{project.approach}</p>
            </div>

            <div className="h-px bg-white/5"></div>

            {/* Outcome */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <span className="w-8 h-8 rounded-full bg-brand-400/20 border border-brand-400/30 flex items-center justify-center text-brand-400 text-xs font-bold">03</span>
                <span className="text-xs font-bold uppercase tracking-[0.15em] text-brand-400">The Outcome</span>
              </div>
              <p className="text-white/70 text-base md:text-lg leading-relaxed">{project.outcome}</p>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-4 flex flex-col gap-6 lg:sticky lg:top-24 lg:self-start">
            {/* Quick facts */}
            <div className="rounded-2xl border border-white/8 bg-white/2 p-6 flex flex-col gap-4">
              <p className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-white/40">Project facts</p>
              <dl className="flex flex-col gap-3">
                <div>
                  <dt className="text-[0.65rem] text-white/35 uppercase tracking-wider mb-0.5">Client</dt>
                  <dd className="text-white font-semibold text-sm">{project.client}</dd>
                </div>
                <div>
                  <dt className="text-[0.65rem] text-white/35 uppercase tracking-wider mb-0.5">Category</dt>
                  <dd className="text-white font-semibold text-sm">{project.category}</dd>
                </div>
                <div>
                  <dt className="text-[0.65rem] text-white/35 uppercase tracking-wider mb-0.5">Year</dt>
                  <dd className="text-white font-semibold text-sm">{project.year}</dd>
                </div>
                <div>
                  <dt className="text-[0.65rem] text-white/35 uppercase tracking-wider mb-0.5">Services</dt>
                  <dd className="flex flex-wrap gap-1.5 mt-1">
                    {project.tags.map((tag) => (
                      <span key={tag} className="px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-white/55 text-[0.65rem] font-medium">{tag}</span>
                    ))}
                  </dd>
                </div>
              </dl>
            </div>

            {/* CTA */}
            <div className="rounded-2xl bg-linear-to-br from-brand-400 to-brand-300 p-6 text-brand-700">
              <h3 className="font-extrabold text-lg tracking-tight mb-2">Start a project</h3>
              <p className="text-brand-700/70 text-sm leading-relaxed mb-5">Your project could be next. Book a 20-minute discovery call.</p>
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 rounded-full bg-brand-700 text-brand-300 hover:bg-brand-ink font-bold text-sm px-5 py-2.5 transition-colors"
              >
                Get in touch
                <span className="transition-transform duration-300 group-hover:translate-x-1"><ArrowRight /></span>
              </Link>
            </div>
          </aside>
        </div>
      </section>

      {/* PREV / NEXT */}
      <nav className="px-6 sm:px-10 md:px-16 pb-24 md:pb-36" aria-label="Case study navigation">
        <div className="max-w-7xl mx-auto border-t border-white/5 pt-12">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            {prevProject ? (
              <Link href={`/work/${prevProject.slug}`} className="group flex flex-col gap-1">
                <span className="text-xs font-medium text-white/35 uppercase tracking-wider flex items-center gap-2"><ArrowLeft />Previous</span>
                <span className="text-white font-bold text-lg group-hover:text-brand-400 transition-colors">{prevProject.client}</span>
              </Link>
            ) : <div />}
            {nextProject ? (
              <Link href={`/work/${nextProject.slug}`} className="group flex flex-col gap-1 sm:items-end">
                <span className="text-xs font-medium text-white/35 uppercase tracking-wider flex items-center gap-2">Next<ArrowRight /></span>
                <span className="text-white font-bold text-lg group-hover:text-brand-400 transition-colors">{nextProject.client}</span>
              </Link>
            ) : <div />}
          </div>
        </div>
      </nav>

      <Footer />
      <FooterReveal />
    </>
  );
}
