import { useState } from "react";
import ListCategory from "./ListCategory";
import { Link } from "react-scroll";

function CategorySection() {
  const [isFixed, setIsFixed] = useState(false);

  // buat handle list category waktu nge scroll position jadi fixed
  const handleScroll = () => {
    if (window.scrollY > 230) {
      setIsFixed(true);
    } else {
      setIsFixed(false);
    }
  };

  window.addEventListener("scroll", handleScroll);

  return (
    <div className="px-7 mt-5">
      {/* <h3 className="text-md sm:text-lg font-bold text-[#414141]">Kategori</h3> */}
      <div
        // state isFixed dipake di sini
        className={`flex gap-5 py-3 transition duration-300 md:transition-none overflow-x-auto scroll-smooth scrollbar-hide ${
          isFixed
            ? "fixed top-0 left-0 md:top-0 md:left-1/2 md:-translate-x-1/2 bg-white px-7 transition duration-500 md:transition-none"
            : ""
        }`}
        style={{ zIndex: 100 }}
      >
        <Link to="Kopi" smooth={true} duration={500}>
          <ListCategory imgPath="/coffe.png" text="Kopi" />
        </Link>
        <Link to="Minuman" smooth={true} duration={500}>
          <ListCategory imgPath="/orange-juice.png" text="Minuman" />
        </Link>
        <Link to="cemilan" smooth={true} duration={500}>
          <ListCategory imgPath="/french-fries.png" text="Cemilan" />
        </Link>
        <Link to="Makanan">
          <ListCategory imgPath="/bibimbap.png" text="Makanan" />
        </Link>
        <Link to="">
          <ListCategory imgPath="/bibimbap.png" text="Makanan" />
        </Link>
        <Link to="">
          <ListCategory imgPath="/bibimbap.png" text="Makanan" />
        </Link>
      </div>
    </div>
  );
}

export default CategorySection;
