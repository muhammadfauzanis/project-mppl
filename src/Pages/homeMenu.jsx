import { useState } from "react";
import CartButton from "../Components/CartButton";
import CategorySection from "../Components/CategorySection";
import MenuCard from "../Components/MenuCard";
import Navbar from "../Components/Navbar";

function HomeMenu() {
  const [isFixed, setIsFixed] = useState(false);

  // buat handle card menu pas ngescroll jdi geser kebawah dikit

  const handleScroll = () => {
    if (window.scrollY > 230) {
      setIsFixed(true);
    } else {
      setIsFixed(false);
    }
  };

  window.addEventListener("scroll", handleScroll);

  return (
    <div>
      <div className="bg-slate-200 mx-auto my-0 max-w-lg h-full">
        <Navbar />
        <div className="px-7">
          <h1 className="text-2xl sm:text-3xl text-[#414141] font-bold">
            Selamat Datang!
          </h1>
          <p className="text-sm sm:text-md text-[#414141]">
            Nikmati Setiap Hidangan, Rasakan Kelezatan di Setiap Suapan
            anjayyyyyy
          </p>
        </div>
        <CategorySection />
        <div
          className={` ${isFixed ? `mt-24 transition duration-500 ease-in-out` : ""
            }`}>
          <div id="kopi" className="flex flex-row flex-wrap justify-center">
            <MenuCard />
            <MenuCard />
            <MenuCard />
            <MenuCard />
          </div>
          <div id="minuman" className="flex flex-row flex-wrap justify-center">
            <MenuCard />
            <MenuCard />
            <MenuCard />
            <MenuCard />
          </div>
          <div id="cemilan" className="flex flex-row flex-wrap justify-center">
            <MenuCard />
            <MenuCard />
          </div>
        </div>
        <CartButton variant="flex items-center justify-center fixed bottom-4 right-4 md:bottom-4 md:right-1/4 md:-translate-x-60 w-14 h-14 rounded-full bg-[#98694F] shadow-lg" />
      </div>
    </div>
  );
}

export default HomeMenu;
