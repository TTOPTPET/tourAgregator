import Box from "@mui/material/Box";

import { ITourResponse } from "../../models/tourCardModel/ITour";

import TourCardPhoto from "./TourCardPhoto/TourCardPhoto";
import TourCardContentCreatorLk from "./TourCardContent/TourCardContentCreatorLk";
import TourCardContentCardList from "./TourCardContent/TourCardContentCardList";

type CardType = "tourList" | "myTours";

type TourCardProps = {
  tour: ITourResponse;
  tourCardType: CardType;
};

function TourCard({ tour, tourCardType }: TourCardProps) {
  return (
    <Box
      className="tour_card"
      sx={{
        width: { lg: "280px", md: "207px", sm: "180px", xs: "220px" },
        height: { lg: "420px", md: "310px", sm: "270px", xs: "330px" },
        borderRadius: "30px",
        position: "relative",
      }}
    >
      <TourCardPhoto tour={tour} tourCardType={tourCardType} />

      {tourCardType === "myTours" && <TourCardContentCreatorLk tour={tour} />}
      {tourCardType === "tourList" && <TourCardContentCardList tour={tour} />}
    </Box>
  );
}

export default TourCard;
