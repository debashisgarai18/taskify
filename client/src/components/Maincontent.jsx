import { useEffect, useState } from "react";
import { IoSearchSharp } from "react-icons/io5";
import Maintasks from "./Maintasks";
import TaskifyCalendar from "./Calendar";
import PropTypes from "prop-types";
import axios from "axios";
import { BACKEND_URL } from "../../config";
import TaskLoading from "./TaskLoading";

const Maincontent = ({ task, desc, add, createDate }) => {
  // states
  const [showDate, setShowDate] = useState("");
  const [day, setDay] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [pendingTasks, setPendingTasks] = useState(null);
  const [completedTasks, setCompletedTasks] = useState(null);
  const [filteredTasksByDate, setFilteredTasksByDate] = useState([]);
  const [taskLoading, setTaskLoading] = useState(false);
  const [forceRerenderOnFetchData, setForceRerenderOnFetchData] =
    useState(false);
  const [priority, setPriority] = useState("low");
  const [searchedString, setSearchedString] = useState("");

  const handleCalendarChange = (date) => {
    const selDate = date ? date?.toDate() : new Date();
    setSelectedDate(selDate);
    createDate(selDate.toISOString());
  };

  useEffect(() => {
    const date = selectedDate;
    const dt = date.getDate();
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

    setDay(dayNames[date.getDay()]);
    setShowDate(
      `${String(dt).padStart(2, "0")}, ${
        monthNames[date.getMonth()]
      } ${date.getFullYear()}`
    );
  }, [selectedDate]);

  useEffect(() => {
    (async function getTasks() {
      if (localStorage.getItem("token")) {
        try {
          setTaskLoading((prev) => !prev);
          const resp = await axios.get(
            `${BACKEND_URL}user/showTasks?date=${selectedDate
              .toLocaleString("en-GB")
              .split(",")[0]
              .split("/")
              .reverse()
              .join("-")}&priority=${priority}`,
            {
              headers: {
                Authorization: localStorage.getItem("token"),
              },
            }
          );
          if (resp) {
            setTaskLoading((prev) => !prev);
            setCompletedTasks(resp.data.completedCount);
            setPendingTasks(resp.data.pendingCount);
            setFilteredTasksByDate(resp.data.filter);
          }
        } catch (err) {
          console.log(err);
        }
      }
    })();
  }, [selectedDate, forceRerenderOnFetchData, priority]);

  // functions
  // demo debouncing
  const debouncedFunction = (func, delay) => {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => func(...args), delay);
    };
  };

  const setDebouncedValue = debouncedFunction(
    (e) => setSearchedString(e.target.value),
    300
  );

  return (
    <div className="w-full md:w-[60%] mb-[5rem] md:mb-0 relative m-auto bg-[#FAF7F2] mt-[2rem] rounded-xl py-[1rem] px-[1.5rem] shadow-lg">
      {/* for the top div */}
      <div className="w-full flex flex-col md:flex-row">
        {/* top-left div */}
        <div className="md:w-[35%] w-full py-[0.75rem] px-[1rem] flex flex-col">
          <div className="w-full flex flex-col justify-start gap-[0.5rem]">
            <div className="text-[3rem] capitalize font-medium italic text-[#FF6666] header-text">
              {day}
            </div>
            <div className="w-full  text-4xl capitalize font-semibold text-ellipsis">
              {showDate}
            </div>
          </div>
          <div className="w-full pt-[1.5rem]">
            <TaskifyCalendar
              selectedDate={selectedDate}
              handleDateChange={handleCalendarChange}
            />
          </div>
          <div className="w-full h-[5rem] mt-[1rem] flex flex-row justify-between">
            <div className="w-[48%] h-full bg-[#F0D1A8] rounded-md flex flex-col items-center justify-center px-[1rem] py-[0.5rem]">
              <div className="font-semibold uppercase text-sm text-center">
                Completed Tasks
              </div>
              <div className="font-extrabold text-3xl">
                {completedTasks < 10 ? `0${completedTasks}` : completedTasks}
              </div>
            </div>
            <div className="w-[48%] h-full bg-[#C4A49F] rounded-md flex flex-col items-center justify-center px-[1rem] py-[0.5rem]">
              <div className="font-semibold uppercase text-sm text-center">
                Pending Tasks
              </div>
              <div className="font-extrabold text-3xl">
                {pendingTasks < 10 ? `0${pendingTasks}` : pendingTasks}
              </div>
            </div>
          </div>
        </div>
        {/* top-right div */}
        <div className="w-full md:w-[65%] h-full px-[1rem] py-[0.75rem]">
          <div className="w-full h-[3rem] hidden md:flex flex-row justify-betwwen items-center gap-[15px]">
            {searchedString}
            <input
              type="text"
              placeholder="Title of the task"
              className="w-[30%] h-full px-[1rem] rounded-md text-sm tracking-wide bg-[#e9f3f8] border-[2px] border-[#8ec6e9] focus:outline-none focus:border-cyan-500"
              onChange={(e) => task(e.target.value)}
            />
            <input
              type="text"
              placeholder="Description of the task"
              className="w-[60%] h-full px-[1rem] rounded-md text-sm tracking-wide bg-[#e9f3f8] border-[2px] border-[#8ec6e9] focus:outline-none focus:border-cyan-500"
              onChange={(e) => desc(e.target.value)}
            />
            <button
              className="w-[15%] h-full text-white text-4xl bg-[#5C9967] flex items-center justify-center rounded-tr-md rounded-br-md active:translate-y-[1px]"
              onClick={add}
            >
              <div className="h-full w-full">+</div>
            </button>
          </div>
          <div className="w-full h-[2.5rem] mt-[0.75rem] flex items-center justify-between">
            <div className="h-full">
              <select
                name="Priority"
                value={priority}
                className="h-full text-sm tracking-wide font-bold focus:outline-none cursor-pointer rounded-md px-[0.3rem]"
                onChange={(e) => setPriority(e.target.value)}
              >
                <option value="high" className="text-sm tracking-wide">
                  High Priority
                </option>
                <option value="low" className="text-sm tracking-wide">
                  Less Priority
                </option>
              </select>
            </div>
            <div className="h-full w-[50%] md:w-[40%] flex justify-center items-center rounded-md relative border-2 border-[#F2B258]">
              <input
                type="text"
                placeholder="Search by name"
                className="bg-white w-full h-full rounded-md px-[0.5rem] text-xs outline-none"
                onChange={(e) => setDebouncedValue(e)}
              />
              <button className="h-full bg-white rounded-md   px-[0.5rem]  absolute right-0">
                <IoSearchSharp />
              </button>
            </div>
          </div>
          {/* div for the main Tasks */}
          {taskLoading ? (
            <TaskLoading />
          ) : filteredTasksByDate.length === 0 ? (
            <div className="text-center font-medium pt-[1rem] text-2xl">
              No tasks Present
            </div>
          ) : (
            <div className="w-full max-h-[400px] grid grid-cols-1 md:grid-cols-2 mt-[0.5rem] gap-[1rem] overflow-y-auto">
              {filteredTasksByDate.map((e, idx) => (
                <Maintasks
                  key={idx}
                  taskDetails={e}
                  reRender={() => setForceRerenderOnFetchData((prev) => !prev)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

Maincontent.propTypes = {
  add: PropTypes.func,
  desc: PropTypes.func,
  task: PropTypes.func,
  createDate: PropTypes.func,
};

export default Maincontent;
