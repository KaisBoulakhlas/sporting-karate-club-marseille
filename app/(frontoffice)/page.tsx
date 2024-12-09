import Banner from "@/components/Banner/Banner";
import Benefits from "@/components/Benefits/Benefits";
import Introduction from "@/components/Introduction/Introduction";
import LatestPosts from "@/components/LatestPosts/LatestPosts";
import OpeningHours from "@/components/OpeningHours/OpeningHours";
import Presentation from "@/components/Presentation/Presentation";
import PricingPlanContainer from "@/components/PricingPlan/PricingPlanContainer";
import Testimonials from "@/components/Testimonials/Testimonials";
import Trainers from "@/components/Trainers/Trainers";
import { getLatestPosts } from "@/hooks/useLatestPosts";

export default async function Home() {
  const posts = (await getLatestPosts()) || [];
  return (
    <main>
      <Banner />
      <Introduction />
      <LatestPosts posts={posts} />
      <Benefits />
      <Presentation />
      <Trainers />
      <PricingPlanContainer />
      <OpeningHours />
      <Testimonials />
    </main>
  );
}
