const SaveButton = ({ children, onClick }) => (
    <button
      className="rounded-full light_font w-40 h-10 bg-gray-900 text-yellow-300 cursor-pointer focus:outline-none hover:bg-gray-400 hover:text-white mt-0 text-xl"       
      onClick={onClick}
    >
      {children}사진 저장
    </button>
  );
  
  export default SaveButton;
  