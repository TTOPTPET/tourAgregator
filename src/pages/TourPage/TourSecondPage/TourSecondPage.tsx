import { TextField, Typography } from "@mui/material";
import { Box, Stack } from "@mui/system";
import { Dispatch, SetStateAction, FC, useEffect, useState } from "react";
import { AddTouristButton } from "../../../components/AddTourModules/AddTouristButton/AddTouristButton";
import { TourDetails } from "../../../components/MyTours/TourSummary/TourDetails";
import { TouristBooking } from "../../../components/TourInfo/TouristBooking/TouristBooking";
import {
  lightTurquoiseColor,
  whiteColor,
} from "../../../config/MUI/color/color";
import { ITourBookingData } from "../../../models/tourModels/ITourBookingData";
import { ITourInfo } from "../../../models/tourModels/ITourInfo";

interface ITourSecondPageProps {
  tourInfo: ITourInfo;
  bookingData: ITourBookingData;
  setBookingData: Dispatch<SetStateAction<ITourBookingData>>;
}

export const TourSecondPage: FC<ITourSecondPageProps> = ({
  bookingData,
  setBookingData,
  tourInfo,
}) => {
  const [purchaseError, setPurchaseError] = useState<boolean>(false);

  return (
    <Stack gap={2}>
      <Box
        sx={{ width: "100%", backgroundColor: whiteColor }}
        borderRadius={10}
        padding={2}
      >
        <TourDetails
          record={{ ...tourInfo, type: "tourInfo" }}
          bookingData={bookingData}
        />
      </Box>
      <Stack direction={"column"} gap={2}>
        {bookingData?.tourists &&
          bookingData?.tourists.map((item, index) => (
            <TouristBooking
              key={index}
              bookingData={bookingData}
              touristData={item}
              setBookingData={setBookingData}
              index={index}
              purchaseError={purchaseError}
            />
          ))}
      </Stack>
      <AddTouristButton
        tourInfo={tourInfo}
        bookingData={bookingData}
        setBookingData={setBookingData}
      />
      <Box
        sx={{ width: "100%", backgroundColor: lightTurquoiseColor }}
        borderRadius={10}
        padding={4}
      >
        <Typography variant={"h5"} mb={2}>
          Комментарий к заказу
        </Typography>
        <TextField
          label={"Введите комментарий (не более 1500 символов)"}
          color={"secondary"}
          value={bookingData?.comment}
          onChange={(e) =>
            setBookingData({ ...bookingData, comment: e.target.value })
          }
        ></TextField>
      </Box>
    </Stack>
  );
};
