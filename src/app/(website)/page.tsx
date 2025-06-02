import FAQSection from "@/components/home/faq";
import Inspire from "@/components/home/inspire";
import StaffingNeed from "@/components/home/staffing-need";
import Banner from "@/components/shared/banner";
import ClientCompanies from "@/components/shared/client-companies";
import Services from "@/components/shared/services";

export default function Home() {
  return (
    <main>
      <Banner />
      <ClientCompanies />
      <Services />
      <Inspire />
      <StaffingNeed />
      <FAQSection />
    </main>
  );
}
