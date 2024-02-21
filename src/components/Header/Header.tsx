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
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import logo from "../../media/logo.svg";
import { ICreatorInfo, UserType } from "../../models/userModels/IUserInfo";
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { BAN_STATUS, SESSION, USER_ROLE } from "../../config/types";
import { useCookies } from "react-cookie";
import accIcon from "../../media/accountLinkIcon.svg";
import adminIcon from "../../media/Icons/headerIcons/adminPanel.svg";
import calendarIcon from "../../media/calendarIcon.svg";
import { useCallback, useEffect, useRef, useState } from "react";
import MenuIcon from "../../media/menu-icon.svg";
import StatIcon from "../../media/chart-box.svg";
import CashIcon from "../../media/cash-icon.svg";
import NotificationIcon from "../../media/notification.svg";
import { DarkStyledTooltip } from "../../config/MUI/styledComponents/StyledTooltip";

const Header = () => {
  const CreatorInfo: ICreatorInfo = useSelector(
    (state: RootState) => state?.userInfo?.userInfo as ICreatorInfo
  );

  const [searchParamFromUrl] = useSearchParams();

  const [cookies] = useCookies([SESSION, USER_ROLE, BAN_STATUS]);

  const [searchParam, setSearchParam] = useState<string>(
    searchParamFromUrl.get("title") || ""
  );
  const [menuPosition, setMenuPosition] = useState<number>(0);
  const [windowSize, setWindowSize] = useState<number>();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const menuRef = useRef<HTMLButtonElement | null>(null);

  const theme = useTheme();

  const moreThenSmall = useMediaQuery(theme.breakpoints.up("sm"));
  const lessThenSmall = useMediaQuery(theme.breakpoints.down("sm"));

  let location = useLocation();

  const userInfo = useSelector((state: RootState) => state?.userInfo?.userInfo);

  const navigate = useNavigate();

  // const handleWindowResize = useCallback((event) => {
  //   setWindowSize(window.innerWidth);
  // }, []);

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

  // useEffect(() => {
  //   window.addEventListener("resize", handleWindowResize);
  //   return () => {
  //     window.removeEventListener("resize", handleWindowResize);
  //   };
  // }, [handleWindowResize]);

  useEffect(() => {
    if (menuRef.current) {
      setMenuPosition(menuRef.current.getBoundingClientRect().right - 255);
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
          <Box
            onClick={() => {
              navigate("/tours/all");
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
              label="Найти тур"
              color="secondary"
              value={searchParam}
              onChange={(e) => setSearchParam(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  navigate(`/tours/all?title=${searchParam}`);
                }
              }}
            />
          </Box>
          {cookies.SESSION ? (
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
                {userInfo?.typeUser === UserType.tourist ? (
                  <Box component={Link} to="/tourist/lk">
                    <Box sx={{ height: { sm: "30px", xs: "20px" } }}>
                      <img
                        style={{ height: "100%" }}
                        src={accIcon}
                        alt="accIcon"
                      />
                    </Box>
                  </Box>
                ) : (
                  <Box
                    sx={{
                      display: "flex",
                      gap: { sx: "22px", xs: "10px" },
                      alignItems: "center",
                      height: "70px",
                    }}
                  >
                    {userInfo?.typeUser === UserType.creator ? (
                      <>
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            textDecoration: "none",
                          }}
                          component={Link}
                          to="/creator/calendar"
                        >
                          <Box sx={{ height: { sm: "30px", xs: "20px" } }}>
                            <img
                              style={{ height: "100%" }}
                              src={calendarIcon}
                              alt="calendarIcon"
                            />
                          </Box>
                          {!lessThenSmall && (
                            <Typography variant="caption">Календарь</Typography>
                          )}
                        </Box>
                      </>
                    ) : (
                      <>
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            textDecoration: "none",
                          }}
                          component={Link}
                          to="/admin"
                        >
                          <Box sx={{ height: { sm: "30px", xs: "20px" } }}>
                            <img
                              style={{ height: "100%" }}
                              src={adminIcon}
                              alt="adminIcon"
                            />
                          </Box>
                          {!lessThenSmall && (
                            <Typography variant="caption">Админка</Typography>
                          )}
                        </Box>
                      </>
                    )}
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
                            {!CreatorInfo?.dataUser?.fieldsCreator ? (
                              <DarkStyledTooltip
                                title="Заполните финансовую информацию для доступа на эту страницу"
                                arrow
                                placement="bottom"
                              >
                                <span>
                                  <MenuItem
                                    disabled={true}
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
                                </span>
                              </DarkStyledTooltip>
                            ) : (
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
                            )}

                            <MenuItem
                              style={{ gap: "10px" }}
                              onClick={() => {
                                navigate("/creator/notifications");
                                handlerCloseMenu();
                              }}
                            >
                              <img
                                src={NotificationIcon}
                                alt={"notification"}
                                style={{ width: "26px" }}
                              />
                              Уведомления
                            </MenuItem>
                          </MenuList>
                        </Paper>
                      </Popper>
                    </Box>
                  </Box>
                )}
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
