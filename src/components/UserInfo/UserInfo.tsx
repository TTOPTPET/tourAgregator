import { useEffect } from "react";
import { ITouristInfo, ICreatorInfo } from "../../models/userModels/IUserInfo";
import { Box, Typography } from "@mui/material";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import UserInfoSkeleton from "./UserInfoSkeleton/UserInfoSkeleton";
import { setUserInfo } from "../../redux/UserInfo/UserInfoReducer";
import { getUserInfo } from "../../API/commonAPI";

type UserInfoProps = {
  fields: JSX.Element;
  submitFuntion?: () => void;
  header: JSX.Element;
  avatarComponent?: JSX.Element;
  documents?: JSX.Element;
};

function UserInfo({ header, fields }: UserInfoProps) {
  const userInfo: ITouristInfo | ICreatorInfo | undefined = useSelector(
    (state: RootState) => state?.userInfo?.userInfo
  );

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
    </>
  );
}

export default UserInfo;
