import "./main.css";
import img1 from './anime.png';


const CameraButton = ({ history }) => (
  <button
    className="rounded-full font h-16 bg-gray-900 text-white p-2 mt-2 cursor-pointer hover:bg-gray-700 hover:text-blue-300 btn-temp text-3xl"
    onClick={ () => {history.push("/camera")}}
  >Camera
  </button>
);

const FileButton = ({ history }) => (
  <button
    className="rounded-full font h-16 bg-gray-900 text-white p-2 mt-2 cursor-pointer hover:bg-gray-700 hover:text-blue-300 btn-temp text-3xl"
    onClick={() =>{history.push("/upload")}}
  >File
  </button>
);

function Main({history}) {
  return (
    <>
      <div className="main">
        <div className="animeImage" >
          <img src ={img1} alt="main image"></img>
        </div>
        <CameraButton history = {history}></CameraButton>
        <FileButton history = {history}> </FileButton>
      </div>
    </>
  );
}

export default Main;
