import { ChangeEvent, useRef, useState } from "react";
import {
  Button,
  Stack,
  TextField,
  Typography,
  Box,
  Paper,
  Autocomplete,
  useMediaQuery,
  CircularProgress,
  Checkbox,
} from "@mui/material";
import { AuthComponent } from "../../components/AuthorizationModules/AuthFabric/AuthFabic";
import { IUserLogin } from "../../models/authModels/IUserLogin";
import { IUserRegister } from "../../models/authModels/IUserRegister";
import {
  ILoginComponent,
  IRegisterComponent,
  ITextProps,
} from "../../components/AuthorizationModules/AuthFabric/AuthTypes/AuthTypes";
import { loginUser, registerUser } from "../../API/authAPI";
import { lightTurquoiseColor, redColor } from "../../config/MUI/color/color";
import { useDispatch, useSelector } from "react-redux";
import { setModalActive } from "../../redux/Modal/ModalReducer";
import {
  ICreatorInfo,
  ITouristInfo,
  UserType,
} from "../../models/userModels/IUserInfo";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import InputMask from "react-input-mask";
import { cloneDeep } from "lodash";
import UserAgreementModal from "../../components/Modals/UserAgreementModal/UserAgreementModal";
import ConfirmEmailModal from "../../components/Modals/ConfirmEmailModal/ConfirmEmailModal";
import {
  checkINN,
  requestVerifyToken,
} from "../../API/authAPI/UserAuthAPI/UserAuthAPI";
import { getUserInfo } from "../../API/commonAPI";
import { setUserInfo } from "../../redux/UserInfo/UserInfoReducer";
import LostPasswordModal from "../../components/Modals/LostPasswordModal/LostPasswordModal";
import { ICheckINNResponse } from "../../models/authModels/ICheckINNResponse";
import { RootState } from "../../redux/store";
import { useCookies } from "react-cookie";
import { LOGGINED, ROLE } from "../../config/types";

const registerTypes = [
  { id: UserType.creator, name: "туросоздатель" },
  { id: UserType.tourist, name: "турист" },
];

const loginDefault: IUserLogin = {
  username: undefined,
  password: undefined,
};

const registerDefault: IUserRegister = {
  email: undefined,
  name: undefined,
  password: undefined,
  phone: undefined,
  role_id: undefined,
  passwordSecond: undefined,
  inn: "",
};

type RegisterErrors = {
  [key in keyof Omit<IUserRegister, "role_id" | "passwordSecond">]: boolean;
};

const registerErrorsDefault: RegisterErrors = {
  email: undefined,
  name: undefined,
  password: undefined,
  phone: undefined,
};

