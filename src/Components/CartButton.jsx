import { BsCartFill } from "react-icons/bs";

function CartButton() {
  return (
    <div className="h-screen fixed card-button-container">
      <div className="flex items-center justify-center absolute bottom-4 w-14 h-14 rounded-full bg-[#98694F] shadow-lg md:translate-x-44 sm:translate-x-36 translate-x-20">
        <BsCartFill size={25} className="text-white" />
      </div>
    </div>
  );
}

export default CartButton;
