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
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";

function SuccessPayModal({ meetingTime }: { meetingTime: string }) {
  const activeModals = useSelector(
    (state: RootState) => state.modal.activeModals
  );

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handlerCloseClick = () => {
    dispatch(setModalInactive("successPayModal"));
    navigate("/");
  };
  return (
    <Dialog
      className="successPayModal"
      onClose={() => {
        dispatch(setModalInactive("successPayModal"));
        navigate("/");
      }}
      open={isModalActive("successPayModal", activeModals)}
      fullWidth
      maxWidth={"sm"}
    >
      <DialogContent>
        <Typography variant={"h5"} sx={{ mb: "30px" }}>
          Вы успешно оплатили тур!
        </Typography>
        <Typography variant={"caption"}>
          Увидимся {dayjs(meetingTime).format("D MMMM YYYY")}!
        </Typography>

        <Stack direction={"row"} justifyContent={"end"} marginTop={"30px"}>
          <Button onClick={handlerCloseClick}>К бронированию</Button>
        </Stack>
      </DialogContent>
    </Dialog>
  );
}

export default SuccessPayModal;
