import * as React from "react";
import IconButton from "@mui/material/IconButton";

import { SortingDirection, SortingOptions } from "./TaskTable";
import {
  Button,
  FormControl,
  Grid,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";

import NorthIcon from "@mui/icons-material/North";
import SouthIcon from "@mui/icons-material/South";
import SearchIcon from "@mui/icons-material/Search";

import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import { TaskType } from "../../features/task/taskSlice";

interface TaskTableHeader {
  taskType: TaskType;
  sortingDirection: SortingDirection;
  setSortingDirection: (sortingDirectoin: SortingDirection) => void;
  setSortBy: (sortBy: SortingOptions) => void;
  setDateSelectorValue: (date: Date) => void;
  setSearchQuery: (query: string) => void;
}

export const TaskTableHeader = ({
  taskType,
  sortingDirection,
  setSortingDirection,
  setSortBy,
  setDateSelectorValue,
  setSearchQuery,
}: TaskTableHeader) => {
  const SortingDirectionButton = (
    <Grid item xs={2} md={1}>
      <Button
        onClick={() =>
          setSortingDirection(
            sortingDirection === SortingDirection.ASCENDING
              ? SortingDirection.DESCENDING
              : SortingDirection.ASCENDING
          )
        }
      >
        {sortingDirection === SortingDirection.ASCENDING ? (
          <NorthIcon />
        ) : (
          <SouthIcon />
        )}
      </Button>
    </Grid>
  );

  const SortBySelector = (
    <Grid item xs={5} md={3}>
      <FormControl fullWidth>
        <InputLabel size="small" id="demo-simple-select-label">
          Sort By
        </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="Sort By"
          onChange={(e) => {
            setSortBy(e?.target?.value as SortingOptions);
          }}
          size="small"
        >
          <MenuItem value={SortingOptions.BY_TITLE}>Title</MenuItem>
          {taskType === TaskType.PENDING ? (
            <MenuItem value={SortingOptions.BY_DUE_DATE}>Due Date</MenuItem>
          ) : (
            <MenuItem value={SortingOptions.BY_COMPLETION_DATE}>
              Completion Date
            </MenuItem>
          )}
        </Select>
      </FormControl>
    </Grid>
  );

  const DateSelector = (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Grid item xs={5} md={3}>
        <DatePicker
          slotProps={{ textField: { size: "small" } }}
          label={taskType === TaskType.PENDING ? "Due Date" : "Completion Date"}
          onChange={(e: any) =>
            setDateSelectorValue(new Date(e?.toDate() || ""))
          }
        />
      </Grid>
    </LocalizationProvider>
  );
  const SearchBar = (
    <Grid item xs={12} md={5}>
      <TextField
        label="Search by title"
        id="outlined-start-adornment"
        size="small"
        sx={{ width: "100%" }}
        onChange={(e) => setSearchQuery(e?.target?.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </Grid>
  );
  return (
    <Grid container spacing={2} sx={{ mb: 2 }}>
      {SortingDirectionButton}
      {SortBySelector}
      {DateSelector}
      {SearchBar}
    </Grid>
  );
};
