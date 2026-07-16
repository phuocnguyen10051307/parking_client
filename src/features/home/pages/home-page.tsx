import { HeroSection } from '../components/hero-section';
import { FeatureSection } from '../components/feature-section';
import { HowItWorksSection } from '../components/how-it-works';
import { StatisticsSection } from '../components/statistics-section';
import { Footer } from '../components/footer';

export default function HomePage() {
  return (
    <>
      <HeroSection />

      <div className="mx-auto max-w-[1600px] space-y-28 px-10 pb-24 lg:px-20">
        <StatisticsSection />
        <FeatureSection />
        <HowItWorksSection />
      </div>

      <div className="relative left-1/2 w-screen -translate-x-1/2">
        <Footer />
      </div>
    </>
  );
}
