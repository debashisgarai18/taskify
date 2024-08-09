import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import { IoSearchSharp } from "react-icons/io5";
import Maintasks from "./Maintasks";

const Maincontent = () => {
  // state to handle the date
  const [date, setDate] = useState("");
  const [day, setDay] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleCalendarChange = (e) => {
    setSelectedDate(e);
  };

  // get date function
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

  // should run when the component mounts and the date state changes
  useEffect(() => {
    getDate();
  }, [selectedDate]);

  return (
    <div className="w-[60%] h-[470px] m-auto bg-[#FAF7F2] mt-[2rem] rounded-xl py-[1rem] px-[1.5rem] shadow-lg">
      {/* for the top div */}
      <div className="h-[80%] w-full flex flex-row">
        {/* top-left div */}
        <div className="w-[35%] h-full py-[0.75rem] px-[1rem]">
          <div className="w-full flex flex-col justify-start gap-[0.5rem]">
            <div className="text-2xl capitalize text-[#FF6666]">{day}</div>
            <div className="w-full  text-3xl capitalize font-semibold text-ellipsis">
              {date}
            </div>
          </div>
          <div className="w-full pt-[0.75rem]">
            <Calendar
              className="w-full text-center flex flex-col gap-[0.5rem] bg-white rounded-md"
              value={selectedDate}
              onChange={handleCalendarChange}
              tileClassName={({ date, view }) => {
                if (view === "month") {
                  if (
                    date.getDate() === selectedDate.getDate() &&
                    date.getMonth() === selectedDate.getMonth() &&
                    date.getFullYear() === selectedDate.getFullYear()
                  ) {
                    return "bg-[#FF6666] text-black rounded-md font-semibold text-xs";
                  }
                }
                return "hover:bg-[#FAF7F2] cursor-pointer py-[0.3rem] rounded-md text-xs";
              }}
            />
          </div>
        </div>
        {/* top-right div */}
        <div className="w-[65%] h-full px-[1rem] py-[0.75rem]">
          <div className="w-full h-[3rem] flex flex-row justify-betwwen items-center gap-[15px]">
            <input
              type="text"
              placeholder="Title of the task"
              className="w-[30%] h-full px-[1rem] rounded-md text-sm tracking-wide bg-[#e9f3f8] border-[2px] border-[#8ec6e9] focus:outline-none focus:border-cyan-500"
            />
            <input
              type="text"
              placeholder="Description of the task"
              className="w-[60%] h-full px-[1rem] rounded-md text-sm tracking-wide bg-[#e9f3f8] border-[2px] border-[#8ec6e9] focus:outline-none focus:border-cyan-500"
            />
            <button className="w-[15%] h-full text-white text-4xl bg-[#5C9967] flex items-center justify-center rounded-tr-md rounded-br-md active:translate-y-[1px]">
              <div className="h-full w-full">+</div>
            </button>
          </div>
          <div className="w-full h-[2rem] mt-[0.75rem] flex items-center justify-between">
            <div className="h-full">
              <select
                name="Priority"
                className="h-full text-xs tracking-wide font-bold focus:outline-none cursor-pointer rounded-md px-[0.3rem]"
              >
                <option
                  value="high"
                  className="text-xs tracking-wide"
                >
                  High Priority
                </option>
                <option
                  value="less"
                  className="text-xs tracking-wide"
                >
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
              <button className="h-full bg-white border-2 rounded-tr-md rounded-br-md border-r-[#F2B258] px-[0.5rem] border-t-[#F2B258] border-b-[#F2B258] absolute right-0">
                <IoSearchSharp />
              </button>
            </div>
          </div>
          {/* div for the main Tasks */}
          <div className="w-full grid grid-cols-2 mt-[0.5rem] gap-[1rem]">
            <Maintasks />
            <Maintasks />
            <Maintasks />
            <Maintasks />
          </div>
          <div className="w-full mt-[1rem] flex items-center justify-center">
              <button className="bg-white px-[1rem] py-[0.3rem] font-bold tracking-wider border-[3px] border-[#eeab4e] text-[#333231] rounded-md active:translate-y-[1px]">Load More</button>
          </div>
        </div>
      </div>
      {/* for the bottom div */}
      <div className="h-[20%] w-full bg-blue-300 flex flex-row justify-between items-center">
        <div className="w-[40%] h-full bg-red-300">

        </div>
        <div className="w-[55%] h-full bg-green-300">

        </div>
      </div>
    </div>
  );
};

export default Maincontent;
