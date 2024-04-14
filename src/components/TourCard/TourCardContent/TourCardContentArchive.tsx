import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { DarkStyledTooltip } from "../../../config/MUI/styledComponents/StyledTooltip";

import { ITour, ITourResponse } from "../../../models/tourCardModel/ITour";

import {
  lightTurquoiseColor,
  darkTurquoiseColor,
  redColor,
} from "../../../config/MUI/color/color";

import mapMarker from "../../../media/map-marker.svg";
import categoryIcon from "../../../media/walking-guy.svg";
import complexityIcon from "../../../media/complexityIcon.svg";
import {
  CircularProgress,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { ICatalog } from "../../../models/tourListModels/ICatalog";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { returnTour } from "../../../API/creatorAPI/deleteTour";
import { Dispatch, SetStateAction, useState } from "react";
import { setModalActive } from "../../../redux/Modal/ModalReducer";

type TourCardProps = {
  tour: ITourResponse;
  setMyTours?: Dispatch<SetStateAction<ITour[]>>;
};

function TourCardContentCardList({ tour, setMyTours }: TourCardProps) {
  const theme = useTheme();

  const { tourId } = tour;

  const dispatch = useDispatch();

  const lessThenBig = useMediaQuery(theme.breakpoints.down("lg"));

  const country: ICatalog[] = useSelector(
    (state: RootState) => state?.catalogs?.country as ICatalog[]
  );

  const category: ICatalog[] = useSelector(
    (state: RootState) => state?.catalogs?.category as ICatalog[]
  );

  const complexity: ICatalog[] = useSelector(
    (state: RootState) => state?.catalogs?.complexity as ICatalog[]
  );

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handlerReturnClick = () => {
    setLoading(true);
    setError(false);
    returnTour(
      { id: tourId as string },
      () => {
        setMyTours &&
          setMyTours((myTours) => [
            ...myTours.filter((tour) => tour.tourId !== tourId),
          ]);
        dispatch(setModalActive("successDeleteTourModal"));
        setLoading(false);
      },
      () => {
        setLoading(false);
        setError(true);
      }
    );
  };

  return (
    <Box
      className="tour-card__content"
      sx={{
        width: "100%",
        height: {
          lg: error ? "227px" : "205px",
          md: "157px",
          sm: "130px",
          xs: "157px",
        },
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
          mt: "10px",
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
              style={{ objectFit: "contain", width: "26px", height: "26px" }}
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
          className="tour-card__content-complexity-wrapper"
          sx={{ display: "flex", gap: "5px", alignItems: "center" }}
        >
          <Box
            className="tour-card__content-complexity-icon"
            sx={{
              width: { lg: "26px", md: "18px", sm: "18px", xs: "18px" },
              height: { lg: "26px", md: "18px", sm: "18px", xs: "18px" },
            }}
          >
            <img
              src={complexityIcon}
              alt="map marker"
              style={{ objectFit: "contain", width: "26px", height: "26px" }}
            />
          </Box>
          <DarkStyledTooltip title="Сложность" arrow placement="top">
            <Typography
              variant="caption"
              className="tour-card__content-complexity-descr"
              sx={{
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {complexity.map((item) => {
                if (item.code === tour.complexity) {
                  return item.name;
                }
              })}
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
          {loading ? (
            <CircularProgress sx={{ mr: "70px" }} />
          ) : (
            <Button onClick={handlerReturnClick}>Восстановить</Button>
          )}
        </Box>
        {error && (
          <Typography
            variant="caption"
            textAlign={"center"}
            sx={{ color: redColor, mt: "7px" }}
          >
            Что-то пошло не так!
          </Typography>
        )}
      </Box>
    </Box>
  );
}

export default TourCardContentCardList;
