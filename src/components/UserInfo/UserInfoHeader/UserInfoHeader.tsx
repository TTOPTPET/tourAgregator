import {
  Box,
  Typography,
  Button,
  useTheme,
  useMediaQuery,
  Stack,
  Paper,
} from "@mui/material";
import { DarkStyledTooltip } from "../../../config/MUI/styledComponents/StyledTooltip";

import { useNavigate } from "react-router-dom";

import checked from "../../../media/checkedVerify.svg";
import banIcon from "../../../media/ban-status-icon.svg";
import orangeWarning from "../../../media/orange_warning_circle.svg";

import {
  ITouristInfo,
  ICreatorInfo,
} from "../../../models/userModels/IUserInfo";
import { logout } from "../../../API/authAPI/logout";
import { whiteColor } from "../../../config/MUI/color/color";
import { useDispatch } from "react-redux";
import { setLogined } from "../../../redux/UserInfo/UserInfoReducer";

type UserInfoHeaderProps = {
  submitFuntion?: () => void;
  title: string;
  linkTo: string;
  userInfo: ITouristInfo | ICreatorInfo;
};

function UserInfoHeader({ title, userInfo }: UserInfoHeaderProps) {
  const theme = useTheme();

  const dispatch = useDispatch();

  const lessThenSmall = useMediaQuery(theme.breakpoints.down("sm"));
  const lessThenMid = useMediaQuery(theme.breakpoints.down("md"));

  const navigate = useNavigate();
  return (
    <Box
      className="userInfo__header-wrapper"
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        position: "relative",
        marginBottom: "30px",
      }}
    >
      <Box className="userInfo__header-title-wrapper" sx={{ display: "flex" }}>
        <Stack>
          <Typography
            variant={lessThenSmall ? "h4" : "h3"}
            sx={{ display: "flex", alignItems: "center" }}
          >
            {title}
          </Typography>

          {userInfo?.role_id !== 1 && !userInfo?.is_verified && (
            <Paper
              sx={{ p: "4px 8px", bgcolor: whiteColor, boxShadow: "none" }}
            >
              <Stack direction={"row"} gap={"4px"} alignItems={"center"}>
                <Box
                  sx={{
                    width: "19px",
                    height: "19px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <img
                    src={orangeWarning}
                    alt="warning icon"
                    style={{ width: "100%", height: "100%" }}
                  />
                </Box>
                <Typography variant={"caption"}>
                  Отправьте данные на подтверждение, чтобы продавать туры
                </Typography>
              </Stack>
            </Paper>
          )}
        </Stack>
        {userInfo && userInfo?.role_id !== 1 && userInfo?.is_verified && (
          <DarkStyledTooltip
            title="Данные подтверждены"
            arrow
            placement="bottom"
          >
            <Box
              sx={{
                marginLeft: { lg: "15px", md: "15px", sm: "30px", xs: "30px" },
                width: { lg: "50px", md: "40px", sm: "40px", xs: "24px" },
                height: { lg: "50px", md: "40px", sm: "40px", xs: "24px" },
              }}
            >
              <img
                src={checked}
                alt="checked verify"
                style={{ objectFit: "contain", width: "100%", height: "100%" }}
              />
            </Box>
          </DarkStyledTooltip>
        )}
        {userInfo && userInfo?.role_id !== 1 && !userInfo?.is_active && (
          <DarkStyledTooltip
            title="Аккаунт заблокирован"
            arrow
            placement="bottom"
          >
            <Box
              sx={{
                marginLeft: { lg: "15px", md: "15px", sm: "30px", xs: "30px" },
                width: { lg: "50px", md: "40px", sm: "40px", xs: "24px" },
                height: { lg: "50px", md: "40px", sm: "40px", xs: "24px" },
              }}
            >
              <img
                src={banIcon}
                alt="alert icon"
                style={{ objectFit: "contain", width: "100%", height: "100%" }}
              />
            </Box>
          </DarkStyledTooltip>
        )}
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          position: lessThenMid ? "absolute" : "",
          top: lessThenMid ? "45px" : null,
          right: lessThenMid ? "0px" : null,
        }}
      >
        <Button
          variant="errorButton"
          sx={{ mt: { lg: "10px", md: "5px", sm: "5px", xs: "5px" } }}
          onClick={() => {
            logout(
              () => {
                // document.cookie = "SESSION; expires=-1";
                navigate("/auth");
                dispatch(setLogined(false));
              },
              () => {}
            );
          }}
        >
          Выйти
        </Button>
      </Box>
    </Box>
  );
}

export default UserInfoHeader;
