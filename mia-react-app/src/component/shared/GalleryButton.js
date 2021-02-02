// // import { Link } from 'react-router-dom'

const GalleryButton = ({ children, onClick }) => (
    <button
      className="rounded-full light_font w-40 h-10 bg-gray-900 text-yellow-300 cursor-pointer focus:outline-none hover:bg-gray-400 hover:text-white mt-0 text-xl"       
      onClick={onClick}
    >
      {children}
      갤러리에 추가
    </button>
  );
  
  export default GalleryButton;


  
