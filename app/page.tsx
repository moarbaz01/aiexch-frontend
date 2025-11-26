import GamesProviderSection from "@/components/games-provider";
import HomeBanner from "@/components/home-banner";
import HomePromotionsSection from "@/components/home-promotions-section";
import DynamicHomeSections from "@/components/dynamic-home-sections";
import QuickLinksSection from "@/components/quick-links-section";
import {
  LiveWinners,
  Tournaments,
  CasinoStats,
  PaymentMethods,
} from "@/components/homepage-sections";

const Homepage = () => {
  return (
    <div className="pb-12">
      <HomeBanner />
      <HomePromotionsSection />
      <QuickLinksSection />
      <DynamicHomeSections />
      {/* <CasinoStats /> */}
      {/* <LiveWinners /> */}
      {/* <Tournaments /> */}
      {/* <PaymentMethods /> */}
      {/* <GamesProviderSection /> */}
    </div>
  );
};

export default Homepage;
