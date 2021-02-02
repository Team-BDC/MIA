import { useState } from "react";
import Upload from "./UploadPage/Upload";

function Test(props) {
  const [values, setValues] = useState({});
  return (
    <>
      <div className="flex w-full h-full bg-yellow-300">
        <div className="w-1/2 h-full bg-black py-40 px-28">
          <ul className="font-G text-white mt-80 text-base">
            <li className="text-yellow-300 line text-2xl">01 페이지 업로드</li>
            <li className="text-2xl">결과</li>
          </ul>
        </div>
        <div className="w-1/2 h-full main flex justify-center items-center">
          <Upload></Upload>
        </div>
      </div>
    </>
  );
}

export default Test;
