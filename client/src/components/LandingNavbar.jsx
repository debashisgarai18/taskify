import userLogo from "../assets/jett_render_by_lynwulf_ddrsqbl-414w-2x.png";
import PropTypes from "prop-types";
import { IoMdArrowDropdown } from "react-icons/io";

const LandingNavbar = ({ updateActive }) => {
  return (
    <div className="bg-white h-[4rem] w-full shadow-lg flex items-center justify-between">
      <div className="h-full w-[60%] m-auto flex items-center justify-between">
        <div className="text-2xl font-bold tracking-widest uppercase">
          Taskify
        </div>
        <div className="flex flex-col items-center gap-[5px] cursor-pointer"
          onClick={() => updateActive((prev) => !prev)}
        >
          <div
            className="w-[2rem] h-[2rem] flex items-center rounded-[50%] bg-black overflow-hidden"
          >
            <img
              src={userLogo}
              className="h-full w-full object-contain"
              alt="userlogo"
            />
          </div>
          <div className="flex flex-row items-center">
            <div className="text-xs">Me</div>
            <div>
              <IoMdArrowDropdown />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

LandingNavbar.propTypes = {
  updateActive: PropTypes.func,
};

export default LandingNavbar;
