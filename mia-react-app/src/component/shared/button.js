const Button = ({ children, onClick }) => (
  <button
    className="w-full bg-gray-900 text-white p-2 rounded mt-2 
    cursor-pointer hover:bg-gray-700 hover:text-blue-300"
    onClick={onClick}
  >
    {children}
  </button>
);

export default Button;
