import { useLocation } from 'react-router-dom';

function Navbar() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const reserve = params.get('reserve');

  return (
    <div className="flex flex-row justify-between font-bold px-9 sm:px-7 py-9">
      <img src="/logo.png" alt="" />
      <h1 className="text-lg sm:text-xl text-[#414141]">Java Caffe</h1>
      <h1 className="text-lg sm:text-xl text-[#414141]">
        {(reserve && reserve !== "false") && reserve.toUpperCase()}
      </h1>
    </div>
  );
}

export default Navbar;
