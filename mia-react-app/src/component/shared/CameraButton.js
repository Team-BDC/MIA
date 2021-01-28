const CameraButton = ({ history }) => (
    <button
      className="rounded-full font h-16 bg-gray-900 text-white p-2 mt-2 cursor-pointer hover:bg-gray-400 hover:text-white btn-temp text-3xl"
      onClick={ () => {history.push("/camera")}}
    >Camera
    </button>
  );
  export default CameraButton;