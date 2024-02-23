import {
  Button,
  Dialog,
  DialogContent,
  Typography,
  Stack,
  TextField,
  CircularProgress,
} from "@mui/material";
import { useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import {
  isModalActive,
  setModalActive,
  setModalInactive,
} from "../../../redux/Modal/ModalReducer";
import { RootState } from "../../../redux/store";
import { redColor } from "../../../config/MUI/color/color";
import { forgotPassword } from "../../../API/passwordAPI/ForgotPasswordAPI/ForgotPasswordAPI";

function LostPasswordModal() {
  const [login, setLogin] = useState<string>("");

  const activeModals = useSelector(
    (state: RootState) => state.modal.activeModals
  );

  const [errorMessage, setErrorMessage] = useState("");
  const [errReg, setErrReg] = useState(false);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const handlerConfirmClick = () => {
    setLoading(true);
    forgotPassword(
      () => {
        setLoading(false);
        dispatch(setModalInactive("lostPasswordModal"));
        setLogin("");
      },
      login,
      (e) => {
        setLoading(false);
        if (e?.response?.status >= 400 && e?.response?.status < 500) {
          setErrReg(true);
          setErrorMessage("Неверный логин!");
        } else {
          setErrReg(true);
          setErrorMessage("Ошибка сервера, попробуйте позже!");
        }
      }
    );
  };

  const emailValidation = (value: string): boolean => {
    if (value === "") {
      return false;
    }
    let re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return !re.test(value);
  };

  return (
    <Dialog
      className="lostPasswordModal"
      onClose={() => {
        dispatch(setModalInactive("lostPasswordModal"));
        setLogin("");
      }}
      open={isModalActive("lostPasswordModal", activeModals)}
      fullWidth
      maxWidth={"sm"}
    >
      <DialogContent>
        <Typography variant={"h5"} sx={{ mb: "30px" }}>
          Забыли пароль?
        </Typography>
        <Stack direction={"column"} gap={"10px"}>
          <TextField
            label="Почта"
            color="secondary"
            value={login}
            type={"email"}
            error={emailValidation(login)}
            onChange={(e) => setLogin(e.target.value)}
          />
        </Stack>

        {errReg && (
          <Typography
            variant="caption"
            className="author__error"
            sx={{ color: redColor, textAlign: "center", mt: "15px" }}
          >
            {errorMessage}
          </Typography>
        )}

        <Stack
          direction={"column"}
          justifyContent={"center"}
          alignItems={"center"}
          marginTop={errReg ? "15px" : "27px"}
          gap="5px"
        >
          {loading ? (
            <CircularProgress />
          ) : (
            <Button
              disabled={emailValidation(login)}
              onClick={() => handlerConfirmClick()}
            >
              Отправить код
            </Button>
          )}
        </Stack>
      </DialogContent>
    </Dialog>
  );
}

export default LostPasswordModal;
