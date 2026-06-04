import Navbar from "./Navbar";
import HeroSection from "./HeroSection";
import FeaturedCourses from "./FeaturedCourses";
import Footer from "./Footer";
import PricingSection from "./PricingSection";
import GamificationSection from "./GamificationPreview";
import HowItWorksSection from "./HowItWorks";
import FeaturesGrid from "./FeaturesGrid";
import MentorsSection from "./MentorsSection";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#080B14] overflow-hidden">

      <Navbar />

      <HeroSection />
      <HowItWorksSection />

      <FeaturedCourses />
      <FeaturesGrid />

      <GamificationSection />
      <MentorsSection />

      <PricingSection />

      <Footer />

    </div>
  );
}