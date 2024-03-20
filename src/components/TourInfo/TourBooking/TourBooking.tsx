import {
  Stack,
  Typography,
  TextField,
  Box,
  Button,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import { FC, Dispatch, SetStateAction, useState, useEffect } from "react";
import { lightTurquoiseColor, redColor } from "../../../config/MUI/color/color";
import { ITourBookingData } from "../../../models/tourModels/ITourBookingData.ts";
import { ITourInfo } from "../../../models/tourModels/ITourInfo";
import { tourStepsMap } from "../../../pages/TourPage/TourPage";
import { booking } from "../../../API/touristAPI/booking";
import isBetween from "dayjs/plugin/isBetween";
import SuccessPayModal from "../../Modals/SuccessPayModal/SuccessPayModal";
import ErrorBookingModal from "../../Modals/ErrorBookingModal/ErrorBookingModal";
import { setModalActive } from "../../../redux/Modal/ModalReducer";
import { useDispatch } from "react-redux";
import { LOGGINED } from "../../../config/types";
import { useCookies } from "react-cookie";
import NoLoginModal from "../../Modals/NoLoginModal/NoLoginModal";

dayjs.extend(isBetween);

interface ITourBookingProps {
  tourInfo: ITourInfo;
  bookingData: ITourBookingData;
  setBookingData: Dispatch<SetStateAction<ITourBookingData>>;
  setPage: (prop: any) => void;
  isFirstPage: boolean;
  setError?: Dispatch<SetStateAction<boolean>>;
}

export const TourBooking: FC<ITourBookingProps> = ({
  tourInfo,
  bookingData,
  setBookingData,
  setPage,
  isFirstPage,
  setError,
}) => {
  const theme = useTheme();

  const lessThenBig = useMediaQuery(theme.breakpoints.down("lg"));
  const lessThenSmall = useMediaQuery(theme.breakpoints.down("sm"));

  const [cookies] = useCookies([LOGGINED]);

  const [errSize, setErrSize] = useState(false);

  useEffect(() => {
    if (bookingData?.touristsAmount! > tourInfo?.vacancies) {
      setErrSize(true);
    } else {
      setErrSize(false);
    }
  }, [bookingData?.touristsAmount, tourInfo?.maxPersonNumber]);

  const dispatch = useDispatch();

  const handlerPurchaseClick = () => {
    booking(
      bookingData,
      (data) => {
        window.location.replace(data?.paymentUrl);
        dispatch(setModalActive("successPayModal"));
      },
      () => {
        dispatch(setModalActive("errorBookingModal"));
        setError && setError(true);
      }
    );
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Stack
        direction={"row"}
        // gap={10}
        flexWrap={"wrap"}
        alignItems={"start"}
        mt={5}
        justifyContent={"space-between"}
      >
        <Box
          sx={{
            width: { lg: "380px", md: "268px", sm: "100%", xs: "260px" },
            height: { lg: "270px", md: "190px", xs: "170px" },
            backgroundColor: lightTurquoiseColor,
            borderRadius: 5,
            mt: "15px",
          }}
          padding={{ lg: "30px", md: "30px", xs: "20px" }}
        >
          <Typography variant={"h5"}>
            {tourInfo?.tourName || "Название тура"}
          </Typography>
          <Typography variant={"caption"}>
            {"nearestDate" in tourInfo
              ? (dayjs(tourInfo?.dateFrom).format("D MMMM YYYY") || "") +
                " - " +
                (dayjs(tourInfo?.dateTo).format("D MMMM YYYY") || "")
              : ""}
          </Typography>
          <Typography variant={"h5"} mt={2}>
            {tourInfo?.price! / 100 || 0}₽
          </Typography>
          <Stack direction={"column"} gap={2} mt={"15px"}>
            <Stack direction={"column"}>
              <TextField
                label={"Количество человек"}
                type={"number"}
                InputProps={{ inputProps: { min: 0, max: 50 } }}
                error={errSize}
                color="secondary"
                sx={{ width: { lg: "300px", xs: "260px" } }}
                value={bookingData?.touristsAmount || undefined}
                onChange={(e) =>
                  setBookingData({
                    ...bookingData,
                    touristsAmount: +e.target.value,
                  })
                }
              />
              <Typography
                variant={"caption"}
                fontSize={
                  lessThenSmall
                    ? "11px"
                    : lessThenBig
                      ? "14px !important"
                      : "16px"
                }
                sx={{ m: "7px 15px 0" }}
              >
                Мест свободно: {tourInfo?.vacancies || 0}
              </Typography>
              {errSize && (
                <Typography
                  variant="caption"
                  className="size__error"
                  sx={{ color: redColor, mb: "15px" }}
                >
                  Превышен лимит туристов
                </Typography>
              )}
            </Stack>
          </Stack>
          {isFirstPage ? (
            <Button
              variant={"contained"}
              sx={{ marginTop: 1 }}
              onClick={() => {
                cookies.LOGGINED
                  ? setPage((page: tourStepsMap) =>
                      page < 2 ? page + 1 : page
                    )
                  : dispatch(setModalActive("noLoginModal"));
              }}
            >
              Забронировать
            </Button>
          ) : (
            <Stack direction={"row"} gap={2} mt={"8px"}>
              <Button
              //   onClick={() => handlerPurchaseClick(true)}
              >
                Оплатить
              </Button>
            </Stack>
          )}
        </Box>
      </Stack>
      <SuccessPayModal meetingTime={tourInfo.meetingDatetime} />
      <ErrorBookingModal />
      <NoLoginModal />
    </LocalizationProvider>
  );
};
