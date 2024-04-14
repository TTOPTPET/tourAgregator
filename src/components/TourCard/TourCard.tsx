import Box from "@mui/material/Box";

import { ITour, ITourResponse } from "../../models/tourCardModel/ITour";

import TourCardPhoto from "./TourCardPhoto/TourCardPhoto";
import TourCardContentCreatorLk from "./TourCardContent/TourCardContentCreatorLk";
import TourCardContentCardList from "./TourCardContent/TourCardContentCardList";
import TourCardContentArchive from "./TourCardContent/TourCardContentArchive";
import { Dispatch, SetStateAction } from "react";

type CardType = "tourList" | "myTours" | "archive";

type TourCardProps = {
  tour: ITourResponse;
  tourCardType: CardType;
  setMyTours?: Dispatch<SetStateAction<ITour[]>>;
};

function TourCard({ tour, tourCardType, setMyTours }: TourCardProps) {
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
      {tourCardType === "archive" && (
        <TourCardContentArchive tour={tour} setMyTours={setMyTours} />
      )}
    </Box>
  );
}

export default TourCard;
