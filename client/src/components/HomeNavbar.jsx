import React from "react";
import { useNavigate } from "react-router-dom";

const HomeNavbar = () => {
  const nav = useNavigate();
  return (
    <div>
      <button onClick={() => nav("/signup")}>Signup</button>
      <button onClick={() => nav("/signin")}>Signin</button>
    </div>
  );
};

export default HomeNavbar;
