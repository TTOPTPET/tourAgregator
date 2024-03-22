import { FC, SetStateAction, Dispatch } from "react";
import { ITourInfo } from "../../../models/tourModels/ITourInfo";
import { Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
import { TourInfo } from "../../../components/TourInfo/TourInfo";
import { tourStepsMap } from "../TourPage";

import TourCreatorInfo from "../TourCreatorInfo/TourCreatorInfo";
import { ITourBookingData } from "../../../models/tourModels/ITourBookingData";

interface TourFirstPageProps {
  images: any[];
  setImage: Dispatch<SetStateAction<any[]>>;
  tourInfo: ITourInfo;
  bookingData: ITourBookingData;
  setBookingData: Dispatch<SetStateAction<ITourBookingData>>;
  page: tourStepsMap;
  setPage: (prop: any) => void;
}

export const TourFirstPage: FC<TourFirstPageProps> = ({
  images,
  setImage,
  tourInfo,
}) => {
  const theme = useTheme();

  const lessThenSmall = useMediaQuery(theme.breakpoints.down("sm"));
  const upperThenMid = useMediaQuery(theme.breakpoints.up("md"));

  return (
    <>
      <Stack justifyContent={"space-between"} direction={"row"}>
        <Typography variant={lessThenSmall ? "h4" : "h3"} marginBottom={1}>
          {tourInfo?.tourName || "Название тура"}
        </Typography>
        {upperThenMid && <TourCreatorInfo tourInfo={tourInfo} />}
      </Stack>
      <TourInfo
        images={images}
        setImage={setImage}
        addTourInfo={false}
        tourInfo={tourInfo}
        isEditing={false}
      />
    </>
  );
};
