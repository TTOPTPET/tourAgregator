import { Catalog, ICatalog } from "../../models/tourListModels/ICatalog";
enum actionTypes {
  SET_CATALOGS = "SET_CATALOGS",
}

interface IActionProps {
  props: ICatalog;
}

interface IAction {
  type: actionTypes;
  payload?: IActionProps;
  catalogName?: Catalog;
}

interface IDefaultState {
  country: ICatalog[];
  complexity: ICatalog[];
  category: ICatalog[];
}

const defaultState: IDefaultState = {
  country: [],
  complexity: [],
  category: [],
};

const CatalogsReducer = (state = defaultState, action: IAction) => {
  switch (action.type) {
    case actionTypes.SET_CATALOGS:
      if (action.catalogName === Catalog.country) {
        return {
          ...state,
          country: action.payload,
        };
      } else if (action.catalogName === Catalog.category) {
        return {
          ...state,
          category: action.payload,
        };
      } else {
        return {
          ...state,
          complexity: action.payload,
        };
      }

    default:
      return state;
  }
};

export default CatalogsReducer;

export const setCatalog = (props: ICatalog[], catalogName?: Catalog) => {
  return {
    type: actionTypes.SET_CATALOGS,
    payload: props,
    catalogName,
  };
};
