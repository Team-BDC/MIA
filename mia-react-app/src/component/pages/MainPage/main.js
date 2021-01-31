import "./main.css";
// import img1 from './anime.png';
import img1 from './TEAMBDC.png';
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
    <div className="w-full h-full bg-yellow-300">
      <div className="flex w-auto h-4/6 main justify-center item-center">
        <div className="flex w-full">
      
          <p className = "mt-24 w-full flex h-5/6 main_font text-9xl text-black justify-center items-center">Me in Animati o  n</p>
          {/* <img src ={img1} alt="h-1/6"></img> */}

        </div>
      </div>
      
      <div className="flex w-auto h-2/6 justify-center ml-60">

        <img src ={img1} alt="justify-center item-center"></img>
        {/* <CameraButton history = {history}></CameraButton>
        <FileButton history = {history}> </FileButton> */}
      </div>

    </div>

    </>
  );
}

export default Main;
