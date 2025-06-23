import Image from "next/image";
import Hero from "./components/hero";
import Header from "./components/header";
import Category from "./components/category";
import AboutUsSection from "./components/aboutUs";
import PartnersLogosSection from "./components/partners";
import ReviewSection from "./components/reviews";

export default function Home() {
  return (
    <div className="relative h-screen">

      <div className="mt-52 flex justify-center text-center text-5xl flex-col gap-20">
        <p>We are brewing something exciting for you!</p>
        <p className="text-2xl">
          Site currently under construction
        </p>
      </div>
      <div>

      </div>
      
      {/* <Hero />
      <div id="category">
        <Category/>
      </div>
      <AboutUsSection/>
      <PartnersLogosSection/>
       <ReviewSection/> */}
    </div>
  );
}
