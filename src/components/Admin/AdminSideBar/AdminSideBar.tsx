import {
  List,
  ListItem,
  Stack,
  Button,
  Divider,
  Typography,
} from "@mui/material";
import { NavLink as RouterLink, useLocation } from "react-router-dom";
import { lightTurquoiseColor } from "../../../config/MUI/color/color";

interface ISideBarNavItems {
  display: string;
  to: string;
}

const sideBarNavItems: ISideBarNavItems[] = [
  {
    display: "Управление доступом туристов",
    to: "access-tourist",
  },
  {
    display: "Управление доступом туросоздателей",
    to: "access-creator",
  },
  {
    display: "Сообщения от пользователей",
    to: "appeals",
  },
  {
    display: "Жалобы на туры",
    to: "claims",
  },
];

export const AdminSideBar = () => {
  const location = useLocation();
  return (
    <Stack direction={"column"} position={"fixed"}>
      <Typography variant={"h4"}>Панель админа</Typography>
      <List>
        {sideBarNavItems.map((item, index) => (
          <>
            <ListItem key={index} sx={{ width: 340 }}>
              <Button
                to={item.to}
                component={RouterLink}
                variant={"textButton"}
                sx={{
                  padding: 2,
                  height: "auto",
                  backgroundColor:
                    location.pathname === `/admin/${item.to}`
                      ? lightTurquoiseColor
                      : "",
                  ":hover": {
                    backgroundColor: lightTurquoiseColor,
                  },
                }}
              >
                {item.display}
              </Button>
            </ListItem>
            {index === sideBarNavItems.length - 1 ? <></> : <Divider />}
          </>
        ))}
      </List>
    </Stack>
  );
};
