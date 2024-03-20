import {
  Button,
  Dialog,
  DialogContent,
  Typography,
  Stack,
} from "@mui/material";

import { useDispatch, useSelector } from "react-redux";

import {
  isModalActive,
  setModalInactive,
} from "../../../redux/Modal/ModalReducer";
import { RootState } from "../../../redux/store";

function SuccessCancelBooking() {
  const activeModals = useSelector(
    (state: RootState) => state.modal.activeModals
  );

  const dispatch = useDispatch();

  const handlerBackClick = () => {
    dispatch(setModalInactive("successCancelBooking"));
    dispatch(setModalInactive("confirmCancelBooking"));
  };

  return (
    <Dialog
      className="successCancelBooking"
      onClose={() => dispatch(setModalInactive("successCancelBooking"))}
      open={isModalActive("successCancelBooking", activeModals)}
      fullWidth
      maxWidth={"sm"}
    >
      <DialogContent>
        <Typography variant={"h5"} sx={{ mb: "30px" }}>
          Ваше бронирование успешно отменено!
        </Typography>
        <Typography variant={"caption"}>До новых встреч!</Typography>

        <Stack
          direction={"row"}
          justifyContent={"end"}
          marginTop={"30px"}
          gap={1}
        >
          <Button onClick={handlerBackClick}>К турам</Button>
        </Stack>
      </DialogContent>
    </Dialog>
  );
}

export default SuccessCancelBooking;
