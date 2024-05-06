import { ICreatorInfo, ITouristInfo } from "../../models/userModels/IUserInfo";
enum actionTypes {
  SET_USER_INFO = "SET_USER_INFO",
  CLEAR_FIELDS_CREATOR = "CLEAR_FIELDS_CREATOR",
  USER_LOGINED = "USER_LOGINED",
}

interface IActionProps {
  props: ICreatorInfo | ITouristInfo;
}

interface IAction {
  type: actionTypes;
  payload?: IActionProps;
}

interface IDefaultState {
  userInfo: ICreatorInfo | ITouristInfo;
}

const defaultState: IDefaultState = {
  userInfo: {},
};

const UserInfoReducer = (state = defaultState, action: IAction) => {
  switch (action.type) {
    case actionTypes.SET_USER_INFO:
      return {
        ...state,
        userInfo: { ...state.userInfo, ...action.payload },
      };
    default:
      return state;
  }
};

export default UserInfoReducer;

export const setUserInfo = (props: ICreatorInfo | ITouristInfo) => {
  return {
    type: actionTypes.SET_USER_INFO,
    payload: props,
  };
};
export const clearFieldsCreator = () => {
  return {
    type: actionTypes.CLEAR_FIELDS_CREATOR,
  };
};
