import { useEffect } from "react";

function Template(props) {
  return (
    <>
      <div className="flex w-full h-full bg-yellow-300">
        <div className="w-1/2 h-full bg-black py-40 px-28">
          <ul className="font-G text-white mt-80 text-base">
            <li className="text-yellow-300 line text-2xl">01 {props.title}</li>
          </ul>
        </div>
        <div className="w-1/2 h-full main flex justify-center items-center flex-col">
          {props.children}
        </div>
      </div>
    </>
  );
}

export default Template;
