import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Helper } from '../Helper/Helper';
import { BsArrowLeft } from 'react-icons/bs';
import Loading from '../Components/Loading';

function Invoices() {

  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const invoice = params.get('no');
  const [listItem, setListItem] = useState([]);
  const [isLoad, setIsLoad] = useState(false);
  const { baseURLAPI, formatRupiah, currentDate } = Helper();

  const handleList = async () => {
    await axios
      .get(baseURLAPI('order-by-invoice/' + invoice))
      .then((response) => {
        setListItem(response.data);
        setIsLoad(true);
      });
  };

  const refreshPage = (e) => {
    e.preventDefault();
    handleList();
    setIsLoad(false);
  }

  useEffect(() => {
    handleList();
  }, []);

  return (
    <>
      <div className="max-w-lg  mx-auto bg-warnaBg ">
        <div className="py-[17px] px-6 ">
          <div className='flex justify-between'>
            <div className="">
              <h2 className="font-bold text-lg ">Jaba Caffe</h2>
              <p className="text-xs">Jl. tak pernah ada Kec. selalu ada Kab. Bandung</p>
            </div>
            <div className='font-bold text-3xl mt-2'>
              <p>{listItem.no_meja}</p>
            </div>
          </div>
        </div>

        <div className={` ${isLoad && "hidden"} flex justify-center items-center bg-white`} style={{ minHeight: "calc(100vh - 108px)" }}>
          <Loading />
        </div>
        <div className={` ${!isLoad && "hidden"}`}>
          <div className="bg-white py-[17px] px-4 rounded-sm">
            <h1 className="mb-5 text-lg text-center font-bold sm:text-xl text-[#414141]">INVOICE</h1>
            <div className="border-2 border-neutral-400 rounded-md p-3">
              <p className='text-center text-sm'>Nomor Invoice</p>
              <p className='text-xl text-center font-bold'>{listItem.nomor_invoice}</p>
            </div>
            <p className={`text-sm text-center mt-2 text-red-600 italic font-bold ${(listItem.jenis_pembayaran?.toUpperCase() !== "TUNAI" || listItem.status_pembayaran?.toUpperCase() !== "PENDING") && "hidden"} `}>* Tunjukkan nomor diatas pada kasir untuk pembayaran</p>
            <div className="border-2 mt-2 border-neutral-400 rounded-md p-3">
              <div className="flex justify-between font-bold">
                <p>Nama Pembeli</p>
                <p>{listItem.nama_pemesan}</p>
              </div>
              <div className="flex justify-between">
                <p>No Telepon</p>
                <p>{listItem.no_wa_pemesan}</p>
              </div>
            </div>
            <div className="mt-2 border-2 border-neutral-400 rounded-md p-3">
              <div className="flex justify-between">
                <p>Metode Pembayaran</p>
                <p>{listItem.jenis_pembayaran?.toUpperCase()}</p>
              </div>
              <div className="flex justify-between">
                <p>Status Pembayaran</p>
                <p className={`font-bold ${listItem.status_pembayaran?.toUpperCase() === 'PENDING' && 'text-sky-600'}`}>{listItem.status_pembayaran?.toUpperCase()}</p>
              </div>
            </div>
            <button type="button" onClick={refreshPage} className={` ${listItem.status_pembayaran?.toUpperCase() !== "PENDING" && "hidden"} text-white mt-3 bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-lg w-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800`}>Update Pembayaran</button>
            <div className="mt-[20px] border-t-2 border-neutral-400 pt-[10px] px4   ">
              <p>Makan di Tempat</p>
              <p>{currentDate(listItem.created_at)}</p>
            </div>
          </div>

          <h3 className="px-5 py-5 font-bold text-lg">Rincian Pesanan</h3>

          <div className="bg-white rounded-sm">
            {listItem.detail_order?.map((row) => {
              return (
                <div
                  key={'m_' + row.id_menu}
                  className="flex justify-between items-center px-5 py-5 border-b-2 border-neutral-400 "
                >
                  <div className=" flex gap-x-7">
                    <p>{row.menu?.nama_menu}</p>
                    <p className="text-[#98694F]">{row.jumlah_beli}x</p>
                  </div>
                  <p>
                    {formatRupiah(row.harga_beli)}
                  </p>
                </div>
              );
            })}
            <div className="flex justify-between items-center px-5 py-5 pb-5">
              <div className=" flex gap-x-7">
                <p className="font-bold">Total</p>
              </div>
              <p className="font-bold">{formatRupiah(listItem.total_price)}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Invoices;
