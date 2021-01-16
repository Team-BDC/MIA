const Button = ({ children, onClick }) => (
  <button
    className="w-300 bg-gray-900 text-white p-5
    border-solid border-2 border-gray-900 rounded m-5
    cursor-pointer hover:bg-gray-700 hover:text-blue-300"
    onClick={onClick}
  >
    {children}
  </button>
);

export default Button;
