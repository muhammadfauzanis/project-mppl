import { BsArrowLeft, BsCartFill, BsFillCartPlusFill } from "react-icons/bs";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PlusMinusButton from "../Components/PlusMinusButton";

function ProductDetail() {
  const [count, setCount] = useState(0);
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const reserve = params.get("reserve");

  // handle button tambah
  const increment = () => {
    setCount(count + 1);
  };

  // handle button kurang
  const decrement = () => {
    if (count > 0) {
      setCount(count - 1);
    }
  };

  // TOAST SUKSES
  const showToastSuccess = (msg) => {
    toast.success(msg, {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };
  return (
    <div>
      <ToastContainer />
      <div className="bg-warnaBg mx-auto my-0 max-w-lg h-full pb-8">
        <div className="flex justify-between items-center  bg-[#98694F] px-7 py-5">
          <Link to="/">
            <BsArrowLeft size={30} className="z-50 text-white" />
          </Link>
          <Link
            to={`/checkout-form?reserve=${reserve == null ? false : reserve}`}
          >
            <BsCartFill size={25} className="text-white" />
          </Link>
        </div>
        <img
          src="/latte2.png"
          alt=""
          className="w-full"
        />
        <div className="absolute inset-x-0 top-[330px] sm:top-[360px] md:top-[450px] flex items-center justify-center">
          <PlusMinusButton variant="detailMenu" />
        </div>

        <div className="max-w-[80%] bg-white mx-auto pb-[115px]">
          <div className="flex flex-row justify-between p-5">
            <h3 className="text-md sm:text-lg text-[#414141] font-bold">
              Cafe Latte
            </h3>
            <p className="text-md sm:text-lg text-[#98694F] font-bold ">
              Rp. 17.000
            </p>
          </div>
          <p className="p-5 text-sm h-full">
            Cafe latte, sering disebut hanya sebagai adalah minuman kopi
            berbasis espresso yang populer dan klasik yang berasal dari Italia
            dan telah mendapatkan popularitas luas di seluruh dunia dunia. Nama
            LATTE berasal dari kata Italia untuk susu,dan minuman ini ditandai
            dengan tekstur yang halus dan krim.
          </p>
        </div>
        <button
          onClick={() => {
            showToastSuccess("Hidangan ditambahkan");
          }}
          className="flex flex-row justify-between p-4 w-[80%] mx-auto mt-6  bg-[#98694F] rounded-lg "
        >
          <h3 className="text-white font-semibold">Tambah Ke Keranjang</h3>
          <BsFillCartPlusFill size={30} className="text-white" />
        </button>
      </div>
    </div>
  );
}

export default ProductDetail;
