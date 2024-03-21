import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

import { ITour, ITourResponse } from "../../../models/tourCardModel/ITour";

import { Link, useNavigate } from "react-router-dom";
import {
  darkTurquoiseColor,
  lightTurquoiseColor,
} from "../../../config/MUI/color/color";
import { useDispatch, useSelector } from "react-redux";
import { setModalActive } from "../../../redux/Modal/ModalReducer";
import { SetStateAction, Dispatch } from "react";
import { SvgIcon, Typography, useMediaQuery, useTheme } from "@mui/material";
import EditIcon from "../../../media/editTourIcon.svg";
import DeleteIcon from "../../../media/deleteTourIcon.svg";
import { DarkStyledTooltip } from "../../../config/MUI/styledComponents/StyledTooltip";

import mapMarker from "../../../media/map-marker.svg";
import complexityIcon from "../../../media/complexityIcon.svg";
import categoryIcon from "../../../media/walking-guy.svg";
import { ICatalog } from "../../../models/tourListModels/ICatalog";
import { RootState } from "../../../redux/store";
import dayjs from "dayjs";

type TourCardProps = {
  tour: ITourResponse;
};

function TourCardContentCreatorLk({ tour }: TourCardProps) {
  const dispatch = useDispatch();

  const theme = useTheme();

  const navigate = useNavigate();

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

  return (
    <Box
      className="tour-card__content"
      sx={{
        width: "100%",
        height: { lg: "205px", md: "157px", sm: "130px", xs: "157px" },
        backgroundColor: lightTurquoiseColor,
        borderBottomLeftRadius: "30px",
        borderBottomRightRadius: "30px",
        padding: { lg: "25px 20px 20px", md: "15px", sm: "10px", xs: "15px" },
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
          flex: "1 0 auto",
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
        className="tour-card__button-wrapper"
        sx={{ display: "flex", justifyContent: "flex-end", gap: "7px" }}
      >
        <Button
          variant="editButton"
          onClick={() => {
            tour?.publicCount! > 0
              ? dispatch(setModalActive("needDeletePublicModal"))
              : navigate(`/creator/editTour/${tour?.tourId}`);
          }}
        >
          <img
            src={EditIcon}
            alt="plus icon"
            style={{
              width: "25px",
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
            className="tour_button_icon"
          />
        </Button>

        <Button
          className="tour-card__button-delete"
          onClick={() =>
            tour?.publicCount! > 0
              ? dispatch(setModalActive("needDeletePublicModal"))
              : dispatch(
                  setModalActive("deleteTourModal", {
                    tourId: tour?.tourId,
                  })
                )
          }
          variant="deleteButton"
        >
          <img
            src={DeleteIcon}
            alt="plus icon"
            style={{
              width: "25px",
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
            className="tour_button_icon"
          />
        </Button>
      </Box>
    </Box>
  );
}

export default TourCardContentCreatorLk;
