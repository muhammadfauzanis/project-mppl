import { BsArrowLeft } from "react-icons/bs";
// import { BrowserView, MobileView, isBrowser, isMobile } from 'react-device-detect';

function OrderDetails() {
  return (
    <div className="h-full max-w-lg mx-auto bg-warnaBg">
      <div className="flex items-center  p-3 bg-[#98694F] text-white">
        <BsArrowLeft size={30} />

        <h3 className="mx-auto text-xl">Rincian Pesanan</h3>
      </div>
      <div className="flex justify-between py-[17px] px-6 ">
        <div className="">
          <h2 className="font-bold text-lg ">Java Caffe</h2>
          <p className="text-xs">Alamat Palsu</p>
        </div>
        <p className="text-2xl font-bold">M8</p>
      </div>
      <div className="bg-white py-[17px] px-4 rounded-sm">
        <div className="border-2 border-neutral-400 rounded-md p-3">
          <div className="flex justify-between">
            <p>Nama Pembeli</p>
            <p>Hilmi</p>
          </div>
          <div className="flex justify-between">
            <p>No Telepon</p>
            <p>082674572373</p>
          </div>
        </div>
        <div className="mt-[20px] border-t-2 border-neutral-400 pt-[10px] px4   ">
          <p>Makan di Tempat</p>
          <p>31 Oktober 2023</p>
        </div>
      </div>

      <h3 className="px-5 py-5 font-bold text-lg">Rincian Pesanan</h3>

      <div className="bg-white rounded-sm ">
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
        </div>
        <div className="flex justify-between items-center px-5 py-5 border-b-2 border-neutral-400 ">
          <div className=" flex gap-x-7">
            <p>Cafe Latte</p>
            <p className="text-[#98694F]">1x</p>
          </div>
          <p>Rp.17.000</p>
        </div>
        <div className="flex justify-between items-center px-5 py-5 pb-5">
          <div className=" flex gap-x-7">
            <p className="font-bold">Total</p>
          </div>
          <p className="font-bold">Rp.17.000</p>
        </div>
      </div>
      <div className="w-full md:max-w-lg fixed  bottom-0 flex p-3 justify-center items-center gap-x-4 rounded-t-md mb-[29px] bg-white py-3 sm:py-0">
        <button className=" border-2 border-[#98694F] px-[20px] py-[10px] md:px-[42px] md:py-[14px] rounded-md text-[#98694F]">
          Bayar Nanti
        </button>
        <button className="bg-[#98694F] px-[20px] py-[10px] md:px-[42px] md:py-[14px] rounded-md text-white ">
          Bayar Sekarang
        </button>
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
