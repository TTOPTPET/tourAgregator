import Box from "@mui/material/Box";

import { ITour } from "../../models/tourCardModel/ITour";

import TourCardPhoto from "./TourCardPhoto/TourCardPhoto";
import TourCardContentCreatorLk from "./TourCardContent/TourCardContentCreatorLk";
// import TourCardContentCardList from "./TourCardContent/TourCardContentCardList";
import { SetStateAction, Dispatch } from "react";

type CardType = "tourList" | "myTours";

type TourCardProps = {
  tour: ITour;
  tourCardType: CardType;
  myTours: ITour[];
  setMyTours: Dispatch<SetStateAction<ITour[]>>;
};

function TourCard({ tour, tourCardType, myTours, setMyTours }: TourCardProps) {
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

      {tourCardType === "myTours" && (
        <TourCardContentCreatorLk
          tour={tour}
          myTours={myTours}
          setMyTours={setMyTours}
        />
      )}
      {/* {tourCardType === "tourList" && <TourCardContentCardList tour={tour} />} */}
    </Box>
  );
}

export default TourCard;
