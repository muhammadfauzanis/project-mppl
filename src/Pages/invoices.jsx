import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Helper } from '../Helper/Helper';

function Invoices() {

  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const invoice   = params.get('no');
  const [listItem, setListItem] = useState([]);
  const { baseURLAPI, formatRupiah,currentDate } = Helper();

  const handleList = async () => {
    await axios
    .get(baseURLAPI('order-by-invoice/'+invoice))
    .then((response) => {
      setListItem(response.data.cart);
    });
  };

  useEffect(() => {
    handleList();
  }, []);

  return (
    <div className="bg-warnaBg mx-auto my-0 max-w-lg max-h-full flex flex-col items-center gap-y-10 p-10">
      <h1 className="text-4xl font-bold">Invoices</h1>
    </div>
  );
}

export default Invoices;
