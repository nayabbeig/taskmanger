import * as React from "react";
import dayjs from "dayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

const today = dayjs();

export default function AppDatePicker({
  setDate,
  defaultValue,
}: {
  setDate: (value: Date) => void;
  defaultValue?: Date;
}) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        defaultValue={dayjs(defaultValue)}
        views={["year", "month", "day"]}
        onChange={(e) => {
          setDate(new Date(e?.$d));
        }}
      />
    </LocalizationProvider>
  );
}
