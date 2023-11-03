import { Link, useLocation } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";
import Form from "../Components/Form";
import { useState } from "react";

function CheckoutForm() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const reserve = params.get("reserve");
  const id_menu = params.get("menu");

  const [nomorMeja, setNomorMeja] = useState(reserve);

  const handleNomorMejaChange = (event) => {
    setNomorMeja(event.target.value);
  };
  return (
    <div className="h-full bg-white max-w-lg mx-auto ">
      <div className="w-full bg-[#98694F]  p-5">
        <Link to={id_menu !== null ? `/product-detail?menu=${id_menu}` : `/`} className="cursor-pointer">
          <BsArrowLeft size={30} className="text-white" />
        </Link>
      </div>

      <div className="p-5 bg-warnaBg ">
        <h3 className="font-bold text-lg">Informasi Pembeli</h3>
        <p className="text-md">
          Untuk pengiriman bukti faktur pembelian dan pengiriman
        </p>
      </div>

      <div className="w-full mt-3 pb-80 ">
        <Form inputId="no-hp" judul="No Hp" placeholder="Masukkan nomor hp" />
        <Form inputId="nama" judul="Nama Pemesan" placeholder="Masukkan nama" />
        <form action="" className="flex flex-col py-3 mx-auto w-[90%] bg-white">
          <label className="font-bold">
            Nomor Meja
          </label>
          <input
            type="text"
            id="no-meja"
            value={nomorMeja === "false" ? " " : (nomorMeja)}
            placeholder="Nomor meja"
            onChange={handleNomorMejaChange}
            className="border-2 border-[#98694F] p-4 rounded-lg"
          />
        </form>
      </div>

      <div className="w-full md:max-w-lg fixed bottom-0 bg-warnaBg flex flex-row p-3 justify-center items-center rounded-t-md">
        <h3 className="text-sm sm:text-md font-bold text-black ml-3">
          Total Bayar:{" "}
        </h3>
        <p className="text-sm sm:text-md font-bold text-black ml-1">
          {" "}
          Rp.17000
        </p>
        <button className="p-2 sm:p-3 w-[40%] sm:w-[50%] mx-auto bg-[#98694F] rounded-lg ">
          <h3 className="text-white text-sm sm:text-md font-semibold">
            Pilih metode pembayaran
          </h3>
        </button>
      </div>
    </div>
  );
}

export default CheckoutForm;
