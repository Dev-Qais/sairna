import Hero from "./components/Hero";
import HomeStats from "./components/HomeStats";
import DestinationsSection from "./components/DestinationsSection";
import HomeSteps from "./components/HomeSteps";
import HomeTrackingSection from "./components/HomeTrackingSection";
import HomeBookingCTA from "./components/HomeBookingCTA";
function HomePage() {
  return (
    <div>
      <Hero />
      <HomeStats />
      <DestinationsSection />
      <HomeSteps />
      <HomeTrackingSection />
      <HomeBookingCTA />
    </div>
  );
}

export default HomePage;
