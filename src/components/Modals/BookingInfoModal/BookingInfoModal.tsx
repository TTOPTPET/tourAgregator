import { Dialog, DialogContent, Typography, Stack, Paper } from "@mui/material";

import { useDispatch, useSelector } from "react-redux";

import {
  isModalActive,
  setModalInactive,
} from "../../../redux/Modal/ModalReducer";
import { RootState } from "../../../redux/store";
import dayjs from "dayjs";

import userPhoto from "../../../media/userPhoto.svg";
import { IPublicTour } from "../../../models/calendarModels/IPublicTour";

type BookingInfoModalProps = {
  selectedBooking: IPublicTour;
};

function BookingInfoModal({ selectedBooking }: BookingInfoModalProps) {
  const activeModals = useSelector(
    (state: RootState) => state.modal.activeModals
  );

  const modal = activeModals.find((modal) => modal.id === "bookingInfoModal");

  const dispatch = useDispatch();

  const index = modal?.props?.index;

  return (
    <Dialog
      className="bookingInfoModal"
      onClose={() => dispatch(setModalInactive("bookingInfoModal"))}
      open={isModalActive("bookingInfoModal", activeModals)}
      fullWidth
      maxWidth={"md"}
    >
      <DialogContent sx={{ m: "0 auto", minWidth: "561px", maxWidth: "800px" }}>
        <Typography variant={"h4"} sx={{ mb: "30px", textAlign: "center" }}>
          Информация о бронировании
        </Typography>
        <Stack
          direction={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
          flexWrap={"wrap"}
          gap={"10px"}
        >
          <Typography variant={"h5"}>
            {selectedBooking ? selectedBooking?.tourName : "Название тура"}
          </Typography>
          <Typography variant={"caption"} sx={{ mt: "6px" }}>
            {selectedBooking && selectedBooking?.dateFrom
              ? dayjs(selectedBooking?.dateFrom).format("D MMMM YYYY") +
                " - " +
                dayjs(selectedBooking?.dateTo).format("D MMMM YYYY")
              : "Дата начала - Дата конца"}
          </Typography>
        </Stack>

        <Stack
          direction={"row"}
          justifyContent={"space-between"}
          gap={"80px"}
          alignItems={"center"}
          sx={{ mt: "20px" }}
        >
          <Stack direction={"row"} gap={"20px"} alignItems={"center"}>
            <Typography variant={"caption"}>
              {selectedBooking?.bookingInfo &&
              selectedBooking?.bookingInfo[index as number]?.name
                ? selectedBooking?.bookingInfo[index as number]?.name
                : "Пользователь не указан"}
            </Typography>
          </Stack>

          <Typography variant={"caption"}>
            {selectedBooking?.bookingInfo &&
            selectedBooking?.bookingInfo[index as number]?.phone
              ? `${selectedBooking?.bookingInfo[index as number]?.phone}`
              : "Номер телефона"}
          </Typography>

          <Typography variant={"caption"}>
            {selectedBooking?.bookingInfo &&
            selectedBooking?.bookingInfo[index as number]?.tourAmount
              ? `${new Intl.NumberFormat("ru-RU").format(
                  selectedBooking?.bookingInfo[index as number]?.tourAmount /
                    100
                )}₽`
              : "Стоимость тура"}
          </Typography>
        </Stack>

        {selectedBooking?.bookingInfo &&
          selectedBooking?.bookingInfo[index as number]?.comment && (
            <Stack direction={"column"} marginTop={"30px"} gap={"10px"}>
              <Typography variant={"h6"}>Комментарий к заказу</Typography>
              <Typography
                variant={"caption"}
                sx={{
                  wordWrap: "break-word",
                }}
              >
                {selectedBooking?.bookingInfo[index as number]?.comment}
              </Typography>
            </Stack>
          )}

        <Stack direction={"column"} marginTop={"30px"} gap={"10px"}>
          <Typography variant={"h6"}>Информация о туристах</Typography>
          <Stack direction={"column"}>
            {selectedBooking?.bookingInfo &&
              selectedBooking?.bookingInfo[index as number]?.tourists &&
              selectedBooking?.bookingInfo[index as number]?.tourists.map(
                (tourist, i) => (
                  <Typography
                    variant={"caption"}
                    sx={{
                      wordWrap: "initial",
                    }}
                  >
                    {i + 1}. {tourist.name},{" "}
                    {dayjs(tourist.birthDate).format("D MMMM YYYY")}
                  </Typography>
                )
              )}
          </Stack>
        </Stack>
      </DialogContent>
    </Dialog>
  );
}

export default BookingInfoModal;

const checkAge = (stringAge: string) => {
  const age =
    String(stringAge).length > 2
      ? Number(String(stringAge).slice(-2))
      : Number(String(stringAge));
  const lastSymbol = Number(String(stringAge).slice(-1));
  if (
    (age >= 5 && age <= 20) ||
    (lastSymbol >= 5 && lastSymbol <= 9) ||
    lastSymbol === 0
  ) {
    return `${stringAge} лет`;
  } else if (lastSymbol >= 2 && lastSymbol <= 4) {
    return `${stringAge} года`;
  } else if (lastSymbol === 1) {
    return `${stringAge} год`;
  } else {
    return stringAge;
  }
};
