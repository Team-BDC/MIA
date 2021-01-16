const BackButton = ({ children, onClick }) => (
  <button
    className="w-300 text-gray-700 p-5
    border-solid border-2 border-gray-700 
    rounded m-5 cursor-pointer 
    hover:bg-gray-700 hover:text-white"
    onClick={onClick}
  >
    {children}
  </button>
);

export default BackButton;
