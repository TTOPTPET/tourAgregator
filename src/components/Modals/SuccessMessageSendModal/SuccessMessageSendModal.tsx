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

function SuccessMessageSendModal() {
  const activeModals = useSelector(
    (state: RootState) => state.modal.activeModals
  );

  const dispatch = useDispatch();
  const modal = activeModals.find(
    (modal) => modal.id === "successMessageSendModal"
  );

  console.log(modal?.props?.quest);

  const handlerCloseClick = () => {
    dispatch(setModalInactive("successMessageSendModal"));
  };

  return (
    <Dialog
      className="successMessageSendModal"
      onClose={() => dispatch(setModalInactive("successMessageSendModal"))}
      open={isModalActive("successMessageSendModal", activeModals)}
      fullWidth
      maxWidth={"sm"}
    >
      <DialogContent>
        <Typography variant={"h5"} sx={{ mb: "30px" }}>
          Ваше сообщение успешно отправлено!
        </Typography>
        <Typography variant={"caption"}>
          {modal?.props?.quest
            ? "Ваше сообщение передано гиду! В ближайшее время он с вами свяжется!"
            : "Большое спасибо за обратную связь, мы постараемся решить Вашу проблему как можно скорее!"}
        </Typography>

        <Stack direction={"row"} justifyContent={"end"} marginTop={"30px"}>
          <Button onClick={handlerCloseClick}>Отлично</Button>
        </Stack>
      </DialogContent>
    </Dialog>
  );
}

export default SuccessMessageSendModal;
