/* eslint-disable react/jsx-key */
import { useEffect, useState } from 'react';
import CartButton from '../Components/CartButton';
import CategorySection from '../Components/CategorySection';
import Navbar from '../Components/Navbar';
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';
import PlusMinusButton from '../Components/PlusMinusButton';
import { BsFillCartPlusFill } from 'react-icons/bs';

function HomeMenu() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const reserve = params.get('reserve');
  const [isLoading, setIsLoading] = useState(true);

  // GET PRODUCTS KOPI
  const [allProducts, setAllProducts] = useState([]);
  const fetchDataCoffee = async () => {
    try {
      // const response = await axios.get('http://127.0.0.1:8000/api/all-product');
      const response = await axios.get('https://jaba-coffee.000webhostapp.com/api/all-product');
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

  // console.log(allProducts);

  //FORMAT RUPIAH
  const formatRupiah = (amount) => {
    const formatter = new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    });

    return formatter.format(amount);
  };
  return (
    <div>
      <div className="bg-slate-200 mx-auto my-0 max-w-lg h-full">
        <Navbar />

        {/* SELAMAT DATANG */}
        <div className="px-7">
          <h1 className="text-2xl sm:text-3xl text-[#414141] font-bold">Selamat Datang!</h1>
          <p className="text-sm sm:text-md text-[#414141]">Nikmati Setiap Hidangan, Rasakan Kelezatan di Setiap Suapan anjayyyyyy</p>
        </div>

        <CategorySection />

        {/* SEMUA PRODUK */}
        {isLoading ? (
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24">
              <circle cx="12" cy="2" r="0" fill="currentColor">
                <animate attributeName="r" begin="0" calcMode="spline" dur="1s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" repeatCount="indefinite" values="0;2;0;0" />
              </circle>
              <circle cx="12" cy="2" r="0" fill="currentColor" transform="rotate(45 12 12)">
                <animate attributeName="r" begin="0.125s" calcMode="spline" dur="1s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" repeatCount="indefinite" values="0;2;0;0" />
              </circle>
              <circle cx="12" cy="2" r="0" fill="currentColor" transform="rotate(90 12 12)">
                <animate attributeName="r" begin="0.25s" calcMode="spline" dur="1s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" repeatCount="indefinite" values="0;2;0;0" />
              </circle>
              <circle cx="12" cy="2" r="0" fill="currentColor" transform="rotate(135 12 12)">
                <animate attributeName="r" begin="0.375s" calcMode="spline" dur="1s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" repeatCount="indefinite" values="0;2;0;0" />
              </circle>
              <circle cx="12" cy="2" r="0" fill="currentColor" transform="rotate(180 12 12)">
                <animate attributeName="r" begin="0.5s" calcMode="spline" dur="1s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" repeatCount="indefinite" values="0;2;0;0" />
              </circle>
              <circle cx="12" cy="2" r="0" fill="currentColor" transform="rotate(225 12 12)">
                <animate attributeName="r" begin="0.625s" calcMode="spline" dur="1s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" repeatCount="indefinite" values="0;2;0;0" />
              </circle>
              <circle cx="12" cy="2" r="0" fill="currentColor" transform="rotate(270 12 12)">
                <animate attributeName="r" begin="0.75s" calcMode="spline" dur="1s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" repeatCount="indefinite" values="0;2;0;0" />
              </circle>
              <circle cx="12" cy="2" r="0" fill="currentColor" transform="rotate(315 12 12)">
                <animate attributeName="r" begin="0.875s" calcMode="spline" dur="1s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" repeatCount="indefinite" values="0;2;0;0" />
              </circle>
            </svg>
          </div>
        ) : (
          allProducts.map((items) => {
            return (
              <div id={items.nama_kategori_menu.toLowerCase().replace(" ","-")}>
                <div className="flex flex-row flex-wrap justify-center w-full mt-5">
                  <h1 className="ms-8 w-full font-bold" style={{ marginBottom: '-30px' }}>
                    {items.nama_kategori_menu}
                  </h1>
                  {items.menu.map((menu) => {
                    return (
                      // eslint-disable-next-line react/jsx-key
                      <div className="card mt-5 sm:w-48 md:w-60 flex justify-center">
                        <div className="card-body flex flex-col justify-between bg-white p-3 ml-2 mr-2 xs:ml-7 xs:mr-7 md:ml-4 md:mr-4 rounded-2xl shadow-xl ">
                          <div className="">
                            <Link to={`/product-detail?reserve=${reserve == null ? false : reserve}`} className="cursor-pointer">
                              <img src={menu.url_gambar} alt="" className="w-full" />
                              <h3 className="text-md sm:text-lg text-[#414141] font-bold">{menu.nama_menu}</h3>
                            </Link>
                            <p className="text-xs sm:text-md text-[#414141]">{menu.deskripsi_menu}</p>
                          </div>
                          <div className="flex flex-row justify-between mt-2  items-center">
                            <p className="text-xs sm:text-md text-[#98694F] font-bold pr-1 sm:pr-0">{formatRupiah(menu.harga_menu)}</p>
                            <PlusMinusButton />
                            <BsFillCartPlusFill size={20} className=" text-[#98694F] my-auto pl-1 sm:pl-0" />
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
