import { Link } from "react-router-dom";
import PlusMinusButton from "./PlusMinusButton";
import { BsFillCartPlusFill } from "react-icons/bs";
import card from "../assets/card.css"

function MenuCard() {
  return (
    <div className="card mt-5 w-48 sm:w-60 " style={{display: 'flex', justifyContent: 'center' }}>
      <div className="card-body flex flex-col bg-white p-3 ml-2 mr-2 sm:ml-5 sm:mr-5 md:ml-7 md:mr-0 rounded-2xl shadow-xl ">
        <Link to="/product-detail" className="cursor-pointer">
          <img src="/latte.png" alt="" className="w-full" />
          <h3 className="text-md sm:text-lg text-[#414141] font-bold">
            Cafe Latte
          </h3>
        </Link>
        <p className="text-xs sm:text-md text-[#414141]">
          Espresso dengan susu, harmoni kopi kaya dan kelembutan susu dalam
          setiap tegukan asikkkk
        </p>
        <div className="flex flex-row justify-between mt-2  items-center">
          <p className="text-xs sm:text-md text-[#98694F] font-bold pr-1 sm:pr-0">
            17.000
          </p>
          <PlusMinusButton />
          <BsFillCartPlusFill
            size={20}
            className=" text-[#98694F] my-auto pl-1 sm:pl-0"
          />
        </div>
      </div>
    </div>
  );
}

export default MenuCard;
