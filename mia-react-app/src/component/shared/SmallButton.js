const Button = ({ children, onClick }) => (
  <button
    className="rounded-full font w-56 h-16 mr-4 ml-4 bg-gray-900 text-white cursor-pointer focus:outline-none hover:bg-gray-700 hover:text-blue-300 mt-0 text-3xl"
    onClick={onClick}
  >
    {children}
  </button>
);

export default Button;
