import CarouselMovieGenres from "@/components/homePage/CarouselMovieGenres";
import FAQ from "@/components/homePage/FAQ";
import Intro from "@/components/homePage/Intro";
import DevicesItems from "@/components/homePage/DevicesItem";
import PricingPlans from "@/components/homePage/PricingPlans";
import CTABanner from "@/components/homePage/CTABanner";

export default function Home() {
  return (
    <div className="flex flex-col items-center relative min-h-screen z-10 container gap-20 md:gap-32 pb-20 md:pb-32 ">
      <Intro />
      <CarouselMovieGenres />
      <DevicesItems />
      <FAQ />
      <PricingPlans />
      <CTABanner />
    </div>
  );
}
