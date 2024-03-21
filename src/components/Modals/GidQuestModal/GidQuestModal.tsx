import {
  Button,
  Dialog,
  DialogContent,
  Typography,
  Stack,
  TextField,
} from "@mui/material";

import { StyledTextAreaAutosize } from "../../../config/MUI/styledComponents/StyledTextAreaAutosize";

import { useDispatch, useSelector } from "react-redux";

import {
  isModalActive,
  setModalActive,
  setModalInactive,
} from "../../../redux/Modal/ModalReducer";
import { RootState } from "../../../redux/store";
import { postClaim, postAppeal, postQuest } from "../../../API/commonAPI";
import { useState } from "react";
import { redColor } from "../../../config/MUI/color/color";

function GidQuestModal() {
  const activeModals = useSelector(
    (state: RootState) => state.modal.activeModals
  );

  const dispatch = useDispatch();

  const modal = activeModals.find((modal) => modal.id === "gidQuestModal");

  const [errorReport, setErrorReport] = useState("");
  const [theme, setTheme] = useState("");

  const [errorMessage, setErrorMessage] = useState("");

  const handlerConfirmClick = () => {
    postQuest(
      {
        content: errorReport,
        creatorEmail: modal?.props?.gidEmail,
        theme: theme,
      },
      () => {
        dispatch(setModalActive("successMessageSendModal", { quest: true }));
        dispatch(setModalInactive("gidQuestModal"));
        setErrorReport("");
        setErrorMessage("");
        setTheme("");
      },
      () => {
        setErrorMessage("Что-то пошло не так, попробуйте позже");
        setErrorReport("");
        setErrorMessage("");
        setTheme("");
      }
    );
  };

  return (
    <Dialog
      className="gidQuestModal"
      onClose={() => {
        dispatch(setModalInactive("gidQuestModal"));
        setErrorReport("");
        setErrorMessage("");
        setTheme("");
      }}
      open={isModalActive("gidQuestModal", activeModals)}
      fullWidth
      maxWidth={"sm"}
    >
      <DialogContent>
        <Typography variant={"h5"}>Сообщение для гида</Typography>
        <Typography variant={"h6"} sx={{ m: "20px 0 10px" }}>
          Тема сообщения
        </Typography>
        <TextField
          label="Тема"
          color="secondary"
          value={theme}
          onChange={(e) => setTheme(e.target.value)}
        />
        <Typography variant={"h6"} sx={{ m: "20px 0 0 " }}>
          Сообщение о проблеме
        </Typography>
        <StyledTextAreaAutosize
          placeholder="Опишите Вашу проблему"
          onChange={(e) => setErrorReport(e.target.value)}
        />
        {errorMessage && (
          <Typography
            variant={"caption"}
            sx={{ color: redColor, textAlign: "center", mb: "20px" }}
          >
            {errorMessage}
          </Typography>
        )}
        <Stack direction={"row"} justifyContent={"end"}>
          <Button onClick={handlerConfirmClick}>Отправить</Button>
        </Stack>
      </DialogContent>
    </Dialog>
  );
}

export default GidQuestModal;
