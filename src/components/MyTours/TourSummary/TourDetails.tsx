import {
  Stack,
  Typography,
  Button,
  useTheme,
  useMediaQuery,
  Skeleton,
  Box,
} from "@mui/material";
import dayjs from "dayjs";
import "dayjs/locale/ru";
import { FC, Dispatch, SetStateAction } from "react";
import { ITourBookingData } from "../../../models/tourModels/ITourBookingData";
import { TourDetailsType } from "./tourDetailsType/tourDetailsType";
import { useDispatch } from "react-redux";
import { setModalActive } from "../../../redux/Modal/ModalReducer";
import MapLeaflet from "../../MapLeaflet/MapLeaflet";
import { IUserRecord } from "../../../models/userModels/IUserRecord";
import { cancelBooking } from "../../../API/touristAPI/cancelBooking";

interface ITourDetailsProps {
  record: TourDetailsType;
  bookingData?: ITourBookingData;
  records?: IUserRecord[];
  setRecords?: Dispatch<SetStateAction<IUserRecord[]>>;
}

export const checkReturnPayment = (booking: IUserRecord) => {
  return booking.statusBooking === "cancelled";
};

export const TourDetails: FC<ITourDetailsProps> = ({
  record,
  bookingData,
  records,
  setRecords,
}) => {
  const dispatch = useDispatch();

  const theme = useTheme();

  const lessThenSmall = useMediaQuery(theme.breakpoints.down("sm"));

  const freeTagConverter = (recordValue: TourDetailsType) => {
    switch (recordValue.type) {
      case "record":
        return recordValue?.tour?.freeServices
          ? recordValue?.tour?.freeServices.map((service, index) =>
              index === recordValue?.tour?.freeServices?.length - 1
                ? `${service}`
                : `${service} • `
            )
          : "Ничего не включено";
      case "tourInfo":
        return recordValue?.freeServices
          ? recordValue?.freeServices.map((service, index) =>
              index === recordValue?.freeServices!.length - 1
                ? `${service}`
                : `${service} • `
            )
          : "Ничего не включено";
    }
  };

  const additionalTagConverter = (recordValue: TourDetailsType) => {
    switch (recordValue.type) {
      case "record":
        return recordValue?.tour?.additionalServices
          ? recordValue?.tour?.additionalServices.map((service, index) =>
              index === recordValue?.tour?.additionalServices?.length - 1
                ? `${service}`
                : `${service} • `
            )
          : "Нет услуг";
      case "tourInfo":
        return recordValue?.additionalServices
          ? recordValue?.additionalServices.map((service, index) =>
              index === recordValue?.additionalServices!.length - 1
                ? `${service}`
                : `${service} • `
            )
          : "Нет услуг";
    }
  };

  dayjs.locale("ru");

  switch (record.type) {
    case "record":
      return (
        <Stack padding={3} gap={2}>
          <Stack
            display={"flex"}
            justifyContent={"space-between"}
            direction={"row"}
          >
            <Stack gap={1}>
              <Typography variant={"h6"}>Количество человек</Typography>
              <Typography variant={"caption"}>{0} человека</Typography>

              <Typography variant={"h6"}>Сбор</Typography>
              <Typography variant={"caption"}>
                {record.meetingPoint +
                  " в " +
                  dayjs(record.meetingTime).format("hh:mm D MMMM YYYY")}
              </Typography>

              <Typography variant={"h6"}>Контактная информация</Typography>
              <Stack display="flex" direction={"row"} gap={1} ml="20px">
                <Typography variant={"h6"}>Имя:</Typography>{" "}
                <Typography variant="caption">
                  {record.contactInformation.name}
                </Typography>
              </Stack>
              <Stack display="flex" direction={"row"} gap={1} ml="20px">
                <Typography variant={"h6"}>Почта:</Typography>{" "}
                <Typography variant="caption">
                  {record.contactInformation.email}
                </Typography>
              </Stack>
              <Stack display="flex" direction={"row"} gap={1} ml="20px">
                <Typography variant={"h6"}>Телефон:</Typography>{" "}
                <Typography variant="caption">
                  {record.contactInformation.phone}
                </Typography>
              </Stack>

              <Typography variant={"h6"}>Включено в стоимость</Typography>
              <Typography variant={"caption"}>
                {freeTagConverter(record)}
              </Typography>

              <Typography variant={"h6"}>Дополнительные услуги</Typography>
              <Typography variant={"caption"}>
                {additionalTagConverter(record)}
              </Typography>
            </Stack>
            <Stack gap={1} alignItems={"flex-end"}>
              <Button
                disabled={record.statusBooking !== "isActive"}
                onClick={() => {
                  cancelBooking(
                    record.bookingId,
                    () => {
                      dispatch(setModalActive("succesReturnMoney"));
                      setRecords &&
                        setRecords((records) =>
                          records.filter(
                            (item) => item.bookingId !== record.bookingId
                          )
                        );
                    },
                    () => {
                      dispatch(setModalActive("errorBookingModal"));
                    }
                  );
                }}
                sx={{ width: "260px" }}
              >
                Оформить возврат
              </Button>
              {!checkReturnPayment(record) && (
                <Typography variant={"caption"}>
                  до{" "}
                  {dayjs(record.dateFrom)
                    .subtract(1, "day")
                    .format("D MMMM YYYY")}
                </Typography>
              )}
              <Button
                onClick={() => {
                  dispatch(
                    setModalActive("errorReportModal", {
                      gidEmail: record.contactInformation.email,
                      publicTourId: record.publicTourId,
                    })
                  );
                }}
                sx={{ width: "260px", mt: "100px" }}
              >
                Сообщить о проблеме
              </Button>
              <Button
                onClick={() => {
                  console.log(true);
                  dispatch(
                    setModalActive("errorReportModal", {
                      tour: true,
                      record: record,
                    })
                  );
                }}
                sx={{ width: "260px" }}
              >
                Связаться с гидом
              </Button>
            </Stack>
          </Stack>

          {record?.tour?.mapPoints && record?.tour?.mapPoints.length === 0 ? (
            <Box sx={{ width: "100%", position: "relative" }}>
              <Skeleton
                variant="rounded"
                height={"330px"}
                sx={{ borderRadius: "10px" }}
              />
              <Typography
                variant={"h4"}
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  textAlign: "center",
                  transform: "translatey(-50%) translatex(-50%)",
                  color: "rgba(0, 0, 0, 0.2)",
                  textTransform: "uppercase",
                }}
              >
                Маршрут не выбран
              </Typography>
            </Box>
          ) : (
            <MapLeaflet
              width={"100%"}
              height={"330px"}
              accessType="observe"
              mapCenter={
                record?.tour?.mapPoints ? record?.tour?.mapPoints[0] : undefined
              }
              positions={record?.tour?.mapPoints}
            />
          )}
        </Stack>
      );

    case "tourInfo":
      return (
        <Stack
          padding={lessThenSmall ? 1 : 3}
          gap={1}
          sx={{ position: "relative" }}
        >
          <Typography variant={"h5"} sx={{ position: "absolute", right: "2%" }}>
            {bookingData?.touristsAmount
              ? `${(record?.price! / 100) * bookingData.touristsAmount}₽`
              : ""}
          </Typography>
          <Typography variant={"h6"}>Количество человек</Typography>
          <Typography variant={"caption"}>
            {bookingData?.touristsAmount} человека
          </Typography>
          <Typography variant={"h6"}>Сбор</Typography>
          <Typography variant={"caption"}>
            {record?.meetingPoint +
              " " +
              dayjs(record?.meetingDatetime)
                .format("D MMMM YYYY HH:MM")
                .toString()}
          </Typography>
          <Typography variant={"h6"}>Включено в стоимость</Typography>
          <Typography variant={"caption"}>
            {freeTagConverter(record)}
          </Typography>
          <Typography variant={"h6"}>Дополнительные услуги</Typography>
          <Typography variant={"caption"}>
            {additionalTagConverter(record)}
          </Typography>
          <Typography variant={"h5"}>Маршрут</Typography>
          {record?.mapPoints && record?.mapPoints.length === 0 ? (
            <Box sx={{ width: "100%", position: "relative" }}>
              <Skeleton
                variant="rounded"
                height={"330px"}
                sx={{ borderRadius: "10px" }}
              />
              <Typography
                variant={"h4"}
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  textAlign: "center",
                  transform: "translatey(-50%) translatex(-50%)",
                  color: "rgba(0, 0, 0, 0.2)",
                  textTransform: "uppercase",
                }}
              >
                Маршрут не выбран
              </Typography>
            </Box>
          ) : (
            <MapLeaflet
              width={"100%"}
              height={"330px"}
              accessType="observe"
              mapCenter={record?.mapPoints ? record?.mapPoints[0] : undefined}
              positions={record?.mapPoints!}
            />
          )}
        </Stack>
      );
    default:
      return <></>;
  }
};
