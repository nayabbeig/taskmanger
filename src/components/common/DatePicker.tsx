import * as React from "react";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { elGR } from "@mui/x-date-pickers";

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
        sx={{ width: "100%" }}
        defaultValue={dayjs(defaultValue)}
        views={["year", "month", "day"]}
        onChange={(e) => {
          setDate(new Date(e?.toDate() || ""));
        }}
      />
    </LocalizationProvider>
  );
}
