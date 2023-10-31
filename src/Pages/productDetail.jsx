import { BsArrowLeft, BsCartFill, BsFillCartPlusFill } from "react-icons/bs";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { useState } from "react";
import { Link } from "react-router-dom";

function ProductDetail() {
  const [count, setCount] = useState(0); // default value nya 0

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
  return (
    <div>
      <div className="bg-slate-200 mx-auto my-0 max-w-lg h-full pb-8">
        <Link to="/" className="cursor-pointer">
          <BsArrowLeft
            size={30}
            className="z-50 absolute top-3 ml-5 text-white"
          />
        </Link>
        <img
          src="/latte2.png
        "
          alt=""
          className="w-full"
        />
        <div className="absolute inset-x-0 top-[260px] sm:top-[300px] md:top-[370px] flex items-center justify-center">
          <div className="flex justify-between bg-white w-[150px] sm:w-[180px] md:w-[210px] px-3 py-2 rounded-2xl ">
            <button onClick={decrement} className="text-[#000000]">
              <AiOutlineMinus className="text-xl sm:text-2xl" />
            </button>
            <span className="text-xl sm:text-2xl text-[#000000]">{count}</span>
            <button onClick={increment} className="text-[#000000]">
              <AiOutlinePlus className="text-xl sm:text-2xl" />
            </button>
          </div>
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
          <Link to="/checkout-form">
            <div className="flex items-center justify-center absolute top-[640px] right-12 sm:right-16 md:top-[730px] md:right-1/4 md:-translate-x-48 w-14 h-14 rounded-full bg-[#98694F] shadow-lg">
              <BsCartFill size={25} className="text-white" />
            </div>
          </Link>
        </div>
        <button className="flex flex-row justify-between p-4 w-[80%] mx-auto mt-6  bg-[#98694F] rounded-lg ">
          <h3 className="text-white font-semibold">Tambah Ke Keranjang</h3>
          <BsFillCartPlusFill size={30} className="text-white" />
        </button>
      </div>
    </div>
  );
}

export default ProductDetail;
