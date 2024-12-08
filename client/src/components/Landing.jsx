import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LandingNavbar from "./LandingNavbar";
import Maincontent from "./Maincontent";
import LandingFooter from "./LandingFooter";
import { toast } from "react-toastify";
import axios from "axios";
import { BACKEND_URL } from "../../config";
import Loader from "./Loader";
import { LoadingContext } from "../../context";
import { IoMdAdd } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";

const Landing = () => {
  const [name, setName] = useState("");
  const [user, setUser] = useState({});
  const [isActive, setisActive] = useState(false);
  const [addTaskMobile, setAddTaskMobile] = useState(false);

  const nav = useNavigate();
  const { isLoading, setLoading } = useContext(LoadingContext);

  useEffect(() => {
    (async function getUserData() {
      if (!localStorage.getItem("token")) {
        toast.error("You are not Authenticated");
        nav("/signin");
      } else {
        try {
          setLoading((prev) => !prev);
          const resp = await axios.get(`${BACKEND_URL}user/landing`, {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          });
          if (resp) {
            setLoading((prev) => !prev);
            setUser(resp.data.user);
            setName(resp.data.user.name);
          }
        } catch (err) {
          setLoading((prev) => !prev);
          console.log(`Error : ${err.response.data.message}`);
          toast.error("You are not Authenticated");
          nav("/signin");
        }
      }
    })();
  }, [nav, setLoading]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="w-full min-h-screen">
      <div className="w-full min-h-screen relative px-[1rem] md:px-0">
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
        <div className="w-full md:px-0 px-[1rem] md:w-[50%] leading-[2.5rem] pt-[1rem] m-auto text-center text-[2.5rem] md:text-5xl tracking-wide font-semibold">
          Hello,{" "}
          <span className="uppercase text-[#f37e6c]">{name.split(" ")[0]}</span>
          , <span className="text-[#585858]">Start planning today</span>
        </div>
        <Maincontent mobileView={addTaskMobile} />
        {addTaskMobile && (
          <div className="fixed w-[70%] bg-green-300 px-[0.75rem] py-[0.5rem] right-[1rem] bottom-[9.75rem] flex flex-col gap-[1rem]">
            <div className="text-xl font-medium">Add Task</div>
            <input
              type="text"
              placeholder="Enter the task"
              className=" w-full py-[0.5rem] px-[1rem] rounded-lg text-sm tracking-wide bg-[#e9f3f8] border-[2px] border-[#8ec6e9] focus:outline-none focus:border-cyan-500"
            />
            <input
              type="text"
              placeholder="Enter the description"
              className=" w-full py-[0.5rem] px-[1rem] rounded-lg text-sm tracking-wide bg-[#e9f3f8] border-[2px] border-[#8ec6e9] focus:outline-none focus:border-cyan-500"
            />
            <button className=" cursor-pointer rounded-lg font-medium text-white text-xl py-[0.5rem] bg-[#5C9967] active:translate-y-[1px]">
              Add
            </button>
          </div>
        )}
        <div
          className="w-[4rem] cursor-pointer rounded-2xl h-[4rem] fixed md:hidden bottom-20 font-medium flex items-center justify-center text-white text-[3rem] bg-[#5C9967] right-[1rem] active:translate-y-[1px]"
          onClick={() => setAddTaskMobile((prev) => !prev)}
        >
          {addTaskMobile ? <RxCross2 /> : <IoMdAdd />}
        </div>
        <LandingFooter />
      </div>
    </div>
  );
};

export default Landing;