function Authorization() {
  const [cookies, setCookies] = useCookies([LOGGINED, ROLE]);

  const [userLoginData, setUserLoginData] = useState<IUserLogin>(loginDefault);
  const [userRegisterData, setUserRegisterData] =
    useState<IUserRegister>(registerDefault);
  const [regState, setRegState] = useState<boolean>(true);
  const [errAuth, setErrAuth] = useState(false);
  const [errReg, setErrReg] = useState(false);
  const [errINN, setErrINN] = useState(false);
  const [errINNMsg, setErrINNMsg] = useState("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [passwordErrorStatus, setPasswordErrorStatus] =
    useState<boolean>(false);
  const [registerInputError, setRegisterInputError] = useState<RegisterErrors>(
    registerErrorsDefault
  );
  const [loading, setLoading] = useState(false);
  const [userAgreement, setUserAgreement] = useState(false);

  const [innCheckLoading, setInnCheckLoading] = useState(false);
  const [INNCheckErr, setINNCheckErr] = useState(false);
  const [isINNChecked, setIsINNChecked] = useState(false);

  // const UserInfo: ICreatorInfo | ITouristInfo = useSelector(
  //   (state: RootState) => state?.userInfo?.userInfo
  // );

  const refBtn = useRef<HTMLButtonElement | null>(null);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const media = useMediaQuery("(max-width: 600px)");

  const autocompleteChanged = (value: UserType | undefined) => {
    setUserRegisterData({
      ...userRegisterData,
      role_id: value,
    });
  };

  useEffect(() => {
    if (userRegisterData.role_id !== 2) {
      setErrINN(false);
      setUserRegisterData({ ...userRegisterData, inn: "" });
      setIsINNChecked(false);
      setErrINNMsg("");
      setINNCheckErr(false);
    }
  }, [userRegisterData.role_id]);

  useEffect(() => {
    if (isINNChecked) {
      setIsINNChecked(false);
    }
  }, [userRegisterData.inn]);

  const handlerUpdateLoginField = (
    key: keyof IUserLogin,
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setUserLoginData({ ...userLoginData, [key]: e.target.value });
  };

  const handlerUpdateRegisterField = (
    key: keyof IUserRegister,
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setUserRegisterData({ ...userRegisterData, [key]: e.target.value });
  };

  const registerValidation = (type: string, value: string): boolean => {
    switch (type) {
      case "number":
        if (value === "") {
          return false;
        }
        return value.length > 10 ? false : true;
      case "email":
        if (value === "") {
          return false;
        }
        let re =
          /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return !re.test(value);
      default:
        return false;
    }
  };

  function validateInn(inn: string) {
    var result = false;
    if (!inn.length) {
      setErrINN(true);
      setErrINNMsg("ИНН пуст");
    } else if (/[^0-9]/.test(inn)) {
      setErrINN(true);
      setErrINNMsg("ИНН может состоять только из цифр");
    } else if ([12].indexOf(inn.length) === -1) {
      setErrINN(true);
      setErrINNMsg("ИНН может состоять только из 12 цифр");
    } else {
      var checkDigit = function (inn: string, coefficients: any) {
        var n = 0;
        for (var i in coefficients) {
          n += coefficients[i] * Number(inn[Number(i)]);
        }
        return parseInt(((n % 11) % 10).toString());
      };

      var n11 = checkDigit(inn, [7, 2, 4, 10, 3, 5, 9, 4, 6, 8]);
      var n12 = checkDigit(inn, [3, 7, 2, 4, 10, 3, 5, 9, 4, 6, 8]);
      if (n11 === parseInt(inn[10]) && n12 === parseInt(inn[11])) {
        result = true;
      }

      if (!result) {
        setErrINN(true);
        setErrINNMsg("Неправильное контрольное число");
      }

      if (result) {
        setErrINN(false);
      }
    }
    return result;
  }

  const handlerRegisterErrorChange = (
    key: keyof RegisterErrors,
    error: boolean
  ) => {
    setRegisterInputError({ ...registerInputError, [key]: error });
  };

  const handlerOnTransition = () => {
    setUserLoginData(loginDefault);
    setUserRegisterData(registerDefault);
    setRegState(!regState);
  };

  const handlerRegisterClick = () => {
    const registerDataCopy = cloneDeep(userRegisterData);
    registerDataCopy.phone = registerDataCopy?.phone?.replace(/[() -+-]/g, "");
    registerDataCopy.phone = "8" + registerDataCopy?.phone?.substring(1);
    registerUser(
      () => {
        requestVerifyToken(() => {
          dispatch(setModalActive("сonfirmEmailModal"));
        }, userRegisterData.email);
      },
      registerDataCopy,
      (e) => {
        setErrReg(true);
        setErrorMessage(
          e?.response?.data?.typeError === "UserError"
            ? e?.response?.data?.errorMessage
            : "Что-то пошло не так, попробуйте еще раз позже!"
        );
      },
      false
    );
  };

  const handlerLoginClick = () => {
    loginUser(
      userLoginData,
      (resp) => {
        getUserInfo((value) => {
          dispatch(setUserInfo(value));
          setCookies(LOGGINED, true, { path: "/", maxAge: 3600 });
          setCookies(ROLE, value.role_id, { path: "/", maxAge: 3600 });
          setErrAuth(false);
          setErrorMessage("");
          setLoading(false);
          value?.role_id === 1
            ? navigate("/tours/all")
            : navigate("/creator/lk");
        });
      },
      (e) => {
        setLoading(false);
        if (e?.response?.status >= 400 && e?.response?.status <= 500) {
          setErrAuth(true);
          setErrorMessage("Неверный логин или пароль!");
        } else {
          setErrAuth(true);
          setErrorMessage("Ошибка сервера, попробуйте позже!");
        }
      },
      false
    );
  };

  const handlerINNCheck = () => {
    setInnCheckLoading(true);
    checkINN(
      (resp) => {
        if (resp?.status === true) {
          setIsINNChecked(true);
          setErrINN(false);
          setErrINNMsg("");
          setINNCheckErr(false);
        } else {
          setIsINNChecked(false);
          setErrINN(true);
          setErrINNMsg("Вы не самозанятый");
          setINNCheckErr(true);
        }
        setInnCheckLoading(false);
      },
      userRegisterData.inn,
      () => {
        setInnCheckLoading(false);
        setINNCheckErr(true);
        setErrINN(true);
        setErrINNMsg("Что-то пошло не так, попробуйте позже");
      },
      true
    );
  };

  const getPhoneTextField = (value: ITextProps): React.ReactNode => {
    //@ts-ignore
    return () => (
      <TextField
        color="secondary"
        label={value.name}
        name={value.name + "reg"}
        autoComplete="new-password"
        error={registerInputError["phone"]}
        required={value.required}
      />
    );
  };

  useEffect(() => {
    setErrAuth(false);
    setErrorMessage("");
  }, [regState]);

  useEffect(() => {
    if (
      userRegisterData.password !== userRegisterData?.passwordSecond &&
      userRegisterData.password !== "" &&
      userRegisterData?.passwordSecond !== ""
    ) {
      setPasswordErrorStatus(true);
      setRegisterInputError({ ...registerInputError, password: true });
      setErrorMessage("Пароли не совпадают!");
    } else {
      setPasswordErrorStatus(false);
      setRegisterInputError({ ...registerInputError, password: false });
      setErrorMessage("");
    }
    setErrAuth(false);
  }, [userRegisterData, userLoginData]);

  useEffect(() => {
    const listener = (e: any) => {
      const event = new MouseEvent("click", {
        view: window,
        bubbles: true,
        cancelable: true,
      });
      e.code === "Enter" &&
        refBtn.current &&
        refBtn.current.dispatchEvent(event);
    };
    document.addEventListener("keydown", listener);
    return () => {
      document.removeEventListener("keydown", listener);
    };
  }, []);

  return (
    <Stack sx={{ gap: "50px" }}>
      <Typography variant="h3">{regState ? "Вход" : "Регистрация"}</Typography>
      <Paper
        variant="bigPadding"
        sx={{
          bgcolor: lightTurquoiseColor,
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          maxWidth: "600px",
          width: "100%",
          margin: "0 auto",
          pb: "20px",
        }}
      >
        <Stack
          sx={{
            width: "100%",
            gap: "15px",
            mb: "15px",
          }}
        >
          {regState
            ? Object.entries<ITextProps>(
                AuthComponent("login") as unknown as {
                  [s: string]: ITextProps;
                }
              ).map(([key, value], index) => (
                <TextField
                  color="secondary"
                  key={index + "log"}
                  label={value.name}
                  type={value.type}
                  error={
                    errAuth ||
                    userLoginData[key as keyof ILoginComponent] === ""
                  }
                  required={value.required}
                  value={userLoginData[key as keyof ILoginComponent]}
                  onChange={(e) =>
                    handlerUpdateLoginField(key as keyof ILoginComponent, e)
                  }
                />
              ))
            : Object.entries<ITextProps>(
                AuthComponent("register") as unknown as {
                  [s: string]: ITextProps;
                }
              ).map(([key, value], index) =>
                value.type === "number" ? (
                  <InputMask
                    mask={"+7 (999) 999-99-99"}
                    maskChar=" "
                    value={userRegisterData[key as keyof IRegisterComponent]}
                    onChange={(e) => {
                      if (key in registerErrorsDefault && key !== "password") {
                        handlerRegisterErrorChange(
                          key as keyof RegisterErrors,
                          registerValidation(value.type, e.target.value)
                        );
                      }
                      handlerUpdateRegisterField(key as keyof IUserRegister, e);
                    }}
                  >
                    {getPhoneTextField(value)}
                  </InputMask>
                ) : (
                  <TextField
                    color="secondary"
                    key={index + "reg"}
                    name={value.name + "reg"}
                    label={value.name}
                    type={value.type}
                    autoComplete="new-password"
                    error={
                      key in registerErrorsDefault
                        ? registerInputError[key as keyof RegisterErrors]
                        : false
                    }
                    required={value.required}
                    value={userRegisterData[key as keyof IRegisterComponent]}
                    onChange={(e) => {
                      if (key in registerErrorsDefault && key !== "password") {
                        handlerRegisterErrorChange(
                          key as keyof RegisterErrors,
                          registerValidation(value.type, e.target.value)
                        );
                      }
                      handlerUpdateRegisterField(key as keyof IUserRegister, e);
                    }}
                  />
                )
              )}
          {!regState && (
            <>
              <Autocomplete
                id="rolePicker"
                onChange={(e, value) => autocompleteChanged(value?.id)}
                options={registerTypes}
                getOptionLabel={(option) => option.name}
                renderInput={(params) => (
                  <TextField {...params} label="Выбор роли" color="secondary" />
                )}
              />
              {userRegisterData?.role_id === 2 && (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    transition: "all .3s",
                  }}
                >
                  <TextField
                    key={"INNreg"}
                    name={"INNreg"}
                    color="secondary"
                    label={"ИНН"}
                    type={"number"}
                    required={true}
                    inputProps={{
                      pattern: "^[d+]{12}$",
                    }}
                    value={userRegisterData.inn}
                    onChange={(e) => {
                      if (e.target.value.toString().length <= 12) {
                        setUserRegisterData({
                          ...userRegisterData,
                          inn: e.target.value,
                        });
                        validateInn(e.target.value);
                      }
                    }}
                    error={errINN}
                    sx={{ width: isINNChecked ? "100%" : "350px" }}
                  />
                  {innCheckLoading ? (
                    <Box sx={{ margin: "0 auto" }}>
                      <CircularProgress />
                    </Box>
                  ) : (
                    !isINNChecked && (
                      <Button variant="high" onClick={() => handlerINNCheck()}>
                        Проверить
                      </Button>
                    )
                  )}
                </Box>
              )}
              {errINN && (
                <Typography
                  variant="caption"
                  className="author__error"
                  sx={{ color: redColor, mb: "15px" }}
                >
                  {errINNMsg}
                </Typography>
              )}
              <Box
                sx={{
                  display: "flex",
                  gap: "10px",
                }}
              >
                <Checkbox
                  onChange={() => setUserAgreement((prevState) => !prevState)}
                />
                <Typography variant="caption">
                  Я согласен с условиями
                  <Button
                    variant="weakTextButton"
                    onClick={() => {
                      dispatch(setModalActive("userAgreementModal"));
                    }}
                    sx={{ textDecoration: "underline", paddingLeft: "0px" }}
                  >
                    Пользовательского соглашения
                  </Button>
                </Typography>
              </Box>
            </>
          )}
        </Stack>
        {(passwordErrorStatus || errAuth || errReg) && (
          <Typography
            variant="caption"
            className="author__error"
            sx={{ color: redColor, mb: "15px" }}
          >
            {errorMessage}
          </Typography>
        )}
        {}

        {regState ? (
          loading ? (
            <Box sx={{ display: "flex" }}>
              <CircularProgress />
            </Box>
          ) : (
            <Button
              ref={refBtn}
              onClick={() => {
                handlerLoginClick();
                setLoading(true);
              }}
              style={{ width: media ? "100%" : "" }}
            >
              Вход
            </Button>
          )
        ) : (
          <Button
            ref={refBtn}
            onClick={() => handlerRegisterClick()}
            disabled={
              Object.values(registerInputError).some(
                (value) => value !== false
              ) ||
              Object.values(
                Object.fromEntries(
                  Object.entries(userRegisterData).filter((e) => e[0] != "inn")
                )
              ).some((value) => value === undefined || value === "") ||
              userRegisterData.phone === "+7 (   )    -  -  " ||
              !userAgreement ||
              errINN ||
              (userRegisterData.role_id === 2 && userRegisterData.inn === "") ||
              INNCheckErr ||
              (userRegisterData.role_id === 2 && !isINNChecked)
            }
            style={{ width: media ? "100%" : "" }}
          >
            Регистрация
          </Button>
        )}

        <ConfirmEmailModal />
        <Stack
          direction={media ? "column" : "row"}
          sx={{ display: "flex", alignItems: "center", mt: "10px" }}
        >
          <Typography variant="caption">
            {regState ? "Нет аккаунта?" : "Уже есть аккаунт?"}
          </Typography>
          <Button
            variant="weakTextButton"
            onClick={handlerOnTransition}
            sx={{ textDecoration: "underline" }}
          >
            {regState ? "Зарегистрироваться" : "Войти"}
          </Button>
        </Stack>
        {regState && (
          <Button
            variant="weakTextButton"
            onClick={() => {
              dispatch(setModalActive("lostPasswordModal"));
            }}
            sx={{ textDecoration: "underline" }}
          >
            Забыли пароль?
          </Button>
        )}
      </Paper>
      <UserAgreementModal />
      <LostPasswordModal />
    </Stack>
  );
}

export default Authorization;
