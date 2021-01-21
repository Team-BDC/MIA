const CameraButton = ({ history }) => (
  <button
    className="w-full bg-gray-900 text-white p-2 rounded mt-2 cursor-pointer hover:bg-gray-700 hover:text-blue-300"
    onClick={ () => {history.push("/camera")}}
  >Upload From Camera
  </button>
);

const FileButton = ({ history }) => (
  <button
    className="w-full bg-gray-900 text-white p-2 rounded mt-2 cursor-pointer hover:bg-gray-700 hover:text-blue-300"
    onClick={() =>{history.push("/upload")}}
  >Upload From File
    
  </button>
);

function Main({history}) {
  return (
    <>
      <div>
        <CameraButton history = {history}></CameraButton>
        <FileButton history = {history}> </FileButton>
      </div>
    
    </>
  );
}

export default Main;
