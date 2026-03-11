import PageLayout from "@/components/PageLayout";
import Hero from "@/components/home/Hero";
import QuickAbout from "@/components/home/QuickAbout";
import FeaturedWork from "@/components/home/FeaturedWork";

const Index = () => {
  return (
    <PageLayout>
      <Hero />
      <QuickAbout />
      <FeaturedWork />
    </PageLayout>
  );
};

export default Index;