import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import PropTypes from "prop-types";
import dayjs from "dayjs";

export default function TaskifyCalendar({ selectedDate, handleDateChange }) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateCalendar
        value={selectedDate ? dayjs(selectedDate) : null}
        onChange={handleDateChange}
      />
    </LocalizationProvider>
  );
}

TaskifyCalendar.propTypes = {
  selectedDate: PropTypes.any,
  handleDateChange: PropTypes.func,
};
