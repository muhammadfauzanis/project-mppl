function ListCategory(Props) {
  return (
    <button className="h-8 px-4 font-semibold rounded-md border-2 border-[#98694F] text-[#98694F]  focus:bg-[#98694F] focus:text-white transition duration-300 ease-in-out">
      <div className="flex items-center justify-center gap-2">
        <img src={Props.imgPath} alt="" />
        <p className=" text-sm md:text-md">{Props.text}</p>
      </div>
    </button>
  );
}

export default ListCategory;
