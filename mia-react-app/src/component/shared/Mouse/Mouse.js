import React from "react";
import "./Mouse.css";

export const Mouse = () => {
  React.useEffect(() => {
    const cursor = document.querySelector(".cursor");
    document.addEventListener("mousemove", (e) => {
      cursor.style.left = e.pageX + "px";
      cursor.style.top = e.pageY + "px";
    });
  }, []);

  return <div className="cursor" />;
};

export default Mouse;
