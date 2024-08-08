import { useEffect, useState } from "react";
import Calendar from 'react-calendar';

const Maincontent = () => {
  // state to handle the date
  const [date, setDate] = useState("");
  const [day, setDay] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());


  const handleCalendarChange = (e) => {
    setSelectedDate(e);
  }

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
        <div className="w-[35%] h-full bg-green-300 py-[0.75rem] px-[1.5rem]">
          <div className="w-full flex flex-col justify-start gap-[0.5rem]">
            <div className="text-2xl capitalize text-[#FF6666]">{day}</div>
            <div className="w-full text-3xl capitalize font-semibold overflow-hidden text-ellipsis">{date}</div>
          </div>
          <div className="w-full pt-[0.5rem]">
            <Calendar className="w-full text-center text-lg flex flex-col gap-[0.5rem]"
            value={selectedDate}
            onChange={handleCalendarChange}
            tileClassName={({ date, view }) => {
              if (view === 'month') {
                if (
                  date.getDate() === selectedDate.getDate() &&
                  date.getMonth() === selectedDate.getMonth() &&
                  date.getFullYear() === selectedDate.getFullYear()
                ) {
                  return 'bg-[#FF6666] text-black rounded-md font-semibold text-xs';
                }
              }
              return 'hover:bg-[#FAF7F2] cursor-pointer py-[0.3rem] rounded-md text-xs';
            }}/>
          </div>  
        </div>
        {/* top-right div */}
        <div className="w-[65%] h-full  bg-purple-300"></div>
      </div>
      {/* for the bottom div */}
      <div className="h-[20%] w-full bg-blue-300"></div>
    </div>
  );
};

export default Maincontent;
