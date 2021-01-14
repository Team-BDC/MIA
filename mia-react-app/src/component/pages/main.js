const CameraButton = ({ history }) => (
  <button
    className="w-full bg-gray-900 text-white p-2 rounded mt-2 cursor-pointer hover:bg-gray-700 hover:text-blue-300"
    onClick={ () => {history.push("/camera")}}
  >Upload From Camera
  </button>
);

const FileButton = ({ children, onClick }) => (
  <button
    className="w-full bg-gray-900 text-white p-2 rounded mt-2 cursor-pointer hover:bg-gray-700 hover:text-blue-300"
    onClick={onClick}
  >
    {children}
  </button>
);

function Main({history}) {
  return (
    <>
      <div>
        <CameraButton history = {history}></CameraButton>
        <FileButton>Upload From File</FileButton>
      </div>
    
    </>
  );
}

export default Main;
