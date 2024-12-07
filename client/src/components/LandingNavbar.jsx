import PropTypes from "prop-types";
import { IoMdArrowDropdown } from "react-icons/io";

const LandingNavbar = ({ avatar, updateActive }) => {
  return (
    <div className="bg-white h-[4rem] w-full shadow-lg flex items-center justify-between">
      <div className="h-full w-full px-[1rem] md:px-0 md:w-[60%] m-auto flex items-center justify-between">
        <div className="text-2xl font-bold tracking-widest uppercase">
          Taskify
        </div>
        <div
          className="flex flex-col items-center gap-[5px] cursor-pointer"
          onClick={() => updateActive((prev) => !prev)}
        >
          <div className="w-[2rem] h-[2rem] flex items-center justify-center rounded-[50%] bg-black overflow-hidden">
            <div className="uppercase text-white font-medium">{avatar}</div>
          </div>
          <div className="md:flex hidden flex-row items-center ">
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
  avatar: PropTypes.string,
  updateActive: PropTypes.func,
};

export default LandingNavbar;
