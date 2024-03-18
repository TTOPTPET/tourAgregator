import {
  Container,
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  useTheme,
  useMediaQuery,
  MenuItem,
  Popper,
  MenuList,
} from "@mui/material";
import logo from "../../media/logo.svg";
import { Link, useLocation, useNavigate } from "react-router-dom";
import accIcon from "../../media/accountLinkIcon.svg";
import calendarIcon from "../../media/calendarIcon.svg";
import settingsIcon from "../../media/settingsIcon.svg";
import adminIcon from "../../media/adminIcon.svg";
import { useEffect, useRef, useState } from "react";
import MenuIcon from "../../media/menu-icon.svg";
import StatIcon from "../../media/chart-box.svg";
import CashIcon from "../../media/cash-icon.svg";
import NotificationIcon from "../../media/notification.svg";
import exitIcon from "../../media/exitIcon.svg";
import { useCookies } from "react-cookie";
import { LOGGINED, ROLE } from "../../config/types";
import { redColor } from "../../config/MUI/color/color";
import { logout } from "../../API/authAPI/logout";

const Header = () => {
  const [cookies, setCookies, removeCookies] = useCookies([LOGGINED, ROLE]);

  const [searchParam, setSearchParam] = useState<string>("");
  const [menuPosition, setMenuPosition] = useState<number>(0);
  const [windowSize, setWindowSize] = useState<number>();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const menuRef = useRef<HTMLButtonElement | null>(null);

  const theme = useTheme();

  const moreThenSmall = useMediaQuery(theme.breakpoints.up("sm"));
  const lessThenSmall = useMediaQuery(theme.breakpoints.down("sm"));

  let location = useLocation();

  const navigate = useNavigate();

  const handlerClickMenu = (event: React.MouseEvent<HTMLElement>) => {
    if (open) {
      setAnchorEl(null);
    } else {
      setAnchorEl(event.currentTarget);
    }
  };
  const handlerCloseMenu = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    if (menuRef.current) {
      cookies.ROLE === 2
        ? setMenuPosition(menuRef.current.getBoundingClientRect().right - 280)
        : cookies.ROLE === 1
          ? setMenuPosition(menuRef.current.getBoundingClientRect().right - 220)
          : setMenuPosition(
              menuRef.current.getBoundingClientRect().right - 150
            );
    }
  }, [menuRef.current, windowSize]);

  useEffect(() => {
    if (open) {
      setAnchorEl(null);
    }
  }, [location]);

  return (
    <Paper
      variant="header"
      sx={{ width: "100vw", zIndex: 200, position: "relative" }}
    >
      <Box
        className="header__wrapper"
        height={"100%"}
        display={"flex"}
        alignItems={"center"}
      >
        <Container
          className="header__container"
          maxWidth={"lg"}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: { sm: "0px 16px", xs: "0px" },
          }}
        >
          {cookies.ROLE !== 3 ? (
            <>
              <Box
                onClick={() => {
                  navigate("/");
                }}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  justifyContent: "flex-start",
                  cursor: "pointer",
                  height: { sm: "50px", xs: "30px" },
                }}
                className="header__logo"
              >
                {moreThenSmall && (
                  <Box sx={{ width: "130px" }}>
                    <Typography variant={"button"} className="logo-text">
                      СвойПуть.ру
                    </Typography>
                  </Box>
                )}
              </Box>
              <Box sx={{ m: { sm: "0 30px", xs: "0 10px" }, width: "100%" }}>
                <TextField
                  label="Найти тур (от 4 символов)"
                  color="secondary"
                  value={searchParam}
                  onChange={(e) => setSearchParam(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      searchParam.length > 4
                        ? navigate(`/?title=${searchParam}`)
                        : null;
                      setSearchParam("");
                    }
                  }}
                />
              </Box>
            </>
          ) : (
            <Typography variant="button">🍔Admin page🍔</Typography>
          )}

          {cookies.LOGGINED ? (
            <>
              <Box
                className="header__btns"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "11px",
                  justifyContent: "flex-end",
                  height: "70px",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    gap: { sx: "22px", xs: "10px" },
                    alignItems: "center",
                    height: "70px",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      textDecoration: "none",
                      position: "relative",
                      width: "70px",
                      backgroundColor: open
                        ? "rgba(255, 255, 255, 0.50)"
                        : "transparent",
                    }}
                    component={Button}
                    variant={"fullButton"}
                    onClick={handlerClickMenu}
                    ref={menuRef}
                  >
                    <Box sx={{ height: { sm: "30px", xs: "20px" } }}>
                      <img
                        style={{ height: "100%" }}
                        src={MenuIcon}
                        alt="accIcon"
                      />
                    </Box>
                    {!lessThenSmall && (
                      <Typography variant="caption" sx={{ mt: "1px" }}>
                        Меню
                      </Typography>
                    )}
                    <Popper
                      id={"menu"}
                      open={open}
                      anchorEl={menuRef.current}
                      sx={{
                        zIndex: 20,
                        top: `-${moreThenSmall ? 40 : 60}px !important`,
                        transform: `translate3d(${menuPosition}px, 70.4px, 0px) !important`,
                      }}
                    >
                      <Paper sx={{ padding: "5px", paddingTop: "40px" }}>
                        <MenuList>
                          {cookies.ROLE === 1 && (
                            <MenuItem
                              style={{ gap: "10px" }}
                              onClick={() => {
                                navigate("/tourist/lk");
                                handlerCloseMenu();
                              }}
                            >
                              <img
                                src={accIcon}
                                alt={"profile"}
                                style={{ width: "26px" }}
                              />
                              Личный кабинет
                            </MenuItem>
                          )}

                          {cookies.ROLE === 2 && (
                            <>
                              <MenuItem
                                style={{ gap: "10px" }}
                                onClick={() => {
                                  navigate("/creator/lk");
                                  handlerCloseMenu();
                                }}
                              >
                                <img
                                  src={accIcon}
                                  alt={"profile"}
                                  style={{ width: "26px" }}
                                />
                                Личный кабинет
                              </MenuItem>
                              <MenuItem
                                style={{ gap: "10px" }}
                                onClick={() => {
                                  navigate("/creator/stats");
                                  handlerCloseMenu();
                                }}
                              >
                                <img
                                  src={StatIcon}
                                  alt={"profile"}
                                  style={{ width: "26px" }}
                                />
                                Статистика
                              </MenuItem>
                              <MenuItem
                                style={{ gap: "10px" }}
                                onClick={() => {
                                  navigate("/creator/payment");
                                  handlerCloseMenu();
                                }}
                              >
                                <img
                                  src={CashIcon}
                                  alt={"profile"}
                                  style={{ width: "26px" }}
                                />
                                Финансовые настройки
                              </MenuItem>
                              <MenuItem
                                style={{ gap: "10px" }}
                                onClick={() => {
                                  navigate("/creator/calendar");
                                  handlerCloseMenu();
                                }}
                              >
                                <img
                                  src={calendarIcon}
                                  alt={"profile"}
                                  style={{ width: "26px" }}
                                />
                                Календарь
                              </MenuItem>
                            </>
                          )}

                          {cookies.ROLE === 3 && (
                            <MenuItem
                              style={{ gap: "10px" }}
                              onClick={() => {
                                navigate("/admin");
                                handlerCloseMenu();
                              }}
                            >
                              <img
                                src={adminIcon}
                                alt={"profile"}
                                style={{ width: "26px" }}
                              />
                              Админка
                            </MenuItem>
                          )}

                          {cookies.ROLE != 3 && (
                            <MenuItem
                              style={{ gap: "10px" }}
                              onClick={() => {
                                navigate("/creator/calendar");
                                handlerCloseMenu();
                              }}
                            >
                              <img
                                src={settingsIcon}
                                alt={"profile"}
                                style={{ width: "26px" }}
                              />
                              Настройки
                            </MenuItem>
                          )}

                          <MenuItem
                            style={{ gap: "10px", color: redColor }}
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
                            <img
                              src={exitIcon}
                              alt={"notification"}
                              style={{ width: "26px" }}
                            />
                            Выйти
                          </MenuItem>
                        </MenuList>
                      </Paper>
                    </Popper>
                  </Box>
                </Box>
              </Box>
            </>
          ) : (
            <Button component={Link} to={"/auth"} variant="textButton">
              Войти
            </Button>
          )}
        </Container>
      </Box>
    </Paper>
  );
};

export default Header;
