import Browse from "@/components/common/section-browse";
import HeroSection from "@/components/common/section-hero";
import InspirationSection from "@/components/common/section-inspiration";
import NewsletterSection from "@/components/common/section-newsletter";
import Products from "@/components/common/section-products";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home",
};

const Home = () => {
  return (
    <div>
      <HeroSection />
      <Browse />
      <Products />
      <InspirationSection />
      <NewsletterSection />
    </div>
  );
};

export default Home;
