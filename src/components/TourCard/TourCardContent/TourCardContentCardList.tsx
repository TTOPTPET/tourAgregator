import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { DarkStyledTooltip } from "../../../config/MUI/styledComponents/StyledTooltip";

import { ITourResponse } from "../../../models/tourCardModel/ITour";

import { Link } from "react-router-dom";
import {
  lightTurquoiseColor,
  darkTurquoiseColor,
} from "../../../config/MUI/color/color";

import mapMarker from "../../../media/map-marker.svg";
import calendar from "../../../media/calendar.svg";
import categoryIcon from "../../../media/walking-guy.svg";
import dayjs from "dayjs";
import { Typography, useMediaQuery, useTheme } from "@mui/material";
import { ICatalog } from "../../../models/tourListModels/ICatalog";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";

type TourCardProps = {
  tour: ITourResponse;
};

function TourCardContentCardList({ tour }: TourCardProps) {
  const theme = useTheme();

  const lessThenBig = useMediaQuery(theme.breakpoints.down("lg"));

  const country: ICatalog[] = useSelector(
    (state: RootState) => state?.catalogs?.country as ICatalog[]
  );

  const category: ICatalog[] = useSelector(
    (state: RootState) => state?.catalogs?.category as ICatalog[]
  );

  return (
    <Box
      className="tour-card__content"
      sx={{
        width: "100%",
        height: { lg: "205px", md: "157px", sm: "130px", xs: "157px" },
        backgroundColor: lightTurquoiseColor,
        borderBottomLeftRadius: "30px",
        borderBottomRightRadius: "30px",
        padding: {
          lg: "18px 20px 20px 15px",
          md: "15px",
          sm: "10px",
          xs: "15px",
        },
        display: "flex",
        flexDirection: "column",
        flex: "0 0 auto",
      }}
    >
      <Typography
        variant={lessThenBig ? "h5" : "h6"}
        className="tour-card__content-title"
        sx={{
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        {tour.tourName}
      </Typography>
      <Box
        className="tour-card__content-wrapper"
        sx={{
          mt: { lg: "7px", md: "10px", sm: "5px", xs: "10px" },
          display: "flex",
          flexDirection: "column",
          gap: { lg: "10px", md: "10px", sm: "5px", xs: "10px" },
          flex: "1 0 auto",
        }}
      >
        <Box
          className="tour-card__content-region-wrapper"
          sx={{ display: "flex", gap: "5px", alignItems: "center" }}
        >
          <Box
            className="tour-card__content-region-icon"
            sx={{
              width: { lg: "26px", md: "18px", sm: "18px", xs: "18px" },
              height: { lg: "26px", md: "18px", sm: "18px", xs: "18px" },
            }}
          >
            <img
              src={mapMarker}
              alt="map marker"
              style={{ objectFit: "contain", width: "100%", height: "100%" }}
            />
          </Box>
          <DarkStyledTooltip title="Регион" arrow placement="top">
            <Typography
              variant="caption"
              className="tour-card__content-region-descr"
              sx={{
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {country.map((item) => {
                if (item.code === tour.region) {
                  return item.name;
                }
              })}
            </Typography>
          </DarkStyledTooltip>
        </Box>

        <Box
          className="tour-card__content-date-wrapper"
          sx={{ display: "flex", gap: "5px", alignItems: "center" }}
        >
          <Box
            className="tour-card__content-date-icon"
            sx={{
              width: { lg: "26px", md: "18px", sm: "18px", xs: "18px" },
              height: { lg: "26px", md: "18px", sm: "18px", xs: "18px" },
            }}
          >
            <img
              src={calendar}
              alt="calendar"
              style={{ objectFit: "contain", width: "100%", height: "100%" }}
            />
          </Box>
          <DarkStyledTooltip title="Даты ближайшего тура" arrow placement="top">
            <Typography
              variant="caption"
              className="tour-card__content-date-descr"
            >
              {dayjs(tour?.dateFrom).format("DD.MM.YYYY")} -{" "}
              {dayjs(tour?.dateTo).format("DD.MM.YYYY")}
            </Typography>
          </DarkStyledTooltip>
        </Box>

        <Box
          className="tour-card__content-category-wrapper"
          sx={{ display: "flex", gap: "5px", alignItems: "center" }}
        >
          <Box
            className="tour-card__content-category-icon"
            sx={{
              width: { lg: "26px", md: "18px", sm: "18px", xs: "18px" },
              height: { lg: "26px", md: "18px", sm: "18px", xs: "18px" },
            }}
          >
            <img
              src={categoryIcon}
              alt="walking guy"
              style={{ objectFit: "contain", width: "100%", height: "100%" }}
            />
          </Box>
          <DarkStyledTooltip title="Категория тура" arrow placement="top">
            <Typography
              variant="caption"
              className="tour-card__content-category-descr"
              sx={{
                color: darkTurquoiseColor,
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {category.map((item) => {
                if (item.code === tour.category) {
                  return item.name;
                }
              })}
            </Typography>
          </DarkStyledTooltip>
        </Box>
      </Box>
      <Box
        sx={{ display: "flex", flexDirection: "column", flex: "0 0 auto" }}
        className="tour-card__button-wrapper"
      >
        <Box
          sx={{ display: "flex", justifyContent: "flex-end" }}
          className="tour-card__button-price"
        >
          <Button component={Link} to={`/tours/tour/${tour.id}`}>
            {tour?.price &&
              `${new Intl.NumberFormat("ru-RU").format(tour?.price / 100)}₽`}
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default TourCardContentCardList;
