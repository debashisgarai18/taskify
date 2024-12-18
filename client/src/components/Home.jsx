import { useNavigate } from "react-router-dom";
import HomeNavbar from "./HomeNavbar";

const Home = () => {
  const nav = useNavigate();
  return (
    <>
      <HomeNavbar />
      <div
        className="w-full flex justify-center"
        style={{ height: `calc(100vh - 4rem)` }}
      >
        <div className="w-full md:w-[80%] h-[200px]">
          {/* Signup-with-text-div */}
          <div className="text-center w-full md:w-[60%] mx-auto pt-[3rem] tracking-wider flex flex-col gap-[1rem] items-center">
            <div className="text-black text-6xl leading-[4.5rem] md:leading-[5rem] font-bold w-full">
              Finally, get your <span className="text-[#f37e6c]">life</span> and{" "}
              <span className="text-[#f37e6c]">work</span> organized.
            </div>
            <div className="text-black/50 leading-[2rem] text-2xl max-w-[70%] m-auto">
              With the help of this task manager and to-do list app, simplify
              your life.
            </div>
            <div className="w-[40%] md:w-[25%] relative mt-[1rem]">
              <button
                className=" bg-[#ea5740] w-full py-[0.5rem] text-xl font-semibold hover:translate-y-[3px] rounded-md shadow-md hover:bg-[#ee523a] text-white"
                onClick={() => nav("/signup")}
              >
                Let&apos;s Explore
              </button>
              <div className="h-[3rem] w-full bg-[#efc199] absolute top-[3px] z-[-1] left-0 rounded-md shadow-md"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
