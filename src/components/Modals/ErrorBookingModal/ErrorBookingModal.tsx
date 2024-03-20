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

function ErrorBookingModal() {
  const activeModals = useSelector(
    (state: RootState) => state.modal.activeModals
  );

  const dispatch = useDispatch();

  const handlerCloseClick = () => {
    dispatch(setModalInactive("errorBookingModal"));
  };

  return (
    <>
      <Dialog
        className="errorBookingModal"
        onClose={() => dispatch(setModalInactive("errorBookingModal"))}
        open={isModalActive("errorBookingModal", activeModals)}
        fullWidth
        maxWidth={"sm"}
      >
        <DialogContent>
          <Typography variant={"h5"} sx={{ mb: "30px" }}>
            Ошибка!
          </Typography>
          <Typography variant={"caption"}>
            Что-то пошло не так, попробуйте позже.
          </Typography>

          <Stack direction={"row"} justifyContent={"end"} marginTop={"30px"}>
            <Button onClick={handlerCloseClick}>Закрыть</Button>
          </Stack>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default ErrorBookingModal;
