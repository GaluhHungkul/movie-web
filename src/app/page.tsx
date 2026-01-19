import CarouselMovieGenres from "@/components/homePage/CarouselMovieGenres";
import FAQ from "@/components/homePage/FAQ";
import Intro from "@/components/homePage/Intro";
import MoreReasonsToJoin from "@/components/homePage/MoreReasonsToJoin";
import PricingPlans from "@/components/homePage/PricingPlans";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center relative min-h-[50vh] z-10 backdrop-blur-2xl px-5 md:px-10 lg:px-20">
      <Intro />
      <CarouselMovieGenres />
      <MoreReasonsToJoin />
      <PricingPlans />
      <FAQ />
    </div>
  );
}
