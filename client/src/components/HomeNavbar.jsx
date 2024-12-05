import { useNavigate } from "react-router-dom";

const HomeNavbar = () => {
  const nav = useNavigate();
  return (
    <div className="bg-white h-[4rem] w-screen shadow-lg">
      <div className="w-full h-full flex items-center justify-center">
        <div className="h-full px-[1rem] md:px-0 w-full md:w-[80%] flex items-center justify-between">
          <div className="text-2xl font-bold tracking-widest uppercase">
            Taskify
          </div>
          <div className="h-full w-[50%] flex justify-end items-center gap-[2px]">
            <button
              className="text-[1rem] px-[1rem] py-[0.2rem] bg-transparent rounded-md cursor-pointer tracking-wider font-semibold duration-200 active:translate-y-[2px]"
              onClick={() => nav("/signin")}
            >
              Signin
            </button>
            <button
              className="text-[1rem] px-[1rem] py-[0.2rem] rounded-full bg-[#C4A49F]/50 hover:bg-[#C4A49F] cursor-pointer tracking-wider font-semibold duration-200 active:translate-y-[2px]"
              onClick={() => nav("/signup")}
            >
              Signup
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeNavbar;
