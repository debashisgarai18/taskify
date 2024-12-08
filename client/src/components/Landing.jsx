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
import MobileView from "./MobileView";

const Landing = () => {
  const [name, setName] = useState("");
  const [user, setUser] = useState({});
  const [isActive, setisActive] = useState(false);
  const [addTaskMobile, setAddTaskMobile] = useState(false);
  const [task, setTask] = useState("");
  const [desc, setDesc] = useState("");

  const nav = useNavigate();
  const { isLoading, setLoading } = useContext(LoadingContext);

  // to disable scrolling when mobile view is active
  useEffect(() => {
    if (addTaskMobile) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [addTaskMobile]);

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

  // functions

  // function to add Tasks to the DB
  const handleAddTask = () => {
    console.log(task, desc);
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="w-full h-fit md:min-h-screen">
      <div className="w-full h-full relative">
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
          <span className="uppercase font-bold text-[4rem] text-[#f37e6c] header-text italic">
            {name.split(" ")[0]}
          </span>
          , <span className="text-[#585858]">Start planning today</span>
        </div>
        <Maincontent
          task={(e) => setTask(e)}
          desc={(e) => setDesc(e)}
          add={handleAddTask}
          userData={user}
        />
        <LandingFooter />
      </div>
      {addTaskMobile && (
        <MobileView
          task={(e) => setTask(e)}
          desc={(e) => setDesc(e)}
          add={handleAddTask}
        />
      )}
      <div
        className="w-[4rem] cursor-pointer rounded-2xl h-[4rem] fixed md:hidden bottom-20 font-medium flex items-center justify-center text-white text-[3rem] bg-[#5C9967] right-[1rem] active:translate-y-[1px]"
        onClick={() => setAddTaskMobile((prev) => !prev)}
      >
        {addTaskMobile ? <RxCross2 /> : <IoMdAdd />}
      </div>
    </div>
  );
};

export default Landing;
