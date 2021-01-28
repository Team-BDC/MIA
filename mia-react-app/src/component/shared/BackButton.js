import { Link } from 'react-router-dom'

const BackButton = ({ children, onClick }) => (
  <Link to="/upload"> 
    <button
      className="font rounded-full w-auto h-16 mr-4 ml-4 px-4 text-gray-700
      border-solid border-2 border-gray-700 
      rounded m-5 cursor-pointer
      hover:bg-gray-700 hover:text-white text-2xl"
      // onClick={onClick}
      // const path = '/upload'
    >
      {/* {children} */}
      back
    </button>
  </Link>
);

export default BackButton;
