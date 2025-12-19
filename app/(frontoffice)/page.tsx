import Banner from "@/components/Banner/Banner";
import Benefits from "@/components/Benefits/Benefits";
import Introduction from "@/components/Introduction/Introduction";
import OpeningHours from "@/components/OpeningHours/OpeningHours";
import Presentation from "@/components/Presentation/Presentation";
import PricingPlanContainer from "@/components/PricingPlan/PricingPlanContainer";
import Testimonials from "@/components/Testimonials/Testimonials";
import Trainers from "@/components/Trainers/Trainers";
import { LatestPostsContainer } from "@/components/LatestPosts/LatestPostsContainer";

export default async function Home() {
  return (
    <main>
      <Banner />
      <Introduction />
      <LatestPostsContainer />
      <Benefits />
      <Presentation />
      <Trainers />
      <PricingPlanContainer />
      <OpeningHours />
      <Testimonials />
    </main>
  );
}
