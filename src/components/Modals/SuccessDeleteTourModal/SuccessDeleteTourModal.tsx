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

function SuccessDeleteTourModal() {
  const activeModals = useSelector(
    (state: RootState) => state.modal.activeModals
  );

  const dispatch = useDispatch();

  const handlerCloseClick = () => {
    dispatch(setModalInactive("successDeleteTourModal"));
  };
  return (
    <Dialog
      className="successDeleteTourModal"
      onClose={() => dispatch(setModalInactive("successDeleteTourModal"))}
      open={isModalActive("successDeleteTourModal", activeModals)}
      fullWidth
      maxWidth={"sm"}
    >
      <DialogContent>
        <Typography variant={"h5"} sx={{ mb: "30px" }}>
          Ваш тур успешно удалён!
        </Typography>
        <Typography variant={"caption"}>До новых встреч!</Typography>

        <Stack direction={"row"} justifyContent={"end"} marginTop={"30px"}>
          <Button onClick={handlerCloseClick}>К моим турам</Button>
        </Stack>
      </DialogContent>
    </Dialog>
  );
}

export default SuccessDeleteTourModal;
