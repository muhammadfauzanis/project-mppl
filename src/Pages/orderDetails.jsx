import { BsArrowLeft } from 'react-icons/bs';
import { Cart } from '../Helper/Cart';
import { Helper } from '../Helper/Helper';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';
import PaymentMethod from '../Components/PaymentMethod';
// import { BrowserView, MobileView, isBrowser, isMobile } from 'react-device-detect';
import { MdKeyboardArrowRight } from 'react-icons/md';
import { AiOutlineClose } from 'react-icons/ai';

function OrderDetails() {
  const { listCart } = Cart();
  const { baseURLAPI, formatRupiah } = Helper();
  const [listItem, setListItem] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [dateTime, setDateTime] = useState('');
  const [openPayment, setOpenPayment] = useState(false);

  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const reserve = params.get('reserve');
  const no_hp = params.get('no_hp');
  const nama = params.get('nama');

  const handleList = async () => {
    const response = await axios
      .post(baseURLAPI('order-details'), { cart: listCart() })
      .then((response) => {
        setListItem(response.data.cart);
        setTotalPrice(response.data.total_price);
      });
  };

  const handleDateTime = () => {
    const M_Date = new Date();
    let year = M_Date.getFullYear();
    let date = M_Date.getDate() > 9 ? M_Date.getDate() : '0' + M_Date.getDate();
    let monthIndex = M_Date.getMonth();
    let month = '';

    switch (monthIndex) {
      case 0:
        month = 'Januari';
        break;

      case 1:
        month = 'Februari';
        break;

      case 2:
        month = 'Maret';
        break;

      case 3:
        month = 'April';
        break;

      case 4:
        month = 'Mei';
        break;

      case 5:
        month = 'Juni';
        break;

      case 6:
        month = 'Juli';
        break;

      case 7:
        month = 'Agustus';
        break;

      case 8:
        month = 'September';
        break;

      case 9:
        month = 'Oktober';
        break;

      case 10:
        month = 'November';
        break;

      case 11:
        month = 'Desember';
        break;
    }
    setDateTime(`${date} ${month} ${year}`);
  };

  useEffect(() => {
    handleList();
    handleDateTime();
  }, []);

  return (
    <div className="max-w-lg mx-auto bg-warnaBg ">
      <div className="flex items-center  p-3 bg-[#98694F] text-white z-50">
        <Link to={`/checkout-form?reserve=false`} className="cursor-pointer">
          <BsArrowLeft size={30} className="text-white" />
        </Link>

        <h3 className="mx-auto text-xl">Rincian Pesanan</h3>
      </div>
      <div className="flex justify-between py-[17px] px-6 ">
        <div className="">
          <h2 className="font-bold text-lg ">Java Caffe</h2>
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
          <p>{dateTime}</p>
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
        {/* <div className="flex justify-between items-center px-5 py-5 border-b-2 border-neutral-400 ">
          <div className=" flex gap-x-7">
            <p>Cafe Latte</p>
            <p className="text-[#98694F]">1x</p>
          </div>
          <p>Rp.17.000</p>
        </div>
        <div className="flex justify-between items-center px-5 py-5 border-b-2 border-neutral-400 ">
          <div className=" flex gap-x-7">
            <p>Cafe Latte</p>
            <p className="text-[#98694F]">1x</p>
          </div>
          <p>Rp.17.000</p>
        </div>
        <div className="flex justify-between items-center px-5 py-5 border-b-2 border-neutral-400 ">
          <div className=" flex gap-x-7">
            <p>Cafe Latte</p>
            <p className="text-[#98694F]">1x</p>
          </div>
          <p>Rp.17.000</p>
        </div> */}
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
          onClick={() => setOpenPayment(!openPayment)}
        >
          Bayar Nanti
        </button>
        <button
          className="bg-[#98694F] px-[20px] py-[10px] md:px-[42px] md:py-[14px] rounded-md text-white "
          onClick={() => setOpenPayment(!openPayment)}
        >
          Bayar Sekarang
        </button>
      </div>
      <div
        className={`absolute transition-all duration-700 ease-in-out  ${
          openPayment ? 'top-[100px] ' : 'top-full'
        } `}
      >
        <div className=" bg-white h-[80%] w-full p-6 rounded-t-lg pb-[350px]">
          <div className="flex items-center justify-between pb-5">
            <h1 className="text-lg font-bold">Pilih metode pembayaran</h1>
            <AiOutlineClose
              size={20}
              className="cursor-pointer"
              onClick={() => setOpenPayment(!openPayment)}
            />
          </div>
          <div className="mb-5 ">
            <div className="flex items-center justify-between px-4 mb-5 border-2 cursor-pointer">
              <div className="flex items-center gap-x-20">
                <img src="/qris.svg" alt="" className="w-[20%]" />
                <p>QRIS</p>
              </div>
              <MdKeyboardArrowRight size={20} />
            </div>
            <div className="flex items-center justify-between px-4 mb-5 border-2 cursor-pointer">
              <div className="flex items-center gap-x-20">
                <img src="/qris.svg" alt="" className="w-[20%]" />
                <p>QRIS</p>
              </div>
              <MdKeyboardArrowRight size={20} />
            </div>
            <div className="flex items-center justify-between px-4 mb-5 border-2 cursor-pointer">
              <div className="flex items-center gap-x-20">
                <img src="/qris.svg" alt="" className="w-[20%]" />
                <p>QRIS</p>
              </div>
              <MdKeyboardArrowRight size={20} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderDetails;

// import { useState, useEffect } from "react";
// function OrderDetails() {
//   const [userDevice, setUserDevice] = useState("");

//   useEffect(() => {
//     const userAgent = navigator.userAgent;
//     setUserDevice(userAgent);
//   }, []);

//   return (
//     <div>
//       <h2>Informasi Perangkat Pengguna</h2>
//       <p>Nama Perangkat: {userDevice}</p>
//     </div>
//   );
// }

// export default OrderDetails;
