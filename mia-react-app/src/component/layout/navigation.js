import { useState } from "react";
import Button from "../shared/button";

function Navigation() {
  const [option, setOption] = useState(0); //옵션 뭔지

  return (
    <>
      <aside className="w-80 h-screen bg-gray shadow-md w-fulll hidden sm:block">
        <div className="flex flex-col justify-between h-screen p-4 bg-gray-800">
          <div className="text-sm">
            <Button
              onClick={(e) => {
                e.preventDefault();
                setOption(1);
                window.alert("디즈니");
              }}
              buttonName="디즈니"
            >
              디즈니
            </Button>
            <Button
              onClick={(e) => {
                e.preventDefault();
                setOption(2);
                window.alert("심슨");
              }}
              buttonName="심슨"
            >
              심슨
            </Button>
            <Button
              onClick={(e) => {
                e.preventDefault();
                setOption(3);
                window.alert("일본 애니");
              }}
            >
              일본 애니메이션
            </Button>
          </div>
          <p className="text-white">선택 옵션: {option}</p>
        </div>
      </aside>
    </>

    //선택 옵션은 그냥 state확인 위한 것. 실제 구동 시 지울 것!
  );
}

export default Navigation;
