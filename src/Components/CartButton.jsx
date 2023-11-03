import { BsCartFill } from "react-icons/bs";
import { Cart } from "../Helper/Cart";


function CartButton() {
  const {countCart} = Cart();
  return (
    <div className="h-screen fixed card-button-container">
      <div className="flex items-center justify-center absolute bottom-4 w-14 h-14 rounded-full bg-[#98694F] shadow-lg md:translate-x-44 sm:translate-x-36 translate-x-20">
        {countCart > 0 && (
          <span class="absolute bg-red-500 text-white text-xs font-medium  px-2.5 py-0.5 rounded-full top-0 left-0">{countCart}</span>
        )}
        <BsCartFill size={25} className="text-white" />
      </div>
    </div>
  );
}

export default CartButton;
