import { Link, useLocation } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";
import Form from "../Components/Form";
import { useEffect, useState } from "react";
import { Cart } from "../Helper/Cart";
import { Helper } from "../Helper/Helper";
import axios from "axios";

function CheckoutForm() {
  const {listCart} = Cart();
  const {baseURLAPI,formatRupiah} = Helper();
  const [totalPrice,setTotalPrice] = useState(0);

  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const reserve = params.get("reserve");
  const id_menu = params.get("menu");

  const handleTotal  = async () => {
    const response = await axios.post(baseURLAPI("order-details"),{'cart' : listCart()}).then((response)=> {
      setTotalPrice(response.data.total_price);
    });
  }

  useEffect(() => {
    handleTotal();
  },[])

  // HANDLE RESERVE
  const [reserveNumber, setReserveNumber] = useState(reserve);
  const handleReserve = (event) => {
    setReserveNumber(event.target.value);
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
        <Form
          inputId="no-meja"
          judul="Nomor Meja"
          placeholder="Masukkan nomor meja"
          value={reserveNumber === "false" ? "" : (reserveNumber)}
          onChange={handleReserve}
        />
      </div>

      <div className="w-full md:max-w-lg fixed bottom-0 bg-warnaBg flex flex-row p-3 justify-center items-center rounded-t-md">
        <h3 className="text-sm sm:text-md font-bold text-black ml-3">
          Total Bayar:{" "}
        </h3>
        <p className="text-sm sm:text-md font-bold text-black ml-1">
          {formatRupiah(totalPrice)}
          {/* Rp.17000 */}
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
