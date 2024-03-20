import {
  Autocomplete,
  IconButton,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Box, Stack } from "@mui/system";
import { Dispatch, SetStateAction, FC } from "react";
import { lightTurquoiseColor } from "../../../config/MUI/color/color";
import {
  ITourBookingData,
  IBookingTourist,
} from "../../../models/tourModels/ITourBookingData";
import DeleteIcon from "../../../media/DeleteCreatorDocumentIcon.svg?react";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";

interface ITouristBookingProps {
  bookingData: ITourBookingData;
  touristData: IBookingTourist;
  setBookingData: Dispatch<SetStateAction<ITourBookingData>>;
  index: number;
  purchaseError: boolean;
}

export const TouristBooking: FC<ITouristBookingProps> = ({
  bookingData,
  touristData,
  setBookingData,
  index,
  purchaseError,
}) => {
  const handlerFieldChange = (
    key: keyof IBookingTourist,
    value: string | Dayjs
  ) => {
    setBookingData({
      ...bookingData,
      tourists: bookingData?.tourists!.map((item, i) => {
        if (i === index) {
          return { ...item, [key]: value };
        } else {
          return { ...item };
        }
      }),
    });
  };

  const theme = useTheme();

  const lessThanSmall = useMediaQuery(theme.breakpoints.down("sm"));
  const lessThanMedium = useMediaQuery(theme.breakpoints.down("md"));
  const lessThanBig = useMediaQuery(theme.breakpoints.down("lg"));

  const handlerDeleteTourist = () => {
    setBookingData({
      ...bookingData,
      tourists: [...bookingData?.tourists!.filter((val, i) => i !== index)],
      touristsAmount: bookingData?.touristsAmount! - 1,
    });
  };

  return (
    <Box
      sx={{ width: "100%", backgroundColor: lightTurquoiseColor }}
      borderRadius={10}
      padding={4}
    >
      <IconButton
        onClick={handlerDeleteTourist}
        sx={{ float: "right", marginTop: "-20px", marginRight: "-15px" }}
      >
        <DeleteIcon width={20} height={20} />
      </IconButton>
      <Typography variant={"h5"} mb={2}>
        Турист
      </Typography>
      <Stack
        direction={lessThanSmall ? "column" : "row"}
        gap={lessThanMedium ? 1 : lessThanBig ? 2 : 4}
      >
        <TextField
          label={"ФИО"}
          color={"secondary"}
          value={touristData?.name || ""}
          error={
            touristData?.name === "" ||
            (touristData?.name === undefined && purchaseError)
          }
          onChange={(e) => handlerFieldChange("name", e.target.value)}
        />
        <DatePicker
          label="Дата рождения"
          value={
            touristData?.birthDate ? dayjs(touristData?.birthDate ?? "") : null
          }
          onChange={(newValue) =>
            handlerFieldChange("birthDate", newValue?.toISOString())
          }
          slotProps={{
            textField: (props: any) => ({
              color: "secondary",
              ...props,
              inputProps: { ...props.inputProps, placeholder: "" },
            }),
          }}
        />
      </Stack>
    </Box>
  );
};
