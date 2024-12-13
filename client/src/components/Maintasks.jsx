import { RiCheckboxCircleLine } from "react-icons/ri";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import axios from "axios";
import { BACKEND_URL } from "../../config";
import { useState } from "react";
import ExclamationMark from "../assets/icons8-exclamation-mark-48.png";
import { GrUpdate } from "react-icons/gr";

const Maintasks = ({ taskDetails, reRender }) => {
  // states
  const [stroked, setStroked] = useState(taskDetails.completed);
  const [editEnabled, setEditEnabled] = useState(false);
  const [newTask, setNewTask] = useState("");
  const [newDesc, setNewDesc] = useState("");

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

  const handlePriorityChange = async () => {
    try {
      const resp = await axios.put(
        `${BACKEND_URL}user/chagePriority?taskId=${taskDetails._id}`,
        {},
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      if (resp) {
        toast.success("The priority is updated");
        reRender();
      }
    } catch (err) {
      console.log(`Error : ${err.response.data.message}`);
      toast.error("Cannot update the priority of the task");
    }
  };

  const handleUpdateTask = async () => {
    try {
      const resp = await axios.put(
        `${BACKEND_URL}user/updateTaskDetails?taskId=${taskDetails._id}`,
        {
          task: newTask,
          desc: newDesc,
        },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      if (resp) {
        toast.success("The task is updated successfully");
        reRender();
      }
    } catch (err) {
      toast.error("Cannot update the tasks");
    }
  };

  return (
    <div className="w-full h-fit bg-[#F2B258] rounded-md px-[1rem] py-[1rem] flex flex-col gap-[1rem]">
      <div className="w-full h-fit flex justify-between items-center">
        <div className="w-[70%] h-full flex flex-col gap-[1rem]">
          {taskDetails.priority === "low priority" && (
            <div className="w-full h-[0.3rem] rounded-full bg-green-500"></div>
          )}
          <div className="w-full h-[80%] flex flex-col gap-[0.33rem]">
            <div className="w-full flex items-center gap-[0.5rem]">
              {taskDetails.priority === "high priority" && (
                <div className="h-[2.75rem] w-[2.75rem] flex items-center justify-center">
                  <img
                    src={ExclamationMark}
                    className="w-full h-full"
                    alt="mark"
                  />
                </div>
              )}
              {editEnabled ? (
                <div className="w-full">
                  <input
                    type="text"
                    className="w-full font-bold bg-transparent outline-none"
                    defaultValue={taskDetails.taskName}
                    onChange={(e) => setNewTask(e.target.value)}
                  />
                </div>
              ) : (
                <div
                  className={`font-bold w-full text-xl ${
                    stroked && "line-through"
                  } tracking-wider`}
                >
                  {taskDetails.taskName.length > 15
                    ? `${taskDetails.taskName.slice(0, 15)}...`
                    : taskDetails.taskName}
                </div>
              )}
            </div>
            {editEnabled ? (
              <div className="w-full">
                <input
                  type="text"
                  className="w-full bg-transparent outline-none"
                  defaultValue={taskDetails.description}
                  onChange={(e) => setNewDesc(e.target.value)}
                />
              </div>
            ) : (
              <div
                className={`text-sm w-full ${
                  stroked && "line-through"
                } leading-none`}
              >
                {taskDetails.description.length > 40
                  ? `${taskDetails.description.slice(0, 40)}...`
                  : taskDetails.description}
              </div>
            )}
          </div>
          <div className="w-full h-[20%] text-sm font-bold tracking-wider">
            <div>
              Creation Date :{" "}
              {taskDetails.createdAt
                .split("T")[0]
                .split("-")
                .reverse()
                .join("-")}
            </div>
          </div>
        </div>
        <div className="w-[10%] h-full flex flex-col gap-[1rem] items-center justify-between text-xl text-[#333231]">
          <RiCheckboxCircleLine
            className="cursor-pointer"
            onClick={handleChecked}
          />
          {editEnabled ? (
            <GrUpdate className="cursor-pointer" onClick={handleUpdateTask} />
          ) : (
            <FaRegEdit
              className="cursor-pointer"
              onClick={() => setEditEnabled((prev) => !prev)}
            />
          )}
          <RiDeleteBin6Line className="cursor-pointer" onClick={deleteTask} />
        </div>
      </div>
      <div className="w-full">
        {taskDetails.priority === "low priority" ? (
          <button
            className="flex items-center gap-[0.5rem] border-[1px] border-black rounded-md p-[0.5rem]"
            onClick={handlePriorityChange}
          >
            <div className="h-[0.5rem] w-[0.5rem] rounded-full bg-red-700"></div>
            <div className="text-xs">Mark as High Priority</div>
          </button>
        ) : (
          <button
            className="flex items-center gap-[0.5rem] border-[1px] border-black rounded-md p-[0.5rem]"
            onClick={handlePriorityChange}
          >
            <div className="h-[0.5rem] w-[0.5rem] rounded-full bg-green-700"></div>
            <div className="text-xs">Mark as Low Priority</div>
          </button>
        )}
      </div>
    </div>
  );
};

Maintasks.propTypes = {
  taskDetails: PropTypes.object,
  reRender: PropTypes.func,
};

export default Maintasks;
