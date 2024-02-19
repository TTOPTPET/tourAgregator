import { ITourInfo } from "../../models/tourModels/ITourInfo";
enum actionTypes {
  SET_TOUR_INFO = "SET_TOUR_INFO",
}

interface IActionProps {
  props: ITourInfo;
}

interface IAction {
  type: actionTypes;
  payload?: IActionProps;
}

interface IDefaultState {
  tourInfo: ITourInfo;
}

const defaultState: IDefaultState = {
  tourInfo: {},
};

const TourInfoReducer = (state = defaultState, action: IAction) => {
  switch (action.type) {
    case actionTypes.SET_TOUR_INFO:
      return {
        ...state,
        tourInfo: { ...state.tourInfo, ...action.payload },
      };

    default:
      return state;
  }
};

export default TourInfoReducer;

export const setTourInfo = (props: ITourInfo) => {
  return {
    type: actionTypes.SET_TOUR_INFO,
    payload: props,
  };
};
