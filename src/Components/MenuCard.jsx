import { Link, useLocation } from "react-router-dom";
import PlusMinusButton from "./PlusMinusButton";
import { BsFillCartPlusFill } from "react-icons/bs";
import { useEffect, useState } from "react";
import axios, { all } from "axios";
import HomeMenu from "../Pages/homeMenu";


function MenuCard() {
  const [isFixed, setIsFixed] = useState(false);
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const reserve = params.get("reserve");
  const [isLoading, setIsLoading] = useState(true);

  // buat handle card menu pas ngescroll jdi geser kebawah dikit
  const handleScroll = () => {
    if (window.scrollY > 230) {
      setIsFixed(true);
    } else {
      setIsFixed(false);
    }
  };
  window.addEventListener("scroll", handleScroll);


  // GET PRODUCTS KOPI
  const [allProducts, setAllProducts] = useState([]);
  const fetchDataCoffee = async () => {
    try {
      // const response = await axios.get('http://127.0.0.1:8000/api/all-product');
      // const response = await axios.get('http://127.0.0.1:8000/api/products');
      const response = await axios.get('https://jaba-coffee.000webhostapp.com/api/products');
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

  console.log(allProducts);

  //FORMAT RUPIAH
  const formatRupiah = (amount) => {
    const formatter = new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    });

    return formatter.format(amount);
  };

  // useEffect(() => {
  //   // Ketika allProducts berubah, ambil nama_kategori_menu
  //   const menuKategori = allProducts.map((item) => item);
  //   console.log(menuKategori);
  // }, []);

  // useEffect(() => {
  //   // Ketika allProductsMenuKategori berubah, panggil HomeMenu
  //   HomeMenu(allProductsMenuKategori);
  // }, [allProductsMenuKategori]);
  // console.log(allProductsMenuKategori[0]);


  return (

    <div className={`flex flex-row flex-wrap ${isFixed ? `mt-24 transition duration-500 ease-in-out pb-32` : ""}`} style={{ justifyContent: "center" }}>
      {isLoading ? (
        <>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-dasharray="15" stroke-dashoffset="15" stroke-linecap="round" stroke-width="2" d="M12 3C16.9706 3 21 7.02944 21 12"><animate fill="freeze" attributeName="stroke-dashoffset" dur="0.3s" values="15;0" /><animateTransform attributeName="transform" dur="1.5s" repeatCount="indefinite" type="rotate" values="0 12 12;360 12 12" /></path></svg>
        </>
      ) : (
        <>
          {/* KOPI */}
          <div className="flex flex-row flex-wrap justify-center w-full">
            <h1 className="ms-8 w-full">Kopi</h1>
            {/* <h1 className="ms-8 w-full">{items.nama_kategori_menu}</h1> */}
            {allProducts.map((item) => {
              return (
                <div key={item.id_menu} className="card mt-5 sm:w-48 md:w-60 flex justify-center">
                  <div className="card-body flex flex-col bg-white p-3 ml-2 mr-2 xs:ml-7 xs:mr-7 md:ml-4 md:mr-4 rounded-2xl shadow-xl ">
                    <Link to={`/product-detail?reserve=${reserve == null ? (false) : (reserve)}`} className="cursor-pointer">
                      <img src={item.url_gambar} alt="" className="w-full" />
                      <h3 className="text-md sm:text-lg text-[#414141] font-bold">
                        {item.nama_menu}
                      </h3>
                    </Link>
                    <p className="text-xs sm:text-md text-[#414141]">
                      {item.deskripsi_menu}
                    </p>
                    <div className="flex flex-row justify-between mt-2  items-center">
                      <p className="text-xs sm:text-md text-[#98694F] font-bold pr-1 sm:pr-0">
                        {formatRupiah(item.harga_menu)}
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
            })}
          </div>
          {/* )
            })
          } */}
        </>
        // 
      )}
    </div>
  );
}

export default MenuCard;
