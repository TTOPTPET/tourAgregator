import {
  Box,
  Button,
  CircularProgress,
  Stack,
  Typography,
} from "@mui/material";
import ConfirmDeleteUserModal from "../../components/Modals/ConfirmDeleteUserModal/ConfirmDeleteUserModal";
import { useDispatch } from "react-redux";
import { setModalActive } from "../../redux/Modal/ModalReducer";
import { useEffect, useState } from "react";
import { getUserInfo } from "../../API/commonAPI";
import { ICreatorInfo, ITouristInfo } from "../../models/userModels/IUserInfo";
import { forgotPassword } from "../../API/passwordAPI/ForgotPasswordAPI/ForgotPasswordAPI";
import SuccessEmailMessageSendModal from "../../components/Modals/SuccessEmailMessageSendModal/SuccessEmailMessageSendModal";
import { requestVerifyToken } from "../../API/authAPI/UserAuthAPI/UserAuthAPI";
import { redColor } from "../../config/MUI/color/color";

function TouristLk() {
  const dispatch = useDispatch();

  const loadingDefault = {
    password: false,
    verified: false,
  };

  const errorMessagesDefault = {
    password: "",
    verified: "",
  };

  const [UserInfo, setUserInfo] = useState<ICreatorInfo | ITouristInfo>({});
  const [loading, setLoading] = useState(loadingDefault);
  const [errorMessages, setErrorMessages] = useState(errorMessagesDefault);

  useEffect(() => {
    getUserInfo((value) => {
      setUserInfo(value);
    });
  }, []);

  const handlerForgotPasswordClick = () => {
    setLoading((loading) => ({ ...loading, password: true }));
    setErrorMessages((errorMessages) => ({ ...errorMessages, password: "" }));
    forgotPassword(
      () => {
        dispatch(setModalActive("successEmailMessageSendModal"));
        setLoading((loading) => ({ ...loading, password: false }));
        setErrorMessages((errorMessages) => ({
          ...errorMessages,
          password: "",
        }));
      },
      UserInfo.email,
      () => {
        setLoading((loading) => ({ ...loading, password: false }));
        setErrorMessages((errorMessages) => ({
          ...errorMessages,
          password: "Что-то пошло не так, попробуйте еще раз позже.",
        }));
      }
    );
  };

  const handlerVerifiedClick = () => {
    setLoading((loading) => ({ ...loading, verified: true }));
    setErrorMessages((errorMessages) => ({ ...errorMessages, verified: "" }));
    requestVerifyToken(
      () => {
        dispatch(setModalActive("successEmailMessageSendModal"));
        setLoading((loading) => ({ ...loading, verified: false }));
        setErrorMessages((errorMessages) => ({
          ...errorMessages,
          verified: "",
        }));
      },
      UserInfo.email,
      () => {
        setLoading((loading) => ({ ...loading, verified: false }));
        setErrorMessages((errorMessages) => ({
          ...errorMessages,
          verified: "Что-то пошло не так, попробуйте еще раз позже.",
        }));
      }
    );
  };

  return (
    <Box>
      <Typography variant={"h3"}>Настройки</Typography>
      <Stack mt={"50px"} gap={"30px"}>
        <Stack gap={"20px"} width={"400px"}>
          <Typography variant={"h5"}>Смена пароля</Typography>
          {loading.password ? (
            <CircularProgress sx={{ ml: "25%" }} />
          ) : (
            <Button onClick={handlerForgotPasswordClick} sx={{ width: "60%" }}>
              Сменить пароль
            </Button>
          )}
          {errorMessages.password && (
            <Typography variant="caption" color={redColor}>
              {errorMessages.password}
            </Typography>
          )}
        </Stack>
        <Stack gap={"20px"} width={"400px"}>
          <Typography variant={"h5"}>Удаление учетной записи</Typography>
          <Button
            sx={{ width: "60%" }}
            variant="deleteUserButton"
            onClick={() =>
              dispatch(
                setModalActive("confirmDeleteUserModal", {
                  userId: UserInfo.id,
                })
              )
            }
          >
            Удалить
          </Button>
        </Stack>
        {!UserInfo.is_verified && (
          <Stack gap={"20px"} width={"400px"}>
            <Typography variant={"h5"}>Верификация почты</Typography>
            {loading.verified ? (
              <CircularProgress sx={{ ml: "25%" }} />
            ) : (
              <Button onClick={handlerVerifiedClick} sx={{ width: "60%" }}>
                Отправить письмо
              </Button>
            )}
            {errorMessages.verified && (
              <Typography variant="caption" color={redColor}>
                {errorMessages.verified}
              </Typography>
            )}
          </Stack>
        )}
      </Stack>
      <ConfirmDeleteUserModal />
      <SuccessEmailMessageSendModal />
    </Box>
  );
}

export default TouristLk;
