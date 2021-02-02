const r_Button = ({ children, onClick }) => (
    <button
      className="rounded-full light_font w-40 h-10 bg-gray-900 text-yellow-300 cursor-pointer focus:outline-none hover:bg-gray-400 hover:text-white mt-0 text-xl"       
      onClick={onClick}
    >
      {children}
    </button>
  );
  
  export default r_Button;
  