import React from "react";
import { RiCheckboxCircleLine } from "react-icons/ri";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";

const Maintasks = () => {
  return (
    <div className="w-full h-[7rem] bg-[#F2B258] rounded-md pl-[1rem] pr-[0.5rem] py-[0.5rem] flex">
      <div className="w-[70%] h-full">
        <div className="w-full h-[80%] text-xs flex flex-col gap-[0.33rem]">
          <div className="font-bold tracking-wider">Learning ReactJS</div>
          <div className="text-[8px] leading-none">
            Complete the State management by Context API and Recoil part in
            React
          </div>
        </div>
        <div className="w-full h-[20%] text-xs font-bold tracking-wider">
          <div>Start Date : &nbsp; &nbsp; 09-08-2024</div>
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

export default Maintasks;
