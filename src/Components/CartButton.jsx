import { BsCartFill } from "react-icons/bs";

function CartButton() {
  return (
    <div className="flex items-center justify-center fixed bottom-4 right-4 sm:bottom-4 md:right-1/4 md:-translate-x-60 bottom-4 md:right-1/4 md:-translate-x-60 w-14 h-14 rounded-full bg-[#98694F] shadow-lg">
      <BsCartFill size={25} className="text-white" />
    </div>
  );
}

export default CartButton;
