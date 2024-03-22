import { Paper, Stack, Typography, Box } from "@mui/material";
// import { Box } from "@mui/system";
import {
  darkTurquoiseColor,
  whiteColor,
} from "../../../../config/MUI/color/color";
import { IBookingInfo } from "../../../../models/calendarModels/IPublicTour";
import { useDispatch } from "react-redux";
import { setModalActive } from "../../../../redux/Modal/ModalReducer";

type Props = {
  bookingInfo: IBookingInfo;
  index: number;
};

export default function TouristOrder({ bookingInfo, index }: Props) {
  const dispatch = useDispatch();

  return (
    <Box
      sx={{
        backgroundColor: whiteColor,
        borderRadius: 10,
        cursor: "pointer",
      }}
      onClick={() => {
        dispatch(
          setModalActive("bookingInfoModal", {
            index: index,
          })
        );
      }}
    >
      <Paper sx={{ backgroundColor: whiteColor, borderRadius: 8, padding: 2 }}>
        <Stack
          direction={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Stack direction={"row"} alignItems={"center"}>
            <Box
              sx={{
                width: 40,
                height: 40,
                borderRadius: 20,
                backgroundColor: darkTurquoiseColor,
                color: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography variant={"button"} align={"center"} color={"white"}>
                {(bookingInfo?.tourists && bookingInfo?.tourists.length) || 0}
              </Typography>
            </Box>
            <Stack direction={"column"} sx={{ ml: "10px" }} gap={"5px"}>
              <Typography variant={"h6"}>№{index + 1 || "0"}</Typography>
              <Typography
                variant={"caption"}
                sx={{
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {bookingInfo?.name || "Пользователь не указан"}
              </Typography>
            </Stack>
          </Stack>
          <Typography variant={"caption"} mr={2}>
            {String(bookingInfo?.tourAmount / 100).replace(
              /\B(?=(\d{3})+(?!\d))/g,
              " "
            ) || 0}
            ₽
          </Typography>
        </Stack>
      </Paper>
    </Box>
  );
}
