import Image from "next/image";
import Hero from "./components/hero";
import Header from "./components/header";
import Category from "./components/category";
import AboutUsSection from "./components/aboutUs";
import PartnersLogosSection from "./components/partners";
import ReviewSection from "./components/reviews";

export default function Home() {
  return (
    <div className="relative">
      
      <Hero />
      <div id="category">
        <Category/>
      </div>
      <AboutUsSection/>
      <PartnersLogosSection/>
       <ReviewSection/>
    </div>
  );
}
