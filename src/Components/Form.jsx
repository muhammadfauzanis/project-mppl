import PropTypes from "prop-types";

Form.propTypes = {
  inputId: PropTypes.string.isRequired,
  judul: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
};

function Form({ inputId, judul, placeholder }) {
  return (
    <form action="" className="flex flex-col py-3 mx-auto w-[90%] bg-white">
      <label htmlFor={inputId} className="font-bold">
        {judul}
      </label>
      <input
        type="text"
        id={inputId}
        placeholder={placeholder}
        className="border-2 border-[#98694F] p-4 rounded-lg"
      />
    </form>
  );
}

export default Form;
