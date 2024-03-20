import { Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Link } from "react-router-dom";
import { lightTurquoiseColor } from "../../../config/MUI/color/color";
import Plus from "../../../media/plus-circle-outline.svg";
import { Dispatch, SetStateAction, FC } from "react";
import "./svgStyling.css";
import { ITourBookingData } from "../../../models/tourModels/ITourBookingData";
import { ITourInfo } from "../../../models/tourModels/ITourInfo";

interface IAddTouristButton {
  bookingData: ITourBookingData;
  setBookingData: Dispatch<SetStateAction<ITourBookingData>>;
  tourInfo: ITourInfo;
}

export const AddTouristButton: FC<IAddTouristButton> = ({
  bookingData,
  setBookingData,
  tourInfo,
}) => {
  return (
    tourInfo?.vacancies > bookingData?.touristsAmount! && (
      <Box
        component={Link}
        sx={{
          width: "100%",
          backgroundColor: lightTurquoiseColor,
          textDecoration: "none",
        }}
        padding={4}
        borderRadius={10}
        onClick={() =>
          setBookingData({
            ...bookingData,
            touristsAmount: bookingData?.touristsAmount! + 1,
            tourists: [...bookingData?.tourists!, {}],
          })
        }
      >
        <Stack
          direction={"row"}
          gap={1}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Box display="flex" gap={1}>
            <Typography variant={"h5"}>Добавить туриста</Typography>
            <Box
              sx={{
                width: { lg: "33px", xs: "20px" },
                height: { lg: "33px", xs: "20px" },
              }}
            >
              <img src={Plus} alt="plus" />
            </Box>
          </Box>
          <Typography variant={"h5"}>
            (максимум {tourInfo?.vacancies})
          </Typography>
        </Stack>
      </Box>
    )
  );
};
