import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { verify } from "../../API/authAPI/UserAuthAPI/UserAuthAPI";
import {
  Box,
  Button,
  CircularProgress,
  Paper,
  Typography,
} from "@mui/material";

function VerifyUserEmail() {
  const navigate = useNavigate();
  const params = useParams();
  const token = params.token as string;

  const [isSuccess, setIsSuccess] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    verify(
      () => {
        setIsSuccess(true);
        setLoading(false);
      },
      atob(token),
      () => {
        setIsSuccess(false);
        setLoading(false);
      }
    );
  }, []);

  return (
    <Paper
      variant={"whiteBlue"}
      sx={{
        height: "200px",
        mt: "20%",
        position: "relative",
      }}
    >
      {loading ? (
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
              mt: "20px",
            }}
          >
            {isSuccess ? (
              <Typography variant={"h5"} sx={{ fontWeight: 500 }}>
                Почта успешно подтверждена!
              </Typography>
            ) : (
              <Typography variant={"h5"} sx={{ fontWeight: 500 }}>
                Что-то пошло не так, вы сможете попробовать еще раз позже из
                вашего личного кабинета.
              </Typography>
            )}
          </Box>
        </>
      )}
      <Button
        sx={{ position: "absolute", right: "40px", bottom: "30px" }}
        onClick={() => {
          navigate("/");
        }}
      >
        На главную
      </Button>
    </Paper>
  );
}

export default VerifyUserEmail;
