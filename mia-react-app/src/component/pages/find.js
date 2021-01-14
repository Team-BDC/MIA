import React, { Component } from 'react';

function find() {
  const onChange = (e) => {

  };
  
  const onReset = () => {
  };
  
  return (
    <div>
      <input placeholder="이메일을 입력하세요 " /> 
      <button className="w-1/5 bg-gray-900 text-white p-2 rounded mt-2 cursor-pointer hover:bg-gray-700 hover:text-blue-300"
        onClick={onChange}>확인</button>
         {/*이메일 존재하면 아이디랑 비번 출력(ex: id : mi**i password : 1**4  -> 요런식,,? 어떠신지 ,,*/}
      <br></br>

    </div>
  );
}


export default find;
