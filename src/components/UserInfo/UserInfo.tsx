import { useEffect } from "react";
import {
  ITouristInfo,
  ICreatorInfo,
  UserType,
} from "../../models/userModels/IUserInfo";
import { Box, Typography, Avatar as MuiAvatar, Paper } from "@mui/material";
import userPhoto from "../../media/userPhoto.svg";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import UserInfoSkeleton from "./UserInfoSkeleton/UserInfoSkeleton";
// import CreatorDocumentsList from "../CreatorDocumentsList/CreatorDocumentsList";

import {
  setModalActive,
  setModalInactive,
} from "../../redux/Modal/ModalReducer";
// import ErrorReportModal from "../Modals/ErrorReportModal/ErrorReportModal";
// import SuccessMessageSendModal from "../Modals/SuccessMessageSendModal/SuccessMessageSendModal";
// import CancelBookingModal from "../Modals/CancelBookingModal/CancelBookingModal";
// import SuccessCancellingBookingModal from "../Modals/SuccessCancellingBookingModal/SuccessCancellingBookingModal";
// import SuccessBookingModal from "../Modals/SuccessBookingModal/SuccessBookingModal";
// import DeleteTourModal from "../Modals/DeleteTourModal/DeleteTourModal";
// import SuccessDeleteTourModal from "../Modals/SuccessDeleteTourModal/SuccessDeleteTourModal";
// import SuccessPayModal from "../Modals/SuccessPayModal/SuccessPayModal";
// import SuccessEditUserInfoModal from "../Modals/SuccessEditUserInfoModal/SuccessEditUserInfoModal";
// import EnterMobileCodeModal from "../Modals/EnterMobileCodeModal/EnterMobileCodeModal";
import { useNavigate } from "react-router-dom";
import { setUserInfo } from "../../redux/UserInfo/UserInfoReducer";
import { getUserInfo } from "../../API/commonAPI";
import { baseUrl } from "../../config/config";

type UserInfoProps = {
  fields: JSX.Element;
  submitFuntion?: () => void;
  header: JSX.Element;
  avatarComponent?: JSX.Element;
  documents?: JSX.Element;
};

function UserInfo({ header, fields, submitFuntion }: UserInfoProps) {
  const userInfo: ITouristInfo | ICreatorInfo | undefined = useSelector(
    (state: RootState) => state?.userInfo?.userInfo
  );

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { role_id, name, phone, email } = userInfo as
    | ITouristInfo
    | ICreatorInfo;

  useEffect(() => {
    getUserInfo((value) => {
      dispatch(setUserInfo(value));
    });
  }, []);

  return (
    <>
      <Box className="userInfo__wrapper">
        {!userInfo ? (
          <UserInfoSkeleton />
        ) : (
          <>
            {header}
            <Box
              className="userInfo__body-wrapper"
              sx={{ marginBottom: "30px" }}
            >
              <Box
                className="userInfo__content"
                sx={{
                  mt:
                    userInfo && role_id === 1
                      ? { lg: "50px", md: "20px", sm: "20px", xs: "20px" }
                      : { lg: "0px", md: "0px", sm: "20px", xs: "20px" },
                  display: "flex",
                  flexDirection: { sm: "row", xs: "column" },
                }}
              >
                <Box>
                  <Box>
                    <Box className="userInfo_title">
                      <Typography variant="h5">
                        {name || "Имя пользователя"}
                      </Typography>
                    </Box>
                  </Box>
                  <Box>
                    <Box
                      className="userInfo__commonData"
                      sx={{
                        display: "flex",
                        gap:
                          role_id === 1
                            ? "10px"
                            : {
                                lg: "50px",
                                md: "20px",
                                sm: "20px",
                                xs: "20px",
                              },
                        mt: { lg: "10px", md: "20px", sm: "20px", xs: "20px" },
                      }}
                    >
                      <Box
                        className="userInfo__commonData-titles"
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          width:
                            role_id === 1
                              ? {
                                  lg: "240px",
                                  xs: "145px",
                                }
                              : {
                                  lg: "265px",
                                  md: "200px",
                                  sm: "200px",
                                  xs: "160px",
                                },
                          gap: "5px",
                        }}
                      >
                        <Typography variant="h6">Номер телефона:</Typography>
                        <Typography variant="h6">Электронная почта:</Typography>
                      </Box>
                      <Box
                        className="userInfo__commonData-descr"
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "3px",
                        }}
                      >
                        <Typography variant="caption">
                          {phone || "-"}
                        </Typography>
                        <Typography variant="caption">
                          {email || "-"}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                  {fields}
                </Box>
              </Box>
            </Box>
          </>
        )}
      </Box>
      {/* {userInfo && userInfo?.typeUser !== UserType.tourist && (
        <CreatorDocumentsList
          files={userInfo.dataUser.documents}
          loadingStatus={!userInfo.dataUser}
          variant="displayInfo"
        />
      )} */}
      {/* <CancelBookingModal />
      <SuccessCancellingBookingModal />
      <SuccessBookingModal /> */}
      {/* <DeleteTourModal /> */}
      {/* <SuccessDeleteTourModal />
      <SuccessPayModal />
      <SuccessEditUserInfoModal />
      <EnterMobileCodeModal
        successCallback={(resp) => {
          setCookies(TOKEN, resp.accessToken, { path: "/" });
          setCookies(REFRESH_TOKEN, resp.refreshToken, { path: "/" });
          setCookies(USER_ROLE, resp.role, { path: "/" });
          setCookies(BAN_STATUS, resp.status, { path: "/" });
          dispatch(setModalInactive("enterMobileCodeModal"));
          navigate("/");
        }}
      /> */}
    </>
  );
}

export default UserInfo;
