import "./main.css";
import img1 from './anime.png';
import CameraButton from "../../shared/CameraButton";

const FileButton = ({ history }) => (
  <button
    className="rounded-full font h-16 bg-gray-900 text-white p-2 mt-2 cursor-pointer hover:bg-gray-400 hover:text-white btn-temp text-3xl"
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
