const Button = ({ children, onClick }) => (
  <button
    className="rounded-full light_font w-40 h-10 cursor-pointer bg-gray-900 text-yellow-300  focus:outline-none hover:bg-gray-400 hover:text-white mt-0 text-xl"
    onClick={onClick}
  >
    {children}
  </button>
);

export default Button;
