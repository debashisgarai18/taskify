import { RiCheckboxCircleLine } from "react-icons/ri";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import PropTypes from "prop-types";

const Maintasks = ({ taskDetails }) => {
  return (
    <div className="w-full h-[7rem] bg-[#F2B258] rounded-md pl-[1rem] pr-[0.5rem] py-[0.5rem] flex">
      <div className="w-[70%] h-full">
        <div className="w-full h-[80%] flex flex-col gap-[0.33rem]">
          <div className="font-semibold w-full text-lg tracking-wider">
            {taskDetails.taskName}
          </div>
          <div className={`text-sm w-full leading-none`}>
            {taskDetails.description.length > 10
              ? `${taskDetails.description.slice(0, 10)}...`
              : taskDetails.description}
          </div>
        </div>
        <div className="w-full h-[20%] text-sm font-bold tracking-wider">
          <div>
            Start Date :{" "}
            {taskDetails.createdAt.split("T")[0].split("-").reverse().join("-")}
          </div>
        </div>
      </div>
      <div className="w-[30%] h-full flex flex-col items-end justify-between text-lg text-[#333231]">
        <RiCheckboxCircleLine className="cursor-pointer" />
        <FaRegEdit className="cursor-pointer" />
        <RiDeleteBin6Line className="cursor-pointer" />
      </div>
    </div>
  );
};

Maintasks.propTypes = {
  taskDetails: PropTypes.object,
};

export default Maintasks;
