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

//   export const checkReturnPayment = (booking: IUserRecord) => {
//       return (booking.bookingStatus.cancellation === "cancelledCreator" ||
//           booking.bookingStatus.cancellation === "cancelledAdmin")
//   }

//   const checkPayForTour = (booking: IUserRecord) => {
//       return booking.bookingStatus.payment === "successPay"
//   }

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
          : "Ничего не включено";
      case "tourInfo":
        return recordValue?.additionalServices
          ? recordValue?.additionalServices.map((service, index) =>
              index === recordValue?.additionalServices!.length - 1
                ? `${service}`
                : `${service} • `
            )
          : "Ничего не включено";
    }
  };

  dayjs.locale("ru");

  switch (record.type) {
    //   case "record":
    //     return (
    //       <Stack padding={lessThenSmall ? 1 : 3} gap={1}>
    //         <Stack
    //           justifyContent={"space-between"}
    //           flexWrap={"wrap"}
    //           alignItems={"center"}
    //           direction={"row"}
    //         >
    //           <Typography variant={"h6"}>Количество человек</Typography>
    //           {!lessThenSmall && checkReturnPayment(record) ? (
    //               <Button
    //                 disabled={
    //                 record.bookingStatus.payment !== "successPay"
    //                 }
    //                 onClick={() => {
    //                   cancelBooking(
    //                     record.bookingId,
    //                     () => {
    //                       dispatch(setModalActive("succesReturnMoney"));
    //                     },
    //                     () => {
    //                       dispatch(setModalActive("errorBookingModal"));
    //                     }
    //                   );
    //                 }}
    //               >
    //                 Оформить возврат
    //               </Button>
    //             ) : (
    //               <Button
    //                 disabled={
    //                   dayjs(record.tourDate.from).subtract(1, "day") < dayjs()||
    //                 record.bookingStatus.payment === "successReturn" ||
    //                 record.bookingStatus.payment === "failPay"
    //                 }
    //                 onClick={() =>
    //                   dispatch(
    //                     setModalActive("confirmCancelBooking", {
    //                       bookingId: record.bookingId,
    //                       records: records,
    //                       setRecords: setRecords,
    //                     })
    //                   )
    //                 }
    //               >
    //                 Отменить бронирование
    //               </Button>
    //             )}
    //         </Stack>
    //         <Stack
    //           justifyContent={"space-between"}
    //           flexWrap={"wrap"}
    //           alignItems={"center"}
    //           direction={"row"}
    //         >
    //           <Typography variant={"caption"}>
    //             {record?.bookingNumber || 0} человека
    //           </Typography>
    //           {!lessThenSmall && !checkReturnPayment(record) && (
    //             <Typography variant={"caption"}>
    //               до{" "}
    //               {dayjs(record.tourDate.from)
    //                 .subtract(1, "day")
    //                 .format("D MMMM YYYY")}
    //             </Typography>
    //           )}
    //         </Stack>
    //         <Typography variant={"h6"}>Проживание</Typography>
    //         <Typography variant={"caption"}>
    //           {housingIncludeConverter(record?.tour?.housingInclude)}
    //         </Typography>
    //         <Typography variant={"h6"}>Страхование</Typography>
    //         <Typography variant={"caption"}>
    //           {record.tour?.insuranceInclude !== undefined ? (
    //             <>Страхование включено</>
    //           ) : (
    //             <>Страхование не включено</>
    //           )}
    //         </Typography>
    //         <Typography variant={"h6"}>Контакты</Typography>
    //         <Stack
    //           justifyContent={"space-between"}
    //           flexWrap={"wrap"}
    //           alignItems={"center"}
    //           direction={"row"}
    //         >
    //           <Typography variant={"caption"}>
    //             {record?.contactInformation || "Контакты не указаны"}
    //           </Typography>
    //           {!lessThenSmall && (
    //             <Button
    //               onClick={() => {
    //                 console.log(true);
    //                 dispatch(
    //                   setModalActive("errorReportModal", {
    //                     tour: true,
    //                     record: record,
    //                   })
    //                 );
    //               }}
    //             >
    //               Сообщить о проблеме
    //             </Button>
    //           )}
    //         </Stack>
    //         <Typography variant={"h6"}>Сбор</Typography>
    //         <Typography variant={"caption"}>
    //           {record.meetingPoint +
    //             " в " +
    //             dayjs(record.meetingTime).format("hh:mm D MMMM YYYY")}
    //         </Typography>
    //         <Typography variant={"h6"}>Включено в стоимость</Typography>
    //         <Typography variant={"caption"}>
    //           {freeTagConverter(record)}
    //         </Typography>
    //         {lessThenSmall && (
    //           <Stack width={"200px"} gap="5px" margin={"0 auto"}>
    //             <Button
    //               sx={{ width: "100%" }}
    //               onClick={() => {
    //                 console.log(true);
    //                 dispatch(
    //                   setModalActive("errorReportModal", {
    //                     tour: true,
    //                     record: record,
    //                   })
    //                 );
    //               }}
    //             >
    //               Сообщить о проблеме
    //             </Button>
    //             <Stack gap="3px" alignItems={"flex-end"}>
    //               <Button
    //                 sx={{ width: "100%" }}
    //                 disabled={
    //                   dayjs(record.tourDate.from).subtract(1, "day") < dayjs()
    //                 }
    //                 onClick={() =>
    //                   dispatch(
    //                     setModalActive("confirmCancelBooking", {
    //                       bookingId: record.bookingId,
    //                     })
    //                   )
    //                 }
    //               >
    //                 Отменить бронирование
    //               </Button>
    //               <Typography variant={"caption"}>
    //                 до{" "}
    //                 {dayjs(record.tourDate.from)
    //                   .subtract(1, "day")
    //                   .format("D MMMM YYYY")}
    //               </Typography>
    //             </Stack>
    //           </Stack>
    //         )}
    //         {record?.tour?.mapPoints && record?.tour?.mapPoints.length === 0 ? (
    //           <Box sx={{ width: "100%", position: "relative" }}>
    //             <Skeleton
    //               variant="rounded"
    //               height={"330px"}
    //               sx={{ borderRadius: "10px" }}
    //             />
    //             <Typography
    //               variant={"h4"}
    //               sx={{
    //                 position: "absolute",
    //                 top: "50%",
    //                 left: "50%",
    //                 textAlign: "center",
    //                 transform: "translatey(-50%) translatex(-50%)",
    //                 color: "rgba(0, 0, 0, 0.2)",
    //                 textTransform: "uppercase",
    //               }}
    //             >
    //               Маршрут не выбран
    //             </Typography>
    //           </Box>
    //         ) : (
    //           <MapLeaflet
    //             width={"100%"}
    //             height={"330px"}
    //             accessType="observe"
    //             mapCenter={
    //               record?.tour?.mapPoints ? record?.tour?.mapPoints[0] : undefined
    //             }
    //             positions={record?.tour?.mapPoints}
    //           />
    //         )}
    //       </Stack>
    //     );

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
