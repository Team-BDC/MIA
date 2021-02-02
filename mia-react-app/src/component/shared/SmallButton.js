const Button = ({ children, onClick }) => (
  <button
    className="light_font bg-gray-900 rounded-full w-56 h-16 mr-4 ml-4 text-white cursor-pointer focus:outline-none hover:bg-gray-400 hover:text-white mt-0 text-3xl"
    onClick={onClick}
  >
    {children}
  </button>
);

export default Button;
