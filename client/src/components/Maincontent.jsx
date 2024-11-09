import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import { IoSearchSharp } from "react-icons/io5";
import Maintasks from "./Maintasks";
import axios from "axios";

const Maincontent = () => {
  // state to handle the date
  const [date, setDate] = useState("");
  const [day, setDay] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());

  // task's states
  const [taskName, setTaskName] = useState("");
  const [taskDesc, setTaskDesc] = useState("");

  // get all task state
  const [allTask, setAllTask] = useState([]);

  const handleCalendarChange = (e) => {
    setSelectedDate(e);
  };

  // get date function

  // should run when the component mounts and the date state changes
  useEffect(() => {
    const getDate = () => {
      const date = selectedDate;

      const monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "august",
        "september",
        "october",
        "november",
        "december",
      ];
      const dayNames = [
        "sunday",
        "monday",
        "tuesday",
        "wednesday",
        "thursday",
        "friday",
        "saturday",
      ];
      const dt = date.getDate();

      setDay(dayNames[date.getDay()]);
      setDate(
        `${String(dt).padStart(2, "0")}, ${
          monthNames[date.getMonth()]
        } ${date.getFullYear()}`
      );
    };

    getDate();
  }, [selectedDate]);

  // function to handle the add task button
  const handleAddTask = async () => {
    const data = {
      tname: taskName,
      desc: taskDesc,
    };

    const addTask = await axios.post(
      "http://localhost:3000/user/addtasks",
      data,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
      }
    );
    const taskId = addTask.data.task_id;
    const updateTask = await axios.post(
      `http://localhost:3000/user/addtasks/${taskId}`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
      }
    );
    console.log(updateTask.data);
    setTaskName("");
    setTaskDesc("");
    alert("task created successfully!!");
  };

  const getAllTasks = async () => {
    const res = await axios.get("http://localhost:3000/user/showtasks", {
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
    });

    setAllTask(res.data);
  };

  // useEffect to render all the tasks for the specific user
  useEffect(() => {
    // setInterval(() => {
    //   getAllTasks();
    // }, 500);
    getAllTasks();
  }, [allTask]);

  return (
    <div className="w-[60%] h-[660px] m-auto bg-[#FAF7F2] mt-[2rem] rounded-xl py-[1rem] px-[1.5rem] shadow-lg">
      {/* for the top div */}
      <div className="h-[100%] w-full flex flex-row">
        {/* top-left div */}
        <div className="w-[35%] py-[0.75rem] px-[1rem] flex flex-col">
          <div className="w-full flex flex-col justify-start gap-[0.5rem]">
            <div className="text-3xl capitalize text-[#FF6666]">{day}</div>
            <div className="w-full  text-4xl capitalize font-semibold text-ellipsis">
              {date}
            </div>
          </div>
          <div className="w-full pt-[1.5rem]">
            {/* // todo : add calendar from the material UI */}
            <Calendar
              className="w-full text-center flex flex-col gap-[0.5rem] bg-white rounded-md text-lg"
              value={selectedDate}
              onChange={handleCalendarChange}
              tileClassName={({ date, view }) => {
                if (view === "month") {
                  if (
                    date.getDate() === selectedDate.getDate() &&
                    date.getMonth() === selectedDate.getMonth() &&
                    date.getFullYear() === selectedDate.getFullYear()
                  ) {
                    return "bg-[#FF6666] text-black rounded-md font-semibold text-xl";
                  }
                }
                return "hover:bg-[#FAF7F2] cursor-pointer py-[1rem] rounded-md";
              }}
            />
          </div>
          <div className="w-full h-[5rem] mt-[1rem] flex flex-row justify-between">
            <div className="w-[48%] h-full bg-[#F0D1A8] rounded-md flex flex-col items-center justify-center px-[1rem] py-[0.5rem]">
              <div className="font-semibold uppercase text-sm text-center">
                Completed Tasks
              </div>
              <div className="font-extrabold text-3xl">04</div>
            </div>
            <div className="w-[48%] h-full bg-[#C4A49F] rounded-md flex flex-col items-center justify-center px-[1rem] py-[0.5rem]">
              <div className="font-semibold uppercase text-sm text-center">
                Pending Tasks
              </div>
              <div className="font-extrabold text-3xl">15</div>
            </div>
          </div>
        </div>
        {/* top-right div */}
        <div className="w-[65%] h-full px-[1rem] py-[0.75rem]">
          <div className="w-full h-[3rem] flex flex-row justify-betwwen items-center gap-[15px]">
            <input
              type="text"
              placeholder="Title of the task"
              className="w-[30%] h-full px-[1rem] rounded-md text-sm tracking-wide bg-[#e9f3f8] border-[2px] border-[#8ec6e9] focus:outline-none focus:border-cyan-500"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Description of the task"
              className="w-[60%] h-full px-[1rem] rounded-md text-sm tracking-wide bg-[#e9f3f8] border-[2px] border-[#8ec6e9] focus:outline-none focus:border-cyan-500"
              value={taskDesc}
              onChange={(e) => setTaskDesc(e.target.value)}
            />
            <button
              className="w-[15%] h-full text-white text-4xl bg-[#5C9967] flex items-center justify-center rounded-tr-md rounded-br-md active:translate-y-[1px]"
              onClick={handleAddTask}
            >
              <div className="h-full w-full">+</div>
            </button>
          </div>
          <div className="w-full h-[2.5rem] mt-[0.75rem] flex items-center justify-between">
            <div className="h-full">
              <select
                name="Priority"
                className="h-full text-sm tracking-wide font-bold focus:outline-none cursor-pointer rounded-md px-[0.3rem]"
              >
                <option value="high" className="text-sm tracking-wide">
                  High Priority
                </option>
                <option value="less" className="text-sm tracking-wide">
                  Less Priority
                </option>
              </select>
            </div>
            <div className="h-full w-[40%] flex justify-center items-center relative ">
              <input
                type="text"
                placeholder="Search by name"
                className="bg-white h-full px-[0.5rem] text-xs rounded-tl-md rounded-bl-md focus:outline-none border-2 border-l-[#F2B258] border-t-[#F2B258] border-b-[#F2B258] outline-none"
              />
              <button className="h-full bg-white border-2 rounded-tr-md rounded-br-md border-r-[#F2B258] px-[0.5rem] border-t-[#F2B258] border-b-[#F2B258] absolute right-5">
                <IoSearchSharp />
              </button>
            </div>
          </div>
          {/* div for the main Tasks */}
          <div className="w-full h-[400px] grid grid-cols-2 mt-[0.5rem] gap-[1rem] overflow-y-hidden">
            {allTask &&
              allTask.all_tasks?.map((e, idx) => (
                <Maintasks key={idx} taskName={e.task} desc={e.desc} />
              ))}
          </div>
          <div className="w-full mt-[1rem] flex items-center justify-center">
            <button className="bg-white px-[1rem] py-[0.3rem] font-bold tracking-wider border-[3px] border-[#eeab4e] text-[#333231] rounded-md active:translate-y-[1px]">
              Load More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Maincontent;
