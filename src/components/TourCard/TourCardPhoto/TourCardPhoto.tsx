import Box from "@mui/material/Box";

import { lightTurquoiseColor } from "../../../config/MUI/color/color";

import { LightStyledTooltip } from "../../../config/MUI/styledComponents/StyledTooltip";

import cancelIcon from "../../../media/ban-status-icon.svg";
import noPhoto from "../../../media/noPhoto.png";

import { ITour } from "../../../models/tourCardModel/ITour";
import { Typography } from "@mui/material";

type CardType = "tourList" | "myTours";
type TourCardProps = {
  tour: ITour;
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
              {tour.publicNum
                ? `Размещенных туров: ${tour.publicNum}`
                : "Нет размещенных туров"}
            </Typography>
          </Box>
        )}
      </Box>

      {tourCardType === "myTours" && (
        <Box className="tour-card__photo-banStatus">
          {tour.banStatus && (
            <>
              <LightStyledTooltip
                title="Тур заблокирован"
                arrow
                placement="right"
              >
                <Box
                  className="tour-card__photo-banStatus-wrapper"
                  sx={{
                    position: "absolute",
                    top: 15,
                    left: 15,
                    width: { lg: "40px", md: "35px", sm: "30px", xs: "30px" },
                    height: { lg: "40px", md: "35px", sm: "30px", xs: "30px" },
                    borderRadius: "100%",
                    bgcolor: lightTurquoiseColor,
                    zIndex: "5",
                  }}
                >
                  <img
                    className="tour-card__photo-banStatus-icon"
                    src={cancelIcon}
                    alt="cancel icon"
                    style={{
                      width: "100%",
                      zIndex: "10",
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                    }}
                  />
                </Box>
              </LightStyledTooltip>
            </>
          )}
        </Box>
      )}
    </>
  );
}

export default TourCardPhoto;
