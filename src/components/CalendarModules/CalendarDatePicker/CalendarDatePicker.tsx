import { Dispatch, SetStateAction } from "react";
import { Button, ButtonProps, Stack, Typography } from "@mui/material";
import LeftArrow from "../../../media/left-arrow-navigation.svg?react";
import RightArrow from "../../../media/right-arrow-navigation.svg?react";
import dayjs, { Dayjs } from "dayjs";
import "dayjs/locale/ru";
import styled from "@emotion/styled";

const ArrowButton = styled(({ className, ...props }: ButtonProps) => (
  <Button {...props} className={className} variant="arrowButton" />
))();

type Props = {
  viewMonth: Dayjs;
  setViewMonth: Dispatch<SetStateAction<Dayjs>>;
};

dayjs.locale("ru");

function CalendarDatePicker({ viewMonth, setViewMonth }: Props) {
  return (
    <Stack
      direction={"row"}
      justifyContent={"space-between"}
      mb={3}
      display={"flex"}
      flexGrow={0}
    >
      <Stack
        className="select_month"
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
        width={"60%"}
      >
        <ArrowButton
          onClick={() => setViewMonth((month) => month.subtract(1, "month"))}
        >
          <LeftArrow />
        </ArrowButton>
        <Typography variant={"h4"} align={"center"}>
          {firstCharToUpperCase(viewMonth.format("MMMM"))}
        </Typography>
        <ArrowButton
          onClick={() => setViewMonth((month) => month.add(1, "month"))}
        >
          <RightArrow />
        </ArrowButton>
      </Stack>
      <Stack
        className="select_year"
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
        width={"30%"}
      >
        <ArrowButton
          onClick={() => setViewMonth((month) => month.subtract(1, "year"))}
        >
          <LeftArrow />
        </ArrowButton>
        <Typography variant={"h5"} align={"center"}>
          {viewMonth.format("YYYY")}
        </Typography>
        <ArrowButton
          onClick={() => setViewMonth((month) => month.add(1, "year"))}
        >
          <RightArrow />
        </ArrowButton>
      </Stack>
    </Stack>
  );
}

export default CalendarDatePicker;

function firstCharToUpperCase(str: string) {
  if (!str) return str;

  return str[0].toUpperCase() + str.slice(1);
}
