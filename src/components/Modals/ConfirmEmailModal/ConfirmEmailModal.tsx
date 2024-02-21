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

function ConfirmEmailModal() {
  const activeModals = useSelector(
    (state: RootState) => state.modal.activeModals
  );

  const dispatch = useDispatch();

  const handlerCloseClick = () => {
    dispatch(setModalInactive("сonfirmEmailModal"));
  };

  return (
    <Dialog
      className="сonfirmEmailModal"
      onClose={() => dispatch(setModalInactive("сonfirmEmailModal"))}
      open={isModalActive("сonfirmEmailModal", activeModals)}
      fullWidth
      maxWidth={"md"}
    >
      <DialogContent>
        <Typography variant={"h5"} sx={{ mb: "30px" }}>
          Завершение регистрации
        </Typography>
        <Typography variant={"caption"}>
          Для завершения регистрации необходимо подтвердить e-mail. Письмо
          отправлено на ваш e-mail адрес.
        </Typography>

        <Stack
          direction={"row"}
          justifyContent={"end"}
          marginTop={"30px"}
          gap={1}
        >
          <Button onClick={handlerCloseClick}>Закрыть</Button>
        </Stack>
      </DialogContent>
    </Dialog>
  );
}

export default ConfirmEmailModal;
