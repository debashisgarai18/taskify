import { RiCheckboxCircleLine } from "react-icons/ri";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import axios from "axios";
import { BACKEND_URL } from "../../config";
import { useState } from "react";

const Maintasks = ({ taskDetails, reRender }) => {
  // states
  const [stroked, setStroked] = useState(taskDetails.completed);

  // functions
  const handleChecked = async () => {
    try {
      await axios.put(
        `${BACKEND_URL}user/updateTaskStatus?taskId=${taskDetails._id}`,
        {},
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      setStroked((prev) => !prev);
      reRender();
      toast.success("The task status updated!!");
    } catch (err) {
      console.log(`Error : ${err.response.data.message}`);
      toast.error("Cannot update the task status");
    }
  };

  const deleteTask = async () => {
    try {
      const resp = await axios.delete(
        `${BACKEND_URL}user/deleteTask?taskId=${taskDetails._id}`,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      if (resp) {
        reRender();
        toast.success("The task is deleted successfully");
      }
    } catch (err) {
      console.log(`Error : ${err.response.data.message}`);
      toast.error("Cannot delete the task ");
    }
  };

  return (
    <div className="w-full h-[7rem] bg-[#F2B258] rounded-md pl-[1rem] pr-[0.5rem] py-[0.5rem] flex">
      <div className="w-[70%] h-full">
        <div className="w-full h-[80%] flex flex-col gap-[0.33rem]">
          <div
            className={`font-semibold w-full text-lg ${
              stroked && "line-through"
            } tracking-wider`}
          >
            {taskDetails.taskName.length > 15
              ? `${taskDetails.taskName.slice(0, 15)}...`
              : taskDetails.taskName}
          </div>
          <div
            className={`text-sm w-full ${
              stroked && "line-through"
            } leading-none`}
          >
            {taskDetails.description.length > 40
              ? `${taskDetails.description.slice(0, 40)}...`
              : taskDetails.description}
          </div>
        </div>
        <div className="w-full h-[20%] text-sm font-bold tracking-wider">
          <div>
            Creation Date :{" "}
            {taskDetails.createdAt.split("T")[0].split("-").reverse().join("-")}
          </div>
        </div>
      </div>
      <div className="w-[30%] h-full flex flex-col items-end justify-between text-lg text-[#333231]">
        <RiCheckboxCircleLine
          className="cursor-pointer"
          onClick={handleChecked}
        />
        <FaRegEdit className="cursor-pointer" />
        <RiDeleteBin6Line className="cursor-pointer" onClick={deleteTask} />
      </div>
    </div>
  );
};

Maintasks.propTypes = {
  taskDetails: PropTypes.object,
  reRender: PropTypes.func,
};

export default Maintasks;
