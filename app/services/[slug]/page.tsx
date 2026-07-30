import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { services, getService } from "@/lib/services";
import { getWorkProject } from "@/lib/work";
import ServiceDetailClient from "@/components/ServiceDetailClient";
import Footer from "@/components/Footer";
import FooterReveal from "@/components/FooterReveal";

export async function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return {
    title: service.metaTitle,
    description: service.metaDescription,
    openGraph: {
      title: service.metaTitle,
      description: service.metaDescription,
      url: `https://brandmates.au/services/${slug}`,
      siteName: "BrandMates",
      locale: "en_AU",
      type: "website",
    },
    twitter: { card: "summary_large_image", title: service.metaTitle, description: service.metaDescription },
    alternates: { canonical: `https://brandmates.au/services/${slug}` },
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const otherServices = services.filter((s) => s.slug !== slug);
  const relatedWork = getWorkProject(service.relatedWorkSlug);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        name: service.eyebrow,
        description: service.metaDescription,
        provider: {
          "@type": "Organization",
          name: "BrandMates",
          url: "https://brandmates.au",
        },
        areaServed: { "@type": "Country", name: "Australia" },
        url: `https://brandmates.au/services/${slug}`,
      },
      {
        "@type": "FAQPage",
        mainEntity: service.faqs.map(({ q, a }) => ({
          "@type": "Question",
          name: q,
          acceptedAnswer: { "@type": "Answer", text: a },
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Services", item: "https://brandmates.au/services" },
          { "@type": "ListItem", position: 2, name: service.eyebrow, item: `https://brandmates.au/services/${slug}` },
        ],
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <ServiceDetailClient service={service} otherServices={otherServices} relatedWork={relatedWork} />
      <Footer />
      <FooterReveal />
    </>
  );
}
