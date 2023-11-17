import { Link, useLocation, useNavigate } from 'react-router-dom';
import { BsArrowLeft } from 'react-icons/bs';
import Form from '../Components/Form';
import { useEffect, useState } from 'react';
import { Cart } from '../Helper/Cart';
import { Helper } from '../Helper/Helper';
import axios from 'axios';
import { Toast } from '../Helper/Toast';
import { ToastContainer } from 'react-toastify';

function CheckoutForm() {
  const { listCart } = Cart();
  const { baseURLAPI, formatRupiah } = Helper();
  const { showToastError } = Toast();
  const [totalPrice, setTotalPrice] = useState(0);

  const navigate = useNavigate();

  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const buyer_info  = JSON.parse(localStorage.getItem("buyer_info"));
  const reserve = params.get('reserve');
  const id_menu = params.get('menu');

  const handleTotal = async () => {
    await axios
      .post(baseURLAPI('order-details'), { cart: listCart() })
      .then((response) => {
        setTotalPrice(response.data.total_price);
      });
  };

  useEffect(() => {
    handleTotal();
  }, []);

  // HANDLE RESERVE
  const [reserveNumber, setReserveNumber] = useState(reserve);
  const handleReserve = (event) => {
    setReserveNumber(event.target.value);
  };

  const [nama, setNama] = useState(buyer_info?.nama);
  const handleNama = (event) => {
    setNama(event.target.value);
  };

  const [noHP, setNoHP] = useState(buyer_info?.no_hp);
  const handleNoHP = (event) => {
    setNoHP(event.target.value);
  };

  const handleForm = (e) => {
    e.preventDefault();

    if(noHP === ""){
      showToastError("No HP perlu diisi!");
      return false;
    }
    if(nama === ""){
      showToastError("Nama perlu diisi!");
      return false;
    }
    if(reserveNumber === "" || reserveNumber === "false"){
      showToastError("No Meja perlu diisi!");
      return false;
    }

    const cart  = JSON.parse(localStorage.getItem("cart"));
    if(cart?.length > 0){
      localStorage.setItem("buyer_info",JSON.stringify({
        no_hp   : noHP,
        nama   : nama,
        no_meja   : reserveNumber,
      }));
      navigate(`/order-detail`);
    }else{
      showToastError("Pilih menu terlebih dahulu!");
    }

  };
  return (
    <>
      <ToastContainer/>
      <form onSubmit={handleForm} className="h-full bg-white max-w-lg mx-auto ">
        <div className="w-full bg-[#98694F]  p-5">
          <Link
            to={id_menu !== null ? `/product-detail?menu=${id_menu}` : `/?reserve=${reserveNumber}`}
            className="cursor-pointer"
          >
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
          <Form inputId="no-hp" judul="No Hp" value={noHP} onChange={handleNoHP}  placeholder="Masukkan nomor hp" />
          <Form inputId="nama" judul="Nama Pemesan" value={nama} onChange={handleNama} placeholder="Masukkan nama" />
          <Form
            inputId="no-meja"
            judul="Nomor Meja"
            placeholder="Masukkan nomor meja"
            value={
              reserveNumber === 'false' || reserveNumber === 'null'
                ? ''
                : reserveNumber && reserveNumber.toUpperCase()
            }
            onChange={handleReserve}
          />
        </div>

        <div className="w-full md:max-w-lg fixed bottom-0 bg-warnaBg flex flex-row p-3 justify-center items-center rounded-t-md">
          <h3 className="text-sm sm:text-md font-bold text-black ml-3">
            Total Bayar:{' '}
          </h3>
          <p className="text-sm sm:text-md font-bold text-black ml-1">
            {formatRupiah(totalPrice)}
            {/* Rp.17000 */}
          </p>
          <button
            type="submit"
            className="p-2 sm:p-3 w-[40%] sm:w-[50%] mx-auto bg-[#98694F] rounded-lg "
          >
            <h3 className="text-white text-sm sm:text-md font-semibold">
              Pilih metode pembayaran
            </h3>
          </button>
        </div>
      </form>
    </>
  );
}

export default CheckoutForm;
