const SaveButton = ({ children, onClick }) => (
    <button
      className="rounded-full font w-44 h-16 ml-2 mr-2 px-2 bg-gray-900 text-white cursor-pointer focus:outline-none hover:bg-gray-400 hover:text-white mt-0 text-3xl"       
      onClick={onClick}
    >
      {children}Save
    </button>
  );
  
  export default SaveButton;
  