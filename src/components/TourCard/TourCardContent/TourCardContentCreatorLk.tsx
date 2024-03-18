import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

import { ITour, ITourResponse } from "../../../models/tourCardModel/ITour";

import { Link } from "react-router-dom";
import { lightTurquoiseColor } from "../../../config/MUI/color/color";
import { useDispatch } from "react-redux";
import { setModalActive } from "../../../redux/Modal/ModalReducer";
import { SetStateAction, Dispatch } from "react";
import { SvgIcon, Typography, useMediaQuery, useTheme } from "@mui/material";
import EditIcon from "../../../media/editTourIcon.svg";
import DeleteIcon from "../../../media/deleteTourIcon.svg";

type TourCardProps = {
  tour: ITourResponse;
};

function TourCardContentCreatorLk({ tour }: TourCardProps) {
  const dispatch = useDispatch();

  const theme = useTheme();

  const lessThenBig = useMediaQuery(theme.breakpoints.down("lg"));

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
        className="tour-card__button-wrapper"
        sx={{ display: "flex", justifyContent: "flex-end", gap: "7px" }}
      >
        <Button
          component={Link}
          to={`/creator/editTour/${tour?.tourId}`}
          variant="editButton"
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
            dispatch(
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
