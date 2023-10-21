import { useState } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

function PlusMinusButton() {
  const [count, setCount] = useState(0); // default value nya 0

  // handle button tambah
  const increment = () => {
    setCount(count + 1);
  };

  // handle button kurang
  const decrement = () => {
    if (count > 0) {
      setCount(count - 1);
    }
  };

  return (
    <div
      className={`flex justify-between border-2 border-[#d9d9d9] w-[70px] sm:w-[80px] md:w-[90px] px-1 rounded-2xl `}
    >
      <button onClick={decrement} className="text-[#000000]">
        <AiOutlineMinus className="text-sm sm:text-md" />
      </button>
      <span className="text-sm sm:text-md text-[#98694F]">{count}</span>

      <button onClick={increment} className="text-[#000000]">
        <AiOutlinePlus className="text-sm sm:text-md" />
      </button>
    </div>
  );
}

export default PlusMinusButton;
