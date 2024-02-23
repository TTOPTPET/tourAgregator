import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Box,
  Button,
  CircularProgress,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { resetPassword } from "../../API/passwordAPI/ResetPasswordAPI/ResetPasswordAPI";
import { IResetPassword } from "../../models/passwordModels/IResetPassword";
import { redColor } from "../../config/MUI/color/color";

function ResetPassword() {
  const navigate = useNavigate();
  const params = useParams();
  const token = params.token as string;

  const [isSuccess, setIsSuccess] = useState(true);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<IResetPassword>({});
  const [form, setForm] = useState(true);
  const [password, setPassword] = useState("");
  const [passwordSecond, setPasswordSecond] = useState("");
  const [passwordErr, setPasswordErr] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    setData({ ...data, token: atob(token) });
  }, [token]);

  const confirmResetPassword = () => {
    setLoading(true);
    setForm(false);
    resetPassword(
      () => {
        setData({});
        setIsSuccess(true);
        setLoading(false);
      },
      data,
      () => {
        setData({});
        setIsSuccess(false);
        setLoading(false);
      }
    );
  };

  useEffect(() => {
    if (
      password !== passwordSecond &&
      password !== "" &&
      passwordSecond !== ""
    ) {
      setPasswordErr(true);
      setErrMsg("Пароли не совпадают!");
    } else {
      setPasswordErr(false);
      setErrMsg("");
    }
  }, [password, passwordSecond]);

  return (
    <Paper
      variant={"whiteBlue"}
      sx={{
        height: passwordErr ? "330px" : "300px",
        mt: "20%",
        position: "relative",
      }}
    >
      {form ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography variant="h4" sx={{ marginBottom: "30px" }}>
            Смена пароля
          </Typography>
          <Box
            sx={{
              width: "500px",
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              alignItems: "center",
              gap: "10px",
              marginBottom: "30px",
            }}
          >
            <TextField
              label="Пароль"
              color="secondary"
              value={password}
              type={"password"}
              error={passwordErr}
              onChange={(e) => {
                setPassword(e.target.value);
                setData({ ...data, password: e.target.value });
              }}
            />
            <TextField
              label="Повторите пароль"
              color="secondary"
              value={passwordSecond}
              type={"password"}
              error={passwordErr}
              onChange={(e) => setPasswordSecond(e.target.value)}
            />
          </Box>
          <>
            {passwordErr && (
              <Typography
                variant="caption"
                className="author__error"
                sx={{ color: redColor, mb: "15px" }}
              >
                {errMsg}
              </Typography>
            )}
            <Button
              disabled={passwordErr || !password || !passwordSecond}
              onClick={() => {
                confirmResetPassword();
              }}
            >
              Изменить пароль
            </Button>
          </>
        </Box>
      ) : loading ? (
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            right: "50%",
            transform: "translate(50%, -50%)",
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            {isSuccess ? (
              <Typography variant="h4">Успех!</Typography>
            ) : (
              <Typography variant="h4">Ошибка!</Typography>
            )}
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mt: "80px",
            }}
          >
            {isSuccess ? (
              <Typography variant={"h5"} sx={{ fontWeight: 500 }}>
                Пароль усепешно изменен!
              </Typography>
            ) : (
              <Typography variant={"h5"} sx={{ fontWeight: 500 }}>
                Что-то пошло не так, вы сможете попробовать еще раз позже.
              </Typography>
            )}
          </Box>
        </>
      )}

      {!form && (
        <Button
          sx={{ position: "absolute", right: "40px", bottom: "30px" }}
          onClick={() => {
            setData({});
            navigate("/tours/all");
          }}
        >
          На главную
        </Button>
      )}
    </Paper>
  );
}

export default ResetPassword;
