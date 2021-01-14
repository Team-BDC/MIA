
import React, { Component } from 'react';

function MyPage() {
  const onChange = (e) => {
  };

  const onReset = () => {
  };

  return (
    <div>
      <input placeholder="유저 네임 " /> {/* 현재 네임 띄우게 하기 */}
      <button className="w-1/5 bg-gray-900 text-white p-2 rounded mt-2 cursor-pointer hover:bg-gray-700 hover:text-blue-300"
        onClick={onChange}>네임 변경</button>
      <br></br>
      <input placeholder="이메일" /> {/* 현재 이메일 띄우게 하기 */}
      <button className="w-1/5 bg-gray-900 text-white p-2 rounded mt-2 cursor-pointer hover:bg-gray-700 hover:text-blue-300"
        onClick={onChange}>이메일 변경</button>
      <br></br>
      <br></br>
      <input placeholder="현재 비밀번호 " />
      <br></br>
      <input placeholder="바꿀 비밀번호 " />
      <br></br>
      <input placeholder="바꿀 비밀번호 확인 " />
      <button className="w-1/5 bg-gray-900 text-white p-2 rounded mt-2 cursor-pointer hover:bg-gray-700 hover:text-blue-300"
        onClick={onChange}>비밀번호 재설정</button>
      <br></br>
      <button className="w-1/3 bg-blue-900 text-white p-2 rounded mt-2 cursor-pointer hover:bg-gray-700 hover:text-blue-300"
        onClick={onReset}>로그아웃</button>
      <div>
      </div>
    </div>
  );
}


export default MyPage;
