import { Link, useLocation } from "react-router-dom";
import PlusMinusButton from "./PlusMinusButton";
import { BsFillCartPlusFill } from "react-icons/bs";
import { useEffect, useState } from "react";
import axios, { all } from "axios";

function MenuCard() {
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


  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const reserve = params.get("reserve");


  const [allProducts, setAllProducts] = useState([]);
  const fetchData = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/all-product');
      setAllProducts(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div
          className={`flex flex-row flex-wrap ${
            isFixed ? `mt-24 transition duration-500 ease-in-out pb-32` : ""
          }`}
          style={{ justifyContent: "center" }}
        >
      {
        allProducts.map((items) => {
          return (
            <div className="flex flex-row flex-wrap justify-center w-full">
              <h1 className="ms-8 w-full">{items.nama_kategori_menu}</h1>
              {
                items.menu.map((menu) => {
                  return (
                    <div className="card mt-5 sm:w-48 md:w-60 flex justify-center">
                      <div className="card-body flex flex-col bg-white p-3 ml-2 mr-2 xs:ml-7 xs:mr-7 md:ml-4 md:mr-4 rounded-2xl shadow-xl ">
                        <Link to="/product-detail" className="cursor-pointer">
                          <img src="/latte.png" alt="" className="w-full" />
                          <h3 className="text-md sm:text-lg text-[#414141] font-bold">
                            {menu.nama_menu}
                          </h3>
                        </Link>
                        <p className="text-xs sm:text-md text-[#414141]">
                          Espresso dengan susu, harmoni kopi kaya dan kelembutan susu dalam
                          setiap tegukan asikkkk
                        </p>
                        <div className="flex flex-row justify-between mt-2  items-center">
                          <p className="text-xs sm:text-md text-[#98694F] font-bold pr-1 sm:pr-0">
                            17.000
                          </p>
                          <PlusMinusButton />
                          <BsFillCartPlusFill
                            size={20}
                            className=" text-[#98694F] my-auto pl-1 sm:pl-0"
                          />
                        </div>
                      </div>
                    </div>
                  )
                })
              }
            </div>
          )
        })
      }
    </div>

  );
}

export default MenuCard;
