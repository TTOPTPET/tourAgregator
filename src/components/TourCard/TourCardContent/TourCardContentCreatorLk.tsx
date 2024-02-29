import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

import { ITour } from "../../../models/tourCardModel/ITour";

import { Link } from "react-router-dom";
import { lightTurquoiseColor } from "../../../config/MUI/color/color";
import { useDispatch } from "react-redux";
import { setModalActive } from "../../../redux/Modal/ModalReducer";
import { SetStateAction, Dispatch } from "react";
import { Typography, useMediaQuery, useTheme } from "@mui/material";

type TourCardProps = {
  tour: ITour;
  myTours: ITour[];
  setMyTours: Dispatch<SetStateAction<ITour[]>>;
};

function TourCardContentCreatorLk({
  tour,
  myTours,
  setMyTours,
}: TourCardProps) {
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
        }}
      >
        {tour.tourName}
      </Typography>
      <Box
        display={"flex"}
        flexDirection={"column"}
        flex={"0 0 auto"}
        className="tour-card__button-wrapper"
        sx={{ marginTop: "70px" }}
      >
        <Box
          display="flex"
          justifyContent={"flex-end"}
          className="tour-card__button-edit"
        >
          <Button component={Link} to={`/creator/editTour/${tour?.tourId}`}>
            Редактировать
          </Button>
        </Box>
        <Box
          className="tour-card__buttons-wrapper"
          display="flex"
          justifyContent={"flex-end"}
          mt="5px"
          columnGap={"5px"}
        >
          <Button
            className="tour-card__button-place"
            disabled={tour.banStatus ? true : false}
            component={Link}
            to={`/creator/calendar`}
          >
            Разместить
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
          >
            Удалить
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default TourCardContentCreatorLk;
