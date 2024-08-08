import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import { IoSearchSharp } from "react-icons/io5";

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
    <div className="w-[60%] h-[450px] m-auto bg-[#FAF7F2] mt-[2rem] rounded-xl py-[1rem] px-[1.5rem] shadow-lg">
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
              className="w-full text-center flex flex-col gap-[0.5rem]"
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
            <button className="w-[15%] h-full text-white text-4xl bg-[#5C9967] flex items-center justify-center rounded-md active:translate-y-[2px]">
              <div className="h-full w-full">+</div>
            </button>
          </div>
          <div className="w-full h-[2rem] mt-[0.75rem] flex items-center justify-between">
              <div className="h-full">
                <select name="Priority" className="h-full text-sm tracking-wide font-semibold focus:outline-none cursor-pointer">
                  <option value="high">High Priority</option>
                  <option value="less">Less Priority</option>
                </select>
              </div>
              <div className="h-full flex justify-center items-center">
                <input type="text" name="" id=""  className="h-full"/>
                <button className="h-full bg-white"><IoSearchSharp /></button>
              </div>
          </div>
        </div>
      </div>
      {/* for the bottom div */}
      <div className="h-[20%] w-full bg-blue-300">  
      </div>
    </div>
  );
};

export default Maincontent;
