import { BsArrowLeft } from 'react-icons/bs';
import { Cart } from '../Helper/Cart';
import { Helper } from '../Helper/Helper';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import PaymentMethod from '../Components/PaymentMethod';
import Loading from '../Components/Loading';

function OrderDetails() {
  let navigate    = useNavigate();
  const { listCart } = Cart();
  const { baseURLAPI, formatRupiah,currentDate } = Helper();
  const [listItem, setListItem] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [openPayment, setOpenPayment] = useState(false);
  const [orderType, setOrderType] = useState('');
  const [isSubmit, setIsSubmit] = useState(false);

  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const buyer_info  = JSON.parse(localStorage.getItem("buyer_info"));
  const reserve = buyer_info.no_meja;
  const no_hp = buyer_info.no_hp;
  const nama = buyer_info.nama;

  const handleList = async () => {
    const response = await axios
      .post(baseURLAPI('order-details'), { cart: listCart() })
      .then((response) => {
        setListItem(response.data.cart);
        setTotalPrice(response.data.total_price);
      });
  };

  

  const handleSubmit = async (methodType) => {
    const buyer_info  = JSON.parse(localStorage.getItem("buyer_info"));
    const cart        = JSON.parse(localStorage.getItem("cart"));
    const device      = navigator.userAgent;
    setIsSubmit(true);
    setOpenPayment(false);

    await axios.post(baseURLAPI("orders"),{
      nama_pemesan : buyer_info.nama,
      no_wa_pemesan : buyer_info.no_hp,
      no_meja : buyer_info.no_meja,
      jenis_pembayaran : methodType,
      status_pembayaran : orderType,
      menu  : cart,
      device_name : device
    },{withCredentials:true})
    .then((response) => {
      setIsSubmit(false);
      alert(response.data.message);
      navigate('/invoices');
    }).catch((error) => {
      setIsSubmit(false);
      alert(error?.response?.data?.message);
    })
  }

  useEffect(() => {
    handleList();
  }, []);

  return (
    <div className="max-w-lg  mx-auto bg-warnaBg ">
      <div className="flex items-center  p-3 bg-[#98694F] text-white z-50">
        <Link to={`/checkout-form?reserve=${reserve}`} className="cursor-pointer">
          <BsArrowLeft size={30} className="text-white" />
        </Link>

        <h3 className="mx-auto text-xl">Rincian Pesanan</h3>
      </div>
      <div className="flex justify-between py-[17px] px-6 ">
        <div className="">
          <h2 className="font-bold text-lg ">Jaba Caffe</h2>
          <p className="text-xs">Alamat Palsu</p>
        </div>
        <p className="text-2xl font-bold">{reserve && reserve.toUpperCase()}</p>
      </div>
      <div className="bg-white py-[17px] px-4 rounded-sm">
        <div className="border-2 border-neutral-400 rounded-md p-3">
          <div className="flex justify-between">
            <p>Nama Pembeli</p>
            <p>{nama}</p>
          </div>
          <div className="flex justify-between">
            <p>No Telepon</p>
            <p>{no_hp}</p>
          </div>
        </div>
        <div className="mt-[20px] border-t-2 border-neutral-400 pt-[10px] px4   ">
          <p>Makan di Tempat</p>
          <p>{currentDate()}</p>
        </div>
      </div>

      <h3 className="px-5 py-5 font-bold text-lg">Rincian Pesanan</h3>

      <div className="bg-white rounded-sm">
        {listItem.map((row) => {
          return (
            <div
              key={'m_' + row.id_menu}
              className="flex justify-between items-center px-5 py-5 border-b-2 border-neutral-400 "
            >
              <div className=" flex gap-x-7">
                <p>{row.nama_menu}</p>
                <p className="text-[#98694F]">{row.qty}x</p>
              </div>
              <p>
                {formatRupiah(parseInt(row.qty) * parseInt(row.harga_menu))}
              </p>
            </div>
          );
        })}
        <div className="flex justify-between items-center px-5 py-5 pb-5">
          <div className=" flex gap-x-7">
            <p className="font-bold">Total</p>
          </div>
          <p className="font-bold">{formatRupiah(totalPrice)}</p>
        </div>
      </div>

      <div className="h-[100px]"></div>
      <div className="w-full md:max-w-lg fixed  bottom-0 flex p-3 justify-center items-center gap-x-4 rounded-t-md py-[19px] bg-white py-3">
        <button
          className=" border-2 border-[#98694F] px-[20px] py-[10px] md:px-[42px] md:py-[14px] rounded-md text-[#98694F]"
          onClick={() => {setOrderType('paylater');setOpenPayment(!openPayment)}}
        >
          Bayar Nanti
        </button>
        <button
          className="bg-[#98694F] px-[20px] py-[10px] md:px-[42px] md:py-[14px] rounded-md text-white "
          onClick={() => {setOrderType('unpaid');setOpenPayment(!openPayment)}}
        >
          Bayar Sekarang
        </button>
      </div>
      <div className={`fixed transition-all duration-700 ease-in-out ${
          openPayment ? 'top-[100px] ' : 'top-full'
        } `}
      >
        {/* Payment method container */}
        <PaymentMethod handleSubmit={handleSubmit} setOpenPayment={setOpenPayment} />
      </div>
      <div className={`fixed top-0 left-0 right-0 ${!isSubmit && "hidden"} bottom-0 text-white flex items-center justify-center bg-gray-800 bg-opacity-50`}>
        <Loading/>
      </div>
    </div>
  );
}

export default OrderDetails;