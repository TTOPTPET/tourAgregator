import { Box, Grid, Paper, Typography } from "@mui/material";
import { Dayjs } from "dayjs";
import { Dispatch, SetStateAction } from "react";
import CalendarRenderObjects from "./CalendarRenderObjects/CalendarRenderObjects";
import { IPublicTour } from "../../../models/calendarModels/IPublicTour";
import { useDispatch } from "react-redux";
import { setModalActive } from "../../../redux/Modal/ModalReducer";

type Props = {
  viewMonth: Dayjs;
  publicTours: IPublicTour[] | undefined;
  selectedPublic: IPublicTour | undefined;
  setSelectedPublic: Dispatch<SetStateAction<IPublicTour | undefined>>;
};

export const Calendar = ({
  viewMonth,
  publicTours,
  selectedPublic,
  setSelectedPublic,
}: Props) => {
  const dispatch = useDispatch();

  return (
    <Paper
      variant="whiteBlue"
      sx={{ width: "100%", display: "flex", flexGrow: "3" }}
    >
      <Grid container columns={21} sx={{ height: "100%" }}>
        <Grid container item xs={12} sx={{ height: "10%" }}>
          {[
            { name: "ПН" },
            { name: "ВТ" },
            { name: "СР" },
            { name: "ЧТ" },
            { name: "ПТ" },
            { name: "СБ" },
            { name: "ВС" },
          ].map((_, index) => (
            <Grid item key={index} xs>
              <Box
                sx={{
                  height: "100%",
                  borderRight: index === 6 ? "none" : "1px solid #154162",
                  borderBottom: "1px solid #154162",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Typography variant={"h5"} align={"center"}>
                  {_.name}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
        {[...Array(35)].map((_, index) => {
          const thisDay = calcDayIndex(viewMonth).add(index, "day");
          const isThisMonthDay = thisDay.month() === viewMonth.month();
          return (
            <Grid item key={index} xs={3} sx={{ height: "16%" }}>
              <Box
                key={viewMonth.toString() + index}
                onClick={() => {
                  dispatch(
                    setModalActive("newPublicModal", {
                      newPublic: true,
                      dateFrom: thisDay.toISOString(),
                      dateTo: thisDay.add(7, "day").toISOString(),
                    })
                  );
                }}
                sx={{
                  cursor: "pointer",
                  height: "100%",
                  borderRight:
                    (index + 1) % 7 === 0 ? "none" : "1px solid #154162",
                  borderBottom: "1px solid #154162",
                  position: "relative",
                }}
              >
                <Typography
                  style={{
                    position: "absolute",
                    top: "10px",
                    right: "10px",
                    opacity: !isThisMonthDay ? 0.5 : undefined,
                  }}
                >
                  {thisDay.format("D")}
                </Typography>
                <CalendarRenderObjects
                  publicTours={publicTours}
                  selectedPublic={selectedPublic}
                  setSelectedPublic={setSelectedPublic}
                  date={thisDay}
                />
              </Box>
            </Grid>
          );
        })}
        <Grid container item xs={12} sx={{ height: "10%" }}>
          {[...Array(7)].map((_, index) => (
            <Grid item key={index} xs>
              <Box
                sx={{
                  height: "100%",
                  borderRight: index === 6 ? "none" : "1px solid #154162",
                }}
              ></Box>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Paper>
  );
};

const calcDayIndex = (monthDate: Dayjs) => {
  const fixWeekIndex = (index: number) => {
    return index === 0 ? 7 : index - 1;
  };

  return monthDate
    .date(1)
    .subtract(fixWeekIndex(monthDate.date(1).day()), "day");
};
