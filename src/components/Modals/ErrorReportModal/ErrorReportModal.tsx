import {
  Button,
  Dialog,
  DialogContent,
  Typography,
  Stack,
} from "@mui/material";

import { StyledTextAreaAutosize } from "../../../config/MUI/styledComponents/StyledTextAreaAutosize";

import { useDispatch, useSelector } from "react-redux";

import {
  isModalActive,
  setModalActive,
  setModalInactive,
} from "../../../redux/Modal/ModalReducer";
import { RootState } from "../../../redux/store";
import { postClaim, postAppeal } from "../../../API/commonAPI";
import { useEffect, useState } from "react";
import { IErrorMessage } from "../../../models/errorMessageModels/IErrorMessage";
import { redColor } from "../../../config/MUI/color/color";

function ErrorReportModal() {
  const activeModals = useSelector(
    (state: RootState) => state.modal.activeModals
  );

  const dispatch = useDispatch();

  const modal = activeModals.find((modal) => modal.id === "errorReportModal");

  const [errorReportData, setErrorReportData] = useState<IErrorMessage>({
    description: "",
  });

  const [errorMessage, setErrorMessage] = useState("");

  const [gidEmail, setGidEmail] = useState(modal?.props?.gidEmail);
  const [publicTourId, setPublicTourId] = useState(modal?.props?.publicTourId);

  useEffect(() => {
    modal?.props?.gidEmail &&
      modal.props?.publicTourId &&
      setErrorReportData((errorReportData) => ({
        ...errorReportData,
        gidEmail: gidEmail,
        publicTourId: publicTourId,
      }));
  }, []);

  const handlerConfirmClick = () => {
    gidEmail && publicTourId
      ? postClaim(
          errorReportData as IErrorMessage,
          () => {
            dispatch(setModalActive("successMessageSendModal"));
            dispatch(setModalInactive("errorReportModal"));
          },
          () => {
            setErrorMessage("Что-то пошло не так, попробуйте позже");
          }
        )
      : postAppeal(
          errorReportData.description,
          () => {
            dispatch(setModalActive("successMessageSendModal"));
            dispatch(setModalInactive("errorReportModal"));
          },
          () => {
            setErrorMessage("Что-то пошло не так, попробуйте позже");
          }
        );
  };

  return (
    <Dialog
      className="errorReportModal"
      onClose={() => {
        dispatch(setModalInactive("errorReportModal"));
        setErrorReportData({ description: "" });
        setErrorMessage("");
      }}
      open={isModalActive("errorReportModal", activeModals)}
      fullWidth
      maxWidth={"sm"}
    >
      <DialogContent>
        <Typography variant={"h5"}>Сообщение о проблеме</Typography>
        <StyledTextAreaAutosize
          placeholder="Опишите Вашу проблему"
          onChange={(e) =>
            setErrorReportData((errorReportData) => ({
              ...errorReportData,
              description: e.target.value,
            }))
          }
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

export default ErrorReportModal;
