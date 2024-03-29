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
        publicTours.length > 0 &&
        publicTours.map((tour) => {
          if (date.isBetween(tour.dateFrom, tour.dateTo, "date", "[]")) {
            return (
              <Box
                className={tour?.tourName}
                onClick={(e: any) => {
                  e.stopPropagation();
                  setSelectedPublic(tour);
                }}
                key={tour.publicTourId}
                sx={{
                  borderTopLeftRadius: date.isSame(tour?.dateFrom, "D")
                    ? "10px"
                    : null,
                  borderBottomLeftRadius: date.isSame(tour?.dateFrom, "D")
                    ? "10px"
                    : null,
                  borderTopRightRadius: date.isSame(tour?.dateTo, "D")
                    ? "10px"
                    : null,
                  borderBottomRightRadius: date.isSame(tour?.dateTo, "D")
                    ? "10px"
                    : null,
                  backgroundColor:
                    selectedPublic?.publicTourId === tour?.publicTourId
                      ? "#00c7f6"
                      : darkTurquoiseColor,
                  width: "100%",
                  height: "30px",
                  marginBottom: "2px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                {date.isSame(tour.dateFrom, "D") && (
                  <Typography
                    sx={{
                      position: "absolute",
                      left: "15px",
                      fontSize: "16px",
                      lineHeight: "100%",
                      color: "#ffffff",
                      zIndex: 100,
                      width: `${(dayjs(tour.dateTo).diff(dayjs(tour.dateFrom), "day") + 1) * 80}%`,
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {tour?.tourName}
                  </Typography>
                )}
              </Box>
            );
          }
        })}
    </Box>
  );
}
