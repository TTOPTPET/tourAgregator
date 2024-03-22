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

function SuccessEmailMessageSendModal() {
  const activeModals = useSelector(
    (state: RootState) => state.modal.activeModals
  );

  const dispatch = useDispatch();

  const handlerCloseClick = () => {
    dispatch(setModalInactive("successEmailMessageSendModal"));
  };

  return (
    <Dialog
      className="successEmailMessageSendModal"
      onClose={() => dispatch(setModalInactive("successEmailMessageSendModal"))}
      open={isModalActive("successEmailMessageSendModal", activeModals)}
      fullWidth
      maxWidth={"sm"}
    >
      <DialogContent>
        <Typography variant={"h5"} sx={{ mb: "30px" }}>
          Успешно!
        </Typography>
        <Typography variant={"caption"}>
          Сообщение отправлено на вашу почту.
        </Typography>

        <Stack direction={"row"} justifyContent={"end"} marginTop={"30px"}>
          <Button onClick={handlerCloseClick}>Отлично</Button>
        </Stack>
      </DialogContent>
    </Dialog>
  );
}

export default SuccessEmailMessageSendModal;
