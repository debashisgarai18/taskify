import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LandingNavbar from "./LandingNavbar";
import Maincontent from "./Maincontent";
import LandingFooter from "./LandingFooter";
import { toast } from "react-toastify";
import axios from "axios";
import { BACKEND_URL } from "../../config";

const Landing = () => {
  const [name, setName] = useState("");
  const [user, setUser] = useState({});
  const [isActive, setisActive] = useState(false);

  const nav = useNavigate();

  useEffect(() => {
    (async function getUserData() {
      if (!localStorage.getItem("token")) {
        toast.error("You are not Authenticated");
        nav("/signin");
      } else {
        try {
          const resp = await axios.get(`${BACKEND_URL}user/landing`, {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          });
          if (resp) {
            setUser(resp.data.user);
            setName(resp.data.user.name);
          }
        } catch (err) {
          console.log(`Error : ${err.response.data.message}`);
          toast.error("You are not Authenticated");
          nav("/signin");
        }
      }
    })();
  }, [nav]);

  return (
    <div className="w-full h-screen">
      <div className="w-full h-screen relative">
        <LandingNavbar avatar={name[0]} updateActive={setisActive} />
        <div
          className={`py-[1rem] px-[1rem] w-[10rem] md:w-[15rem] bg-[#F2EAEA] shadow-2xl absolute right-0 md:right-[19%] top-[3.7rem] rounded-md flex flex-col gap-[0.5rem] items-center justify-center ${
            isActive
              ? "duration-300 ease-out transition-all translate-y-[20%] opacity-1"
              : "duration-300 ease-out transition-all opacity-0 -translate-y-0"
          } `}
        >
          <button className="bg-[#f1ada3] flex items-center justify-center gap-[0.3rem] w-[80%] px-[1rem] py-[0.2rem] rounded-md text-white font-semibold shadow-lg">
            <div>Edit</div> <div className="hidden md:block">Profile</div>
          </button>
          <button
            className="bg-[#f37e6c] w-[80%] px-[1rem] py-[0.2rem] rounded-md text-white font-semibold shadow-lg"
            onClick={() => {
              localStorage.removeItem("token");
              nav("/");
            }}
          >
            Sign Out
          </button>
        </div>
        <div className="w-full md:px-0 px-[1rem] md:w-[50%] leading-[2.5rem] m-auto pt-[2rem] text-center text-[2.5rem] md:text-5xl tracking-wide font-semibold">
          Hello,{" "}
          <span className="uppercase text-[#f37e6c]">{name.split(" ")[0]}</span>
          , <span className="text-[#585858]">Start planning today</span>
        </div>
        <Maincontent />
        <LandingFooter />
      </div>
    </div>
  );
};
export default Landing;
