import { Button, Stack, Typography } from "@mui/material";
import { lightTurquoiseColor } from "../../../config/MUI/color/color";
import { logout } from "../../../API/authAPI/logout";
import { useCookies } from "react-cookie";
import { LOGGINED, ROLE } from "../../../config/types";
import { useNavigate } from "react-router-dom";

export const AdminHeader = () => {
  const [cookies, setCookies, removeCookies] = useCookies([LOGGINED, ROLE]);

  const navigate = useNavigate();

  return (
    <Stack
      justifyContent={"space-between"}
      direction={"row"}
      paddingX={3}
      bgcolor={lightTurquoiseColor}
    >
      <Typography component="p" mt={1}>
        🍔Admin page🍔
      </Typography>
      <Button
        onClick={() => {
          logout(
            () => {
              navigate("/auth");
              removeCookies(LOGGINED, { path: "/" });
              removeCookies(ROLE, { path: "/" });
            },
            () => {}
          );
        }}
      >
        LogOut
      </Button>
    </Stack>
  );
};
