import { useNavigate } from "react-router-dom";

const HomeNavbar = () => {
  const nav = useNavigate();
  return (
    <div className="px-[2rem] bg-[#F2EAEA] h-[4rem] w-full shadow-lg flex items-center justify-between">
      <div className="text-3xl font-bold tracking-widest uppercase">
        Taskify
      </div>
      <div className="h-full w-[50%] flex justify-end items-center gap-[2px]">
        <button
          className="text-[1rem] px-[1rem] py-[0.2rem] bg-[#C4A49F] rounded-md cursor-pointer tracking-wider font-semibold duration-200 active:translate-y-[2px]"
          onClick={() => nav("/signup")}
        >
          Signup
        </button>
        <div className="text-sm">-or-</div>
        <button
          className="text-[1rem] px-[1rem] py-[0.2rem] bg-[#C4A49F] rounded-md cursor-pointer tracking-wider font-semibold duration-200 active:translate-y-[2px]"
          onClick={() => nav("/signin")}
        >
          Signin
        </button>
      </div>
    </div>
  );
};

export default HomeNavbar;
