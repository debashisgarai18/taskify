import userLogo from "../assets/jett_render_by_lynwulf_ddrsqbl-414w-2x.png";

const LandingNavbar = () => {
  return (
    <div className=" bg-white h-[4rem] w-full shadow-lg flex items-center justify-between">
      <div className="h-full w-[60%] m-auto flex items-center justify-between">
        <div className="text-2xl font-bold tracking-widest uppercase">
          Taskify
        </div>
        <div className="w-[3rem] h-[3rem] flex items-center rounded-[50%] bg-black overflow-hidden">
          <img src={userLogo} className="h-full w-full object-contain" alt="userlogo" />
        </div>
      </div>
    </div>
  );
};

export default LandingNavbar;
