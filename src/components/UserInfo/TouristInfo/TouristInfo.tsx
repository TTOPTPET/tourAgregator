import UserInfo from "../UserInfo";
import UserInfoHeader from "../UserInfoHeader/UserInfoHeader";
import { Box, Typography } from "@mui/material";

import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";

import { ITouristInfo } from "../../../models/userModels/IUserInfo";

function TouristInfo() {
  const TouristInfo: ITouristInfo = useSelector(
    (state: RootState) => state.userInfo.userInfo as ITouristInfo
  );

  return (
    <UserInfo
      header={
        <>
          <UserInfoHeader
            title={"Привет, Турист!"}
            linkTo="/tourist/lk/editInfo"
            userInfo={TouristInfo}
          />
        </>
      }
      fields={<></>}
    />
  );
}

export default TouristInfo;
