import {
  Button,
  Dialog,
  DialogContent,
  Typography,
  Stack,
} from "@mui/material";

import { useDispatch, useSelector } from "react-redux";

import { Link } from "react-router-dom";

import {
  isModalActive,
  setModalInactive,
} from "../../../redux/Modal/ModalReducer";
import { RootState } from "../../../redux/store";

function NeedDeletePublicModal() {
  const activeModals = useSelector(
    (state: RootState) => state.modal.activeModals
  );

  const dispatch = useDispatch();

  const handlerBackClick = () => {
    dispatch(setModalInactive("needDeletePublicModal"));
  };

  return (
    <Dialog
      className="needDeletePublicModal"
      onClose={() => dispatch(setModalInactive("needDeletePublicModal"))}
      open={isModalActive("needDeletePublicModal", activeModals)}
      fullWidth
      maxWidth={"sm"}
    >
      <DialogContent>
        <Typography variant={"h5"} sx={{ mb: "30px" }}>
          Внимание!
        </Typography>
        <Typography variant={"caption"}>
          Для удаления или изменения шаблона тура необходимо отменить все
          размещения!
        </Typography>

        <Stack
          direction={"row"}
          justifyContent={"end"}
          marginTop={"30px"}
          gap={1}
        >
          <Button onClick={handlerBackClick}>Назад</Button>
          <Button
            component={Link}
            to={"/creator/calendar"}
            onClick={() => dispatch(setModalInactive("needDeletePublicModal"))}
          >
            На страницу календаря
          </Button>
        </Stack>
      </DialogContent>
    </Dialog>
  );
}

export default NeedDeletePublicModal;
