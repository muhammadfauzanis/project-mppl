import { BsCartFill } from "react-icons/bs";
import PropTypes from "prop-types";

CartButton.propTypes = {
  inputClassname: PropTypes.string.isRequired,
};

function CartButton({ inputClassname }) {
  return (
    <div className={inputClassname}>
      <BsCartFill size={25} className="text-white" />
    </div>
  );
}

export default CartButton;
