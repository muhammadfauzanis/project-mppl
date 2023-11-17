import { BsArrowLeft, BsCartFill, BsFillCartPlusFill } from "react-icons/bs";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import PlusMinusButton from "../Components/PlusMinusButton";
import axios from "axios";
import { Helper } from "../Helper/Helper";
import { Cart } from "../Helper/Cart";
import Loading from "../Components/Loading";
import { Toast } from "../Helper/Toast";

function ProductDetail() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const reserve = params.get("reserve");
  const id_menu = params.get("menu");
  const [isLoading, setIsLoading] = useState(true);
  const { formatRupiah , baseURLAPI} = Helper();
  const { addCart, getQty } = Cart();
  const { showToastSuccess } = Toast();

  // GET PRODUCTS
  const [product, setProduct] = useState([]);
  const fetchDataMenu = async () => {
    try {
      const response = await axios.get(baseURLAPI(`menu/${id_menu}`));
      setProduct(response.data);
      
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchDataMenu();
  }, []);

  
  return (
    <div>
      <ToastContainer />
      <div className="bg-warnaBg mx-auto my-0 max-w-lg h-full pb-8">
        <div className="flex justify-between items-center bg-[#98694F] px-7 py-5">
          <Link to={`/?reserve=${reserve == null ? false : reserve}`}>
            <BsArrowLeft size={30} className="z-50 text-white" />
          </Link>
          <Link
            to={`/checkout-form?menu=${id_menu}&reserve=${reserve == null ? false : reserve}`}
          >
            <BsCartFill size={25} className="text-white" />
          </Link>
        </div>
        {isLoading ? (
          <div className="flex justify-center items-center" style={{minHeight : "calc(100vh - 105px)"}}>
            <Loading/>
          </div>
        ) : (
          <>
          {
            product ? (
            <div >
              <img
                src={product.url_gambar}
                alt=""
                className="w-full object-cover"
                style={{aspectRatio : 3/2}}
              />
              <div className="relative  mb-14">
                <div className="absolute inset-x-0 top-[-20px] flex items-center justify-center">
                  <PlusMinusButton menuId={product.id_menu}variant="detailMenu" countStart={getQty(id_menu)} />
                </div>
              </div>

              <div className="max-w-[80%] bg-white mx-auto pb-[115px]">
                <div className="flex flex-row justify-between p-5">
                  <h3 className="text-md sm:text-lg text-[#414141] font-bold">
                    {product.nama_menu}
                  </h3>
                  <p className="text-md sm:text-lg text-[#98694F] font-bold ">
                    {formatRupiah(product.harga_menu)}
                  </p>
                </div>
                <p className="p-5 text-sm h-full text-justify">
                  {product.deskripsi_menu}
                </p>
              </div>
              <button
                onClick={() => {
                  let qtyEl   = document.querySelectorAll(".qty-count")[0];
                  let qty     = parseInt(qtyEl.innerText);
                  addCart(product.id_menu,qty);
                  showToastSuccess("Hidangan ditambahkan");
                }}
                className="flex flex-row justify-between p-4 w-[80%] mx-auto mt-6  bg-[#98694F] rounded-lg "
              >
                <h3 className="text-white font-semibold">Tambah Ke Keranjang</h3>
                <BsFillCartPlusFill size={30} className="text-white" />
              </button>
            </div>
            ) : (
              <div className="flex justify-center items-center" style={{minHeight : "calc(100vh - 105px)"}}>
                <h1 className="font-bold text-lg">Menu Tidak Ditemukan</h1>
              </div>
            )
          }
          </>
        )}
      </div>
    </div>
  );
}

export default ProductDetail;
