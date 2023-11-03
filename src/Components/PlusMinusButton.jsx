import { useState } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { Cart } from "../Helper/Cart";

function PlusMinusButton(props) {
  let {countStart, variant,menuId}      = props;
  const { addCart } = Cart();

  const [count, setCount] = useState(countStart ? countStart : 0); // default value nya 0

  let styleDiv      = ``;
  let sizeButton    = '';

  switch (variant) {
    case 'detailMenu':
      styleDiv    = `flex justify-between bg-white w-[150px] sm:w-[180px] md:w-[210px] px-3 py-2 rounded-2xl `;
      sizeButton  = `text-xl sm:text-2xl`;
      break;
  
    default:
      styleDiv    = `flex justify-between border-2 border-[#d9d9d9] w-[70px] sm:w-[80px] md:w-[90px] px-1 rounded-2xl `;
      sizeButton  = `text-sm sm:text-md`;
      break;
  }
  
  // handle button tambah
  const increment = () => {
    setCount(count + 1);
    addCart(menuId,count+1);
  };

  // handle button kurang
  const decrement = () => {
    if (count > 0) {
      setCount(count - 1);
      addCart(menuId,count-1);
    }
  };

  return (
    <div className={styleDiv}>
      <button onClick={decrement} className="text-[#000000]">
        <AiOutlineMinus className={sizeButton} />
      </button>
      <span className={`${sizeButton} text-[#98694F] qty-count`}>{count}</span>

      <button onClick={increment} className="text-[#000000]">
        <AiOutlinePlus className={sizeButton} />
      </button>
    </div>
  );
}

export default PlusMinusButton;
