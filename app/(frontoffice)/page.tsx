import Banner from "@/components/Banner/Banner";
import Benefits from "@/components/Benefits/Benefits";
import Introduction from "@/components/Introduction/Introduction";
import LatestPosts from "@/components/LatestPosts/LatestPosts";
import OpeningHours from "@/components/OpeningHours/OpeningHours";
import Presentation from "@/components/Presentation/Presentation";
import PricingPlanContainer from "@/components/PricingPlan/PricingPlanContainer";
import Testimonials from "@/components/Testimonials/Testimonials";
import Trainers from "@/components/Trainers/Trainers";

export default function Home() {
  // const fetchArticles = async () => {
  //   const articles = await fetch("http://localhost:3000/api/posts/latest").then(
  //     (response) => response.json()
  //   );
  //   console.log(articles);
  // };
  // fetchArticles();
  return (
    <main>
      <Banner />
      <Introduction />
      <LatestPosts />
      <Benefits />
      <Presentation />
      <Trainers />
      <PricingPlanContainer />
      <OpeningHours />
      <Testimonials />
    </main>
  );
}
