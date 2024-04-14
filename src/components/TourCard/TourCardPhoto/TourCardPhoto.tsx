import Box from "@mui/material/Box";

import noPhoto from "../../../media/noPhoto.png";

import { ITourResponse } from "../../../models/tourCardModel/ITour";
import { Typography } from "@mui/material";

type CardType = "tourList" | "myTours" | "archive";
type TourCardProps = {
  tour: ITourResponse;
  tourCardType: CardType;
};

function TourCardPhoto({ tour, tourCardType }: TourCardProps) {
  return (
    <>
      <Box
        className="tour-card__photo-wrapper"
        sx={{
          width: "100%",
          height: { lg: "215px", md: "153px", sm: "140px", xs: "174px" },
          position: "relative",
          borderTopLeftRadius: "30px",
          borderTopRightRadius: "30px",
          backgroundImage: `url(${
            tour?.photos && tour?.photos ? tour?.photos : noPhoto
          })`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {tourCardType === "myTours" && (
          <Box
            className="tour-card__photo-layout"
            sx={{
              width: "100%",
              height: "100%",
              background: "rgba(0, 0, 0, 0.5)",
              position: "absolute",
              zIndex: "1",
              borderTopLeftRadius: "30px",
              borderTopRightRadius: "30px",
            }}
          >
            <Typography
              variant="caption"
              className="tour-card__photo-publicNum"
              sx={{
                width: "100%",
                textAlign: "center",
                color: "#FFFFFF",
                position: "absolute",
                zIndex: "3",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
            >
              {tour.publicCount
                ? `Размещенных туров: ${tour.publicCount}`
                : "Нет размещенных туров"}
            </Typography>
          </Box>
        )}
      </Box>
    </>
  );
}

export default TourCardPhoto;
