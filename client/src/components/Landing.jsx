import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LandingNavbar from "./LandingNavbar";
import Maincontent from "./Maincontent";
import LandingFooter from "./LandingFooter";

const Landing = () => {
  const [name, setName] = useState("");
  const [isActive, setisActive] = useState(false);


  const nav = useNavigate();
  const getUserData = async () => {
    const res = await fetch("http://localhost:3000/user/landing", {
      method: "GET",
      credentials: "include",
    });
    const jsonConData = await res.json();

    // check if someone directly accessed the /landing endpoint without the jwt token then it should redirect to the signin page to sign in
    if (jsonConData.message === "No token Provided!!") {
      return;
    }
    // else should set the name of the user
    else {
      setName(jsonConData.name);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  const handleSignIn = () => {
    nav("/signin");
  };


  return (
    
    <div className="w-full h-screen">
      {name ? (
        <div className="w-full h-screen relative">
          <LandingNavbar updateActive = {setisActive}/>
          <div
          className={`py-[1rem] px-[1rem] w-[15rem] bg-[#F2EAEA] shadow-2xl absolute right-[19%] top-[3.7rem] rounded-md flex flex-col gap-[0.5rem] items-center justify-center ${
            isActive ? "duration-300 ease-out transition-all translate-y-[20%] opacity-1" : "duration-300 ease-out transition-all opacity-0 -translate-y-0"
          } `}
        >
          <button className="bg-[#f1ada3] w-[80%] px-[1rem] py-[0.2rem] rounded-md text-white font-semibold shadow-lg">Edit Profile</button>
          <button className="bg-[#f37e6c] w-[80%] px-[1rem] py-[0.2rem] rounded-md text-white font-semibold shadow-lg">Sign Out</button>
        </div>
          <div className="w-[60%] m-auto pt-[2rem] text-center text-5xl tracking-wide font-semibold">
            Hello, <span className="uppercase text-[#f37e6c]">{name}</span>, <span className="text-[#585858]">Start planning today</span>
          </div>
          
          <Maincontent />
          <LandingFooter />
        </div>
      ) : (
        <div className="w-full text-center font-bold tracking-wider text-5xl">
          Please{" "}
          <span
            className="text-[#f37e6c] underline cursor-pointer"
            onClick={handleSignIn}
          >
            Sign in
          </span>{" "}
          to proceed !!!
        </div>
      )}
    </div>
  );
};
export default Landing;
