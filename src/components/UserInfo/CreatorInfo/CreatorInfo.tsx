import UserInfo from "../UserInfo";
import UserInfoHeader from "../UserInfoHeader/UserInfoHeader";
import { Box, Typography } from "@mui/material";

import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";

import { ICreatorInfo } from "../../../models/userModels/IUserInfo";
import InfoFieldsCreator from "./InfoFieldsCreator/InfoFieldsCreator";

function CreatorInfo() {
  const CreatorInfo: ICreatorInfo = useSelector(
    (state: RootState) => state?.userInfo?.userInfo as ICreatorInfo
  );

  return (
    <UserInfo
      header={
        <UserInfoHeader
          title={"Личный кабинет"}
          linkTo="/creator/lk/editInfo"
          userInfo={CreatorInfo}
        />
      }
      fields={
        <>
          <InfoFieldsCreator creatorInfo={CreatorInfo} />
        </>
      }
    />
  );
}

export default CreatorInfo;
