import { BsCartFill } from "react-icons/bs";

function CartButton() {
  return (
    <div className="bg-slate-200 max-w-lg h-screen fixed top-0" style={{ transform: 'translate(-50%,0)',left:"50%" }}>
      <div className="flex items-center justify-center absolute bottom-4 w-14 h-14 rounded-full bg-[#98694F] shadow-lg" style={{ transform: "translate(170px)" }}>
        <BsCartFill size={25} className="text-white" />
      </div>
    </div>
  );
}

export default CartButton;
