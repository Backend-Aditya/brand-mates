import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { journalArticles, getJournalArticle } from "@/lib/journal";
import Footer from "@/components/Footer";
import FooterReveal from "@/components/FooterReveal";

export async function generateStaticParams() {
  return journalArticles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getJournalArticle(slug);
  if (!article) return {};
  return {
    title: `${article.title} — BrandMates Journal`,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      url: `https://brandmates.com.au/journal/${slug}`,
      siteName: "BrandMates",
      locale: "en_AU",
      type: "article",
    },
    twitter: { card: "summary_large_image", title: article.title, description: article.excerpt },
    alternates: { canonical: `https://brandmates.com.au/journal/${slug}` },
  };
}

const ArrowLeft = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M13 8H3M3 8L7 4M3 8L7 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ArrowRight = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default async function JournalArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getJournalArticle(slug);
  if (!article) notFound();

  const currentIndex = journalArticles.findIndex((a) => a.slug === slug);
  const prevArticle = currentIndex > 0 ? journalArticles[currentIndex - 1] : null;
  const nextArticle = currentIndex < journalArticles.length - 1 ? journalArticles[currentIndex + 1] : null;

  return (
    <>
      {/* HERO */}
      <section className="relative w-full pt-36 md:pt-44 pb-16 overflow-hidden">
        <div className="px-6 sm:px-10 md:px-16 max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-10">
            <Link href="/journal" className="inline-flex items-center gap-2 text-white/50 hover:text-brand-400 text-sm font-medium transition-colors">
              <ArrowLeft />
              Journal
            </Link>
            <span className="text-white/20">/</span>
            <span className="text-white/40 text-sm truncate max-w-[200px]">{article.tag}</span>
          </div>

          <div className="flex flex-wrap items-center gap-3 mb-8">
            <span className="px-3 py-1 rounded-full bg-brand-400/15 border border-brand-400/25 text-brand-400 text-xs font-bold uppercase tracking-wider">
              {article.tag}
            </span>
            <span className="text-white/35 text-sm">{article.date}</span>
            <span className="text-white/20 text-sm">·</span>
            <span className="text-white/35 text-sm">{article.readTime}</span>
          </div>

          <h1 className="text-[1.75rem] sm:text-[2.25rem] md:text-[3rem] lg:text-[3.5rem] font-extrabold tracking-[-0.03em] leading-[1.08] text-white mb-8">
            {article.title}
          </h1>

          <p className="text-white/60 text-base md:text-xl leading-relaxed max-w-2xl">
            {article.excerpt}
          </p>
        </div>
      </section>

      {/* HERO VISUAL */}
      <section className="px-6 sm:px-10 md:px-16 pb-20">
        <div className="max-w-4xl mx-auto">
          <div className={`relative rounded-3xl overflow-hidden aspect-video bg-linear-to-br ${article.gradient}`}>
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_80%,rgba(255,255,255,0.06),transparent_50%)]"></div>
            <div className="absolute inset-0 flex items-center justify-center select-none">
              <span className="text-white/8 font-black leading-none tracking-tighter" style={{ fontSize: "clamp(5rem, 14vw, 16rem)" }}>
                {article.initials}
              </span>
            </div>
            <div className="absolute bottom-6 left-6 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-brand-400"></span>
              <span className="text-white/60 text-xs font-medium uppercase tracking-wider">BrandMates Studio · {article.date}</span>
            </div>
          </div>
        </div>
      </section>

      {/* ARTICLE CONTENT */}
      <section className="px-6 sm:px-10 md:px-16 pb-24 md:pb-36">
        <div className="max-w-4xl mx-auto">
          <div className="grid lg:grid-cols-[1fr_260px] gap-12 lg:gap-16 items-start">

            {/* Article body */}
            <article>
              {article.sections.map((section, i) => (
                <div key={i} className="mb-12 last:mb-0">
                  <h2 className="text-xl md:text-2xl font-extrabold text-white tracking-tight mb-4">
                    {section.heading}
                  </h2>
                  <p className="text-white/65 text-base md:text-lg leading-relaxed">
                    {section.body}
                  </p>
                </div>
              ))}
            </article>

            {/* Sidebar */}
            <aside className="lg:sticky lg:top-24 flex flex-col gap-5">
              <div className="rounded-2xl border border-white/8 bg-white/2 p-5">
                <p className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-white/35 mb-4">Filed under</p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 rounded-full bg-brand-400/10 border border-brand-400/20 text-brand-400 text-xs font-medium">{article.tag}</span>
                </div>
                <div className="mt-4 pt-4 border-t border-white/5 text-white/35 text-xs">
                  {article.date} · {article.readTime}
                </div>
              </div>

              <div className="rounded-2xl bg-linear-to-br from-brand-400 to-brand-300 p-5 text-brand-700">
                <p className="font-extrabold text-base tracking-tight mb-1.5">Work with us</p>
                <p className="text-brand-700/70 text-xs leading-relaxed mb-4">20 minutes. We&apos;ll tell you honestly whether we&apos;re the right fit.</p>
                <Link
                  href="/contact"
                  className="group inline-flex items-center gap-1.5 rounded-full bg-brand-700 text-brand-300 hover:bg-brand-ink font-bold text-xs px-4 py-2 transition-colors"
                >
                  Book a call
                  <span className="transition-transform duration-300 group-hover:translate-x-1"><ArrowRight /></span>
                </Link>
              </div>

              {/* Related articles */}
              {(prevArticle || nextArticle) && (
                <div className="rounded-2xl border border-white/8 bg-white/2 p-5">
                  <p className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-white/35 mb-4">More from the journal</p>
                  <div className="flex flex-col gap-3">
                    {[prevArticle, nextArticle].filter(Boolean).slice(0, 2).map((a) => a && (
                      <Link key={a.slug} href={`/journal/${a.slug}`} className="group flex flex-col gap-1">
                        <span className="text-[0.6rem] font-bold uppercase tracking-wider text-brand-400">{a.tag}</span>
                        <span className="text-white/70 group-hover:text-white text-xs leading-snug transition-colors">{a.title}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </aside>
          </div>
        </div>
      </section>

      {/* PREV / NEXT */}
      <nav className="px-6 sm:px-10 md:px-16 pb-24 md:pb-36" aria-label="Article navigation">
        <div className="max-w-4xl mx-auto border-t border-white/5 pt-12">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            {prevArticle ? (
              <Link href={`/journal/${prevArticle.slug}`} className="group flex flex-col gap-1 max-w-xs">
                <span className="text-xs font-medium text-white/35 uppercase tracking-wider flex items-center gap-2"><ArrowLeft />Previous</span>
                <span className="text-white font-semibold text-sm leading-snug group-hover:text-brand-400 transition-colors">{prevArticle.title}</span>
              </Link>
            ) : <div />}
            {nextArticle ? (
              <Link href={`/journal/${nextArticle.slug}`} className="group flex flex-col gap-1 sm:items-end max-w-xs">
                <span className="text-xs font-medium text-white/35 uppercase tracking-wider flex items-center gap-2">Next<ArrowRight /></span>
                <span className="text-white font-semibold text-sm leading-snug group-hover:text-brand-400 transition-colors sm:text-right">{nextArticle.title}</span>
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
