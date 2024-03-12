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

function SuccessCancelPostedTourModal() {
  const activeModals = useSelector(
    (state: RootState) => state.modal.activeModals
  );

  const dispatch = useDispatch();

  const modal = activeModals.find(
    (modal) => modal.id === "successCancelPostedTourModal"
  );

  const handlerCloseClick = () => {
    dispatch(setModalInactive("successCancelPostedTourModal"));
  };
  return (
    <Dialog
      className="successCancelPostedTourModal"
      onClose={() => dispatch(setModalInactive("successCancelPostedTourModal"))}
      open={isModalActive("successCancelPostedTourModal", activeModals)}
      fullWidth
      maxWidth={"sm"}
    >
      <DialogContent>
        <Typography variant={"h5"} sx={{ mb: "30px" }}>
          {modal?.props?.multiply
            ? "Ваши туры успешно отменены!"
            : "Ваш тур успешно отменён!"}
        </Typography>
        <Typography variant={"caption"}>До новых встреч!</Typography>

        <Stack direction={"row"} justifyContent={"end"} marginTop={"30px"}>
          <Button onClick={handlerCloseClick}>Закрыть</Button>
        </Stack>
      </DialogContent>
    </Dialog>
  );
}

export default SuccessCancelPostedTourModal;
