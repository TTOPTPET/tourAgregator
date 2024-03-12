import dayjs, { Dayjs } from "dayjs";
import { IPublicTour } from "../../../../models/calendarModels/IPublicTour";
import { Dispatch, SetStateAction } from "react";
import { Box, Typography } from "@mui/material";
import { darkTurquoiseColor } from "../../../../config/MUI/color/color";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import isBetween from "dayjs/plugin/isBetween";
dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);
dayjs.extend(isBetween);

type Props = {
  publicTours: IPublicTour[] | undefined;
  date: Dayjs;
  selectedPublic: IPublicTour | undefined;
  setSelectedPublic: Dispatch<SetStateAction<IPublicTour | undefined>>;
};

export default function CalendarRenderObjects({
  publicTours,
  date,
  selectedPublic,
  setSelectedPublic,
}: Props) {
  return (
    <Box
      key={date.toString()}
      sx={{
        position: "absolute",
        top: 0,
        pt: "32px",
        left: 0,
        width: "calc(100% + 2px)",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {publicTours &&
        publicTours.map((tour) => {
          if (
            date.isBetween(tour.date?.dateFrom, tour.date?.dateTo, "date", "[]")
          ) {
            return (
              <Box
                className={tour?.tour?.tourName}
                onClick={(e: any) => {
                  e.stopPropagation();
                  setSelectedPublic(tour);
                }}
                sx={{
                  borderTopLeftRadius: date.isSame(tour.date?.dateFrom, "D")
                    ? "10px"
                    : null,
                  borderBottomLeftRadius: date.isSame(tour.date?.dateFrom, "D")
                    ? "10px"
                    : null,
                  borderTopRightRadius: date.isSame(tour.date?.dateTo, "D")
                    ? "10px"
                    : null,
                  borderBottomRightRadius: date.isSame(tour.date?.dateTo, "D")
                    ? "10px"
                    : null,
                  backgroundColor:
                    selectedPublic?.publicTourId === tour?.publicTourId
                      ? "#00c7f6"
                      : darkTurquoiseColor,
                  width: "100%",
                  height: "17px",
                  marginBottom: "2px",
                }}
              >
                {date.isSame(tour.date?.dateFrom, "D") && (
                  <Typography
                    sx={{
                      position: "absolute",
                      left: "15px",
                      fontSize: "14px",
                      lineHeight: "100%",
                      color: "#ffffff",
                      zIndex: 100,
                      paddingTop: "1px",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {tour?.tour?.tourName}
                  </Typography>
                )}
              </Box>
            );
          } else if (
            publicTours.some(
              (someTour) =>
                dayjs(someTour?.date?.dateFrom).isSameOrAfter(
                  tour?.date?.dateFrom
                ) &&
                dayjs(someTour?.date?.dateFrom).isBefore(tour?.date?.dateTo)
            )
          ) {
            return (
              <Box
                className={tour?.tour?.tourName}
                sx={{
                  width: "100%",
                  height: "17px",
                  marginBottom: "2px",
                }}
              ></Box>
            );
          }
        })}
    </Box>
  );
}
