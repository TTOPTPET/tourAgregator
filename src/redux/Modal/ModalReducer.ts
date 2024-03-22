import { Dispatch, SetStateAction } from "react";
import { IUserRecord } from "../../models/userModels/IUserRecord";
import { IPublicTour } from "../../models/calendarModels/IPublicTour";

//HACK: Для того, чтобы задать новый id необходмо вписать его сюда :)
type modalsId =
  | "filterModal"
  | "sortModal"
  | "errorReportModal"
  | "successMessageSendModal"
  | "cancelBookingModal"
  | "successCancellingBookingModal"
  | "successPayModal"
  | "successBookingModal"
  | "deleteTourModal"
  | "successDeleteTourModal"
  | "successEditUserInfoModal"
  | "enterMobileCodeModal"
  | "newPublicModal"
  | "сancelPostedToursModal"
  | "confirmCancelPostedTourModal"
  | "successCancelPostedTourModal"
  | "bookingInfoModal"
  | "errorBookingModal"
  | "cardLostModal"
  | "deleteCardModal"
  | "noLoginModal"
  | "confirmCancelBooking"
  | "successCancelBooking"
  | "confirmChangeCreatorTypeModal"
  | "succesReturnMoney"
  | "moneyOutputErrorModal"
  | "succsessMoneyOutputModal"
  | "deleteCardErrorModal"
  | "lostPasswordModal"
  | "changePasswordModal"
  | "userAgreementModal"
  | "сonfirmEmailModal"
  | "successLostPasswordModal"
  | "confirmAddTourExit"
  | "needDeletePublicModal"
  | "gidQuestModal"
  | "confirmDeleteUserModal"
  | "successEmailMessageSendModal";

enum actionTypes {
  SET_MODAL_ACTIVE = "SET_MODAL_ACTIVE",
  SET_MODAL_INACTIVE = "SET_MODAL_INACTIVE",
}

interface IActionProps {
  id: modalsId;
  props?: {
    tourId: string;
    userId?: string;
    bookingId: number;
    multiply?: boolean;
    index?: number;
    tour?: boolean;
    records?: IUserRecord[];
    setRecords?: Dispatch<SetStateAction<IUserRecord[]>>;
    paymentDeadline?: string;
    paymentUrl?: string;
    creatorTypeRadio?: any;
    errorMessage?: string;
    dateFrom?: string;
    dateTo?: string;
    publicTourId?: string;
    gidEmail?: string;
    quest?: boolean;
    publicTours?: IPublicTour[] | undefined;
    record?: {
      tour?: {
        tourId?: string;
        tourName?: string;
      };
      publicTourId?: string;
    };
  };
}

interface IAction {
  type: actionTypes;
  payload: IActionProps;
}

interface IDefaultState {
  activeModals: IActionProps[];
}

const defaultState: IDefaultState = {
  activeModals: [],
};

const ModalReducer = (state = defaultState, action: IAction) => {
  switch (action.type) {
    case actionTypes.SET_MODAL_ACTIVE:
      return {
        ...state,
        activeModals: state.activeModals.concat(action.payload),
      };
    case actionTypes.SET_MODAL_INACTIVE:
      return {
        ...state,
        activeModals: state.activeModals.filter(
          (modal) => modal.id !== action.payload.id
        ),
      };

    default:
      return state;
  }
};

export default ModalReducer;

export const setModalActive = (id: modalsId, props?: any) => {
  return {
    type: actionTypes.SET_MODAL_ACTIVE,
    payload: { id, props },
  };
};
export const setModalInactive = (id: modalsId) => {
  return {
    type: actionTypes.SET_MODAL_INACTIVE,
    payload: { id },
  };
};

export const isModalActive = (id: modalsId, activeModals: IActionProps[]) => {
  return Boolean(activeModals.find((modal) => modal.id === id));
};
