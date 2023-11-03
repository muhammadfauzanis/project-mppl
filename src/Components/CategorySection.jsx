import { useEffect, useState } from "react";
import ListCategory from "./ListCategory";
import { Link } from "react-scroll";
import { Helper } from "../Helper/Helper";
import axios from "axios";


function CategorySection() {
  const {isFixed,baseURLAPI} = Helper();

  // GET PRODUCTS KOPI
  const [allProducts, setAllProducts] = useState([]);
  const fetchDataCoffee = async () => {
    try {
      const response = await axios.get(baseURLAPI("all-product"));
      setAllProducts(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchDataCoffee();
  }, []);


  return (
    <div className="px-7 mt-5">
      {/* <h3 className="text-md sm:text-lg font-bold text-[#414141]">Kategori</h3> */}
      <div
        // state isFixed dipake di sini
        className={` ${
          isFixed
            ? "fixed top-0 left-0 md:top-0 md:left-1/2 md:-translate-x-1/2"
            : ""
        }`}
        style={{ zIndex: 100, width: "100%", maxWidth: "512px" }}
      >
        <div
          className={`${
            isFixed ? "bg-white px-7 transition duration-500 ease-in-out" : ""
          }`}
        >
          <div className="flex gap-5 py-3 transition duration-300  overflow-x-auto scroll-smooth scrollbar-hide">
            {allProducts.map((items,key) => {
              return (
                <Link key={items.id_kategori_menu} to={items.nama_kategori_menu.toLowerCase().replace(" ", "-")} smooth={true} duration={500} offset={key === 0 ? -80 : 50}>
                  <ListCategory imgPath="/coffe.png" text={items.nama_kategori_menu} />
                </Link>
              )
            })}
            {/* <Link to="kopi" smooth={true} duration={500} offset={-80}>
              <ListCategory imgPath="/coffe.png" text="Kopi" />
            </Link>
            <Link to="minuman" smooth={true} duration={500} offset={50}>
              <ListCategory imgPath="/orange-juice.png" text="Minuman" />
            </Link>
            <Link to="cemilan" smooth={true} duration={500}>
              <ListCategory imgPath="/french-fries.png" text="Cemilan" />
            </Link>
            <Link to="makanan" smooth={true} duration={500} offset={-80}>
              <ListCategory imgPath="/bibimbap.png" text="Makanan" />
            </Link>
            <Link to="">
              <ListCategory imgPath="/bibimbap.png" text="Makanan" />
            </Link>
            <Link to="">
              <ListCategory imgPath="/bibimbap.png" text="Makanan" />
            </Link> */}
          </div>
        </div>
      </div>
      {/* <div
        className={`${
          isFixed
            ? "fixed top-0 left-0 md:top-0 md:left-1/2 md:-translate-x-1/2 bg-white opacity-100"
            : "fixed top-0 left-0 md:top-0 md:left-1/2 md:-translate-x-1/2 bg-white opacity-0"
        } transition-all duration-500`}
        style={{ height: "5%", width: "100%" }}
      ></div> */}
    </div>
  );
}

export default CategorySection;
