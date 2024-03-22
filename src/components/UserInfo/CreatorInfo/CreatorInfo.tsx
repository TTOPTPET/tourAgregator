import UserInfo from "../UserInfo";
import UserInfoHeader from "../UserInfoHeader/UserInfoHeader";

import { ICreatorInfo } from "../../../models/userModels/IUserInfo";
import InfoFieldsCreator from "./InfoFieldsCreator/InfoFieldsCreator";

type ICreatorInfoProps = {
  CreatorData: ICreatorInfo;
};

function CreatorInfo({ CreatorData }: ICreatorInfoProps) {
  return (
    <UserInfo
      header={
        <UserInfoHeader
          title={"Личный кабинет"}
          linkTo="/creator/lk/editInfo"
          userInfo={CreatorData}
        />
      }
      fields={
        <>
          <InfoFieldsCreator creatorInfo={CreatorData} />
        </>
      }
    />
  );
}

export default CreatorInfo;
