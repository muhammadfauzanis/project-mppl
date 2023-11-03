/* eslint-disable react/jsx-key */
import { useEffect, useState } from "react";
import CartButton from "../Components/CartButton";
import CategorySection from "../Components/CategorySection";
import Navbar from "../Components/Navbar";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import PlusMinusButton from "../Components/PlusMinusButton";
import { BsFillCartPlusFill } from "react-icons/bs";
import Loading from "../Components/Loading";
import { Helper } from "../Helper/Helper";

function HomeMenu() {
  const { formatRupiah , baseURLAPI} = Helper();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const reserve = params.get("reserve");
  const [isLoading, setIsLoading] = useState(true);
  const [isFixed, setIsFixed] = useState(false);

  // GET PRODUCTS KOPI
  const [allProducts, setAllProducts] = useState([]);
  const fetchDataCoffee = async () => {
    try {
      const response = await axios.get(baseURLAPI("all-product"));
      setAllProducts(response.data);

      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchDataCoffee();
  }, []);


  const handleScroll = () => {
    if (window.scrollY > 225) {
      setIsFixed(true);
    } else {
      setIsFixed(false);
    }
  };

  window.addEventListener("scroll", handleScroll);

  return (
    <div>
      <div
        className={`bg-warnaBg mx-auto my-0 max-w-lg h-full ${
          isFixed ? "pb-64" : ""
        }`}
      >
        <Navbar />

        {/* SELAMAT DATANG */}
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

        {/* SEMUA PRODUK */}
        {isLoading ? (
          <Loading/>
        ) : (
          allProducts.map((items) => {
            return (
              <div
                id={items.nama_kategori_menu.toLowerCase().replace(" ", "-")}
              >
                <div
                  className={`flex flex-row flex-wrap justify-center w-full mt-5 ${
                    isFixed
                      ? "translate-y-28 md:translate-y-40 lg:translate-y-48 transition-transform duration-1000"
                      : "translate-y-0 transition-transform duration-1000"
                  }`}
                >
                  <h1
                    className="w-full font-bold ms-10"
                    style={{ marginBottom: "-30px" }}
                  >
                    {items.nama_kategori_menu}
                  </h1>
                  {items.menu.map((menu) => {
                    return (
                      <div className="card mt-5 sm:w-48 md:w-60 flex justify-center">
                        <div className="card-body flex flex-col justify-between bg-white p-3 ml-2 mr-2 xs:ml-7 xs:mr-7 md:ml-4 md:mr-4 rounded-2xl shadow-xl ">
                          <Link
                            to={`/product-detail?menu=${menu.id_menu}&reserve=${
                              reserve == null ? false : reserve
                            }`}
                            className="cursor-pointer"
                          >
                            <div className="">
                              <img
                                src={menu.url_gambar}
                                alt=""
                                className="w-full"
                              />
                              <h3 className="text-md sm:text-lg text-[#414141] font-bold">
                                {menu.nama_menu}
                              </h3>
                              <p className="text-xs sm:text-md text-[#414141]">
                                {menu.deskripsi_menu}
                              </p>
                            </div>
                          </Link>
                          <div className="flex flex-row justify-between mt-2  items-center">
                            <p className="text-xs sm:text-md text-[#98694F] font-bold pr-1 sm:pr-0">
                              {formatRupiah(menu.harga_menu)}
                            </p>
                            <PlusMinusButton />
                            <BsFillCartPlusFill
                              size={20}
                              className=" text-[#98694F] my-auto pl-1 sm:pl-0"
                            />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })
        )}

        <Link to="/checkout-form">
          <CartButton inputClassname="flex items-center justify-center fixed bottom-4 right-4 sm:bottom-4 md:right-4 lg:right-1/4 lg:-translate-x-32 xl:right-1/4 xl:-translate-x-56 w-14 h-14 rounded-full bg-[#98694F] shadow-lg cursor-pointer" />
        </Link>
      </div>
    </div>
  );
}

export default HomeMenu;
