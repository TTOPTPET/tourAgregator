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

function NoLoginModal() {
  const activeModals = useSelector(
    (state: RootState) => state.modal.activeModals
  );

  const dispatch = useDispatch();

  const handlerBackClick = () => {
    dispatch(setModalInactive("noLoginModal"));
  };

  return (
    <Dialog
      className="noLoginModal"
      onClose={() => dispatch(setModalInactive("noLoginModal"))}
      open={isModalActive("noLoginModal", activeModals)}
      fullWidth
      maxWidth={"sm"}
    >
      <DialogContent>
        <Typography variant={"h5"} sx={{ mb: "30px" }}>
          Ошибка!
        </Typography>
        <Typography variant={"caption"}>
          Для регистрации на тур необходимо авторизироваться или
          зарегестрироваться.
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
            to={"/auth"}
            onClick={() => dispatch(setModalInactive("noLoginModal"))}
          >
            На страницу авторизации
          </Button>
        </Stack>
      </DialogContent>
    </Dialog>
  );
}

export default NoLoginModal;
