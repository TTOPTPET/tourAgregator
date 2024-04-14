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

function SuccessReturnTour() {
  const activeModals = useSelector(
    (state: RootState) => state.modal.activeModals
  );

  const dispatch = useDispatch();

  const handlerCloseClick = () => {
    dispatch(setModalInactive("successReturnTour"));
  };
  return (
    <Dialog
      className="successReturnTour"
      onClose={() => dispatch(setModalInactive("successReturnTour"))}
      open={isModalActive("successReturnTour", activeModals)}
      fullWidth
      maxWidth={"sm"}
    >
      <DialogContent>
        <Typography variant={"h5"} sx={{ mb: "30px" }}>
          Ваш тур восстановлен!
        </Typography>
        <Typography variant={"caption"}>
          Вы можете работать с восстановленным туром из своего личного кабинета.
          До новых встреч!
        </Typography>

        <Stack direction={"row"} justifyContent={"end"} marginTop={"30px"}>
          <Button onClick={handlerCloseClick}>К моим турам</Button>
        </Stack>
      </DialogContent>
    </Dialog>
  );
}

export default SuccessReturnTour;
