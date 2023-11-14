import { MdKeyboardArrowRight } from 'react-icons/md';
import { AiOutlineClose } from 'react-icons/ai';
import { useState } from 'react';

const PaymentMethod = ({ setOpenPayment }) => {
  const paymentOption = [
    { paymentName: 'QRIS', imgSrc: '/qris.svg' },
    { paymentName: 'EDC', imgSrc: '/Mastercard-logo.svg' },
    { paymentName: 'Cash', imgSrc: '/cash-icon.svg' },
  ];
  return (
    <div className="max-w-lg bg-white p-6 rounded-t-lg pb-[300px] ">
      <div className="flex items-center justify-between pb-5">
        <h1 className="text-lg font-bold">Pilih metode pembayaran</h1>
        <AiOutlineClose
          size={20}
          className="cursor-pointer"
          onClick={() => setOpenPayment(false)}
        />
      </div>
      <div className="">
        {paymentOption.map((payment) => (
          <PaymentMethodOption
            paymentName={payment.paymentName}
            imgSrc={payment.imgSrc}
          />
        ))}
      </div>
    </div>
  );
};

export default PaymentMethod;

const PaymentMethodOption = ({ imgSrc, paymentName }) => {
  return (
    <div className="flex items-center justify-between px-4 mb-5 border-2 cursor-pointer rounded-lg hover:bg-warnaBg">
      <img src={imgSrc} alt="" className="w-[20%] p-3" />
      <p className="text-lg ">{paymentName}</p>
      <MdKeyboardArrowRight size={25} />
    </div>
  );
};
