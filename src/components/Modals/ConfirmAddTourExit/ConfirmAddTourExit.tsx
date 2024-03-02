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
import { useNavigate } from "react-router-dom";

function ConfirmAddTourExit() {
  const activeModals = useSelector(
    (state: RootState) => state.modal.activeModals
  );

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handlerCloseClick = () => {
    dispatch(setModalInactive("confirmAddTourExit"));
  };

  const handleConfirmClick = () => {
    navigate("/creator/lk");
    dispatch(setModalInactive("confirmAddTourExit"));
  };

  return (
    <Dialog
      className="confirmAddTourExit"
      onClose={() => dispatch(setModalInactive("confirmAddTourExit"))}
      open={isModalActive("confirmAddTourExit", activeModals)}
      fullWidth
      maxWidth={"md"}
    >
      <DialogContent>
        <Typography variant={"h5"} sx={{ mb: "30px" }}>
          Вы уверены что хотите покинуть эту страницу?
        </Typography>
        <Typography variant={"caption"}>
          Если вы сейчас покинете эту страницу все введенные вами данные будут
          утеряны!
        </Typography>

        <Stack
          direction={"row"}
          justifyContent={"end"}
          marginTop={"30px"}
          gap={1}
        >
          <Button onClick={handlerCloseClick}>Отмена</Button>
          <Button onClick={handleConfirmClick}>Да, закрыть</Button>
        </Stack>
      </DialogContent>
    </Dialog>
  );
}

export default ConfirmAddTourExit;
