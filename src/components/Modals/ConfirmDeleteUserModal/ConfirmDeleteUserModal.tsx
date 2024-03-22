import {
  Button,
  Dialog,
  DialogContent,
  Typography,
  Stack,
  CircularProgress,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  isModalActive,
  setModalInactive,
} from "../../../redux/Modal/ModalReducer";
import { RootState } from "../../../redux/store";
import { useState } from "react";
import { deleteUser } from "../../../API/authAPI";
import { logout } from "../../../API/authAPI/logout";
import { useNavigate } from "react-router-dom";
import { LOGGINED, ROLE } from "../../../config/types";
import { useCookies } from "react-cookie";
import { redColor } from "../../../config/MUI/color/color";

function ConfirmDeleteUserModal() {
  const activeModals = useSelector(
    (state: RootState) => state.modal.activeModals
  );

  const modal = activeModals.find(
    (modal) => modal.id === "confirmDeleteUserModal"
  );

  const [cookies, setCookies, removeCookies] = useCookies([LOGGINED, ROLE]);
  const [errorMessage, setErrorMessage] = useState("");

  let id = modal?.props?.userId;

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  const handlerBackClick = () => {
    dispatch(setModalInactive("confirmDeleteUserModal"));
  };

  const handlerConfirmClick = () => {
    setErrorMessage("");
    setLoading(true);
    deleteUser(
      id as string,
      () => {
        logout(
          () => {
            navigate("/auth");
            removeCookies(LOGGINED, { path: "/" });
            removeCookies(ROLE, { path: "/" });
          },
          () => {}
        );
        setLoading(false);
      },
      () => {
        setErrorMessage("Что-то пошло не так, попробуйте еще раз позже!");
        setLoading(false);
      }
    );
  };
  return (
    <Dialog
      className="confirmDeleteUserModal"
      onClose={() => {
        dispatch(setModalInactive("confirmDeleteUserModal"));
        setErrorMessage("");
      }}
      open={isModalActive("confirmDeleteUserModal", activeModals)}
      fullWidth
      maxWidth={"sm"}
    >
      <DialogContent>
        <Typography variant={"h5"} sx={{ mb: "30px" }}>
          Подтверждение удаления
        </Typography>
        <Typography variant={"caption"}>
          Вы уверены, что хотите удалить учетную запись? Данное действие
          отменить будет нельзя!
        </Typography>

        <Stack
          direction={"row"}
          justifyContent={loading ? "center" : "end"}
          marginTop={"30px"}
          gap={1}
        >
          {loading ? (
            <CircularProgress />
          ) : errorMessage ? (
            <Typography variant="caption" color={redColor}>
              {errorMessage}
            </Typography>
          ) : (
            <>
              <Button onClick={handlerBackClick}>Назад</Button>

              <Button onClick={handlerConfirmClick}>Да, удалить</Button>
            </>
          )}
        </Stack>
      </DialogContent>
    </Dialog>
  );
}

export default ConfirmDeleteUserModal;
