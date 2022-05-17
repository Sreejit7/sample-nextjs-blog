import { createContext, ReactNode, useContext, useReducer } from "react";

export enum ModalActionTypes {
  CREATE_MODAL = "CREATE_MODAL",
  DELETE_MODAL = "DELETE_MODAL",
}

type CreateModalAction = {
  type: ModalActionTypes.CREATE_MODAL;
  children: ReactNode;
  location: {
    top: number;
    center: number;
  };
};

type DeleteModalAction = {
  type: ModalActionTypes.DELETE_MODAL;
};

type Action = CreateModalAction | DeleteModalAction;

type State = {
  modalExists: boolean;
  children: null | ReactNode;
  location: {
    top: number | null;
    center: number | null;
  };
};

type Dispatch = (action: Action) => void;

const initialState: State = {
  modalExists: false,
  children: null,
  location: {
    top: -1,
    center: -1,
  },
};

const modalReducer = (state: State = initialState, action: Action) => {
  switch (action.type) {
    case ModalActionTypes.CREATE_MODAL:
      return {
        ...state,
        modalExists: true,
        children: action.children,
        location: action.location,
      };
    case ModalActionTypes.DELETE_MODAL:
      return initialState;
    default:
      throw new Error("No action of this type exists!");
  }
};

export const ModalContext = createContext<
  { state: State; dispatch: Dispatch } | undefined
>(undefined);

export const ModalContextProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(modalReducer, initialState);

  const value = { state, dispatch };

  return (
    <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
  );
};

export const useModalContext = () => {
  const context = useContext(ModalContext);

  if (context === undefined) {
    throw new Error("No provider exists for this context!");
  }

  return context;
};
