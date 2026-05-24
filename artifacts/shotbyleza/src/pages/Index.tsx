import PageLayout from "@/components/PageLayout";
import Hero from "@/components/home/Hero";
import QuickAbout from "@/components/home/QuickAbout";
import FeaturedWork from "@/components/home/FeaturedWork";
import { SEO } from "@/components/SEO";

const homeSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "name": "ShotByLeza",
  "description": "Sydney-based photographer and content creator specialising in portraits, events, fashion, couple shoots, and brand photography.",
  "url": "https://shotbyleza.com.au",
  "telephone": "+61450546461",
  "email": "alizafaixal@gmail.com",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Sydney",
    "addressRegion": "NSW",
    "addressCountry": "AU"
  },
  "image": "https://shotbyleza.com.au/opengraph.jpg",
  "sameAs": ["https://instagram.com/shotbyleza"],
};

const Index = () => {
  return (
    <PageLayout>
      <SEO
        title="ShotByLeza | Sydney Photographer – Portraits, Events, Fashion & Content"
        description="Sydney-based photographer and content creator. Specialising in portraits, events, fashion, couple & brand photography. Book your shoot today."
        canonical="https://shotbyleza.com.au/"
        schema={homeSchema}
      />
      <Hero />
      <QuickAbout />
      <FeaturedWork />
    </PageLayout>
  );
};

export default Index;