import {
  Button,
  Dialog,
  DialogContent,
  Typography,
  Stack,
} from "@mui/material";

import { useDispatch, useSelector } from "react-redux";

import { cancelBooking } from "../../../API/touristAPI/cancelBooking";

import {
  isModalActive,
  setModalActive,
  setModalInactive,
} from "../../../redux/Modal/ModalReducer";
import { RootState } from "../../../redux/store";

function ConfirmCancelBooking() {
  const activeModals = useSelector(
    (state: RootState) => state.modal.activeModals
  );

  const dispatch = useDispatch();

  const modalProps = activeModals.find(
    (modal) => modal.id === "confirmCancelBooking"
  );

  let bookingId = modalProps?.props?.bookingId;
  let records = modalProps?.props?.records;
  let setRecords = modalProps?.props?.setRecords;

  const handlerBackClick = () => {
    dispatch(setModalInactive("confirmCancelBooking"));
  };

  const handlerConfirmClick = () => {
    //   cancelBooking(
    //     bookingId,
    //     () => {
    //       dispatch(setModalActive("successCancelBooking"));
    //       dispatch(setModalInactive("confirmCancelBooking"));
    //       records[
    //         records.findIndex((item) => item.bookingId === bookingId)
    //       ].bookingStatus.payment = "successReturn";
    //       records[
    //         records.findIndex((item) => item.bookingId === bookingId)
    //       ].bookingStatus.cancellation = "cancelledTourists";
    //       setRecords([...records]);
    //     },
    //     () => {
    //       dispatch(setModalActive("errorBookingModal"));
    //       dispatch(setModalInactive("confirmCancelBooking"));
    //     }
    //   );
  };

  return (
    <Dialog
      className="confirmCancelBooking"
      onClose={() => dispatch(setModalInactive("confirmCancelBooking"))}
      open={isModalActive("confirmCancelBooking", activeModals)}
      fullWidth
      maxWidth={"sm"}
    >
      <DialogContent>
        <Typography variant={"h5"} sx={{ mb: "30px" }}>
          Подтверждение отмены бронирования
        </Typography>
        <Typography variant={"caption"}>
          Вы уверены, что хотите отменить бронирование?
        </Typography>

        <Stack
          direction={"row"}
          justifyContent={"end"}
          marginTop={"30px"}
          gap={1}
        >
          <Button onClick={handlerBackClick}>Назад</Button>
          <Button onClick={handlerConfirmClick}>Да, отменить</Button>
        </Stack>
      </DialogContent>
    </Dialog>
  );
}

export default ConfirmCancelBooking;
