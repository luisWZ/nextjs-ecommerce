import { createContext, type PropsWithChildren, useState } from 'react';

export interface UIState {
  isMenuOpen: boolean;
  isOpenFromNavbar: boolean;
}

const INITIAL_STATE: UIState = {
  isMenuOpen: false,
  isOpenFromNavbar: false,
};

type ContextProps = UIState & {
  openMenu: () => void;
  closeMenu: () => void;
  openMenuForSearch: () => void;
  isOpenFromNavbarToFalse: () => void;
};

export const UIContext = createContext({} as ContextProps);

export const UIProvider = ({ children }: PropsWithChildren) => {
  const [state, setState] = useState(INITIAL_STATE);

  const openMenu = () => setState({ ...state, isMenuOpen: true });

  const openMenuForSearch = () => setState({ ...state, isMenuOpen: true, isOpenFromNavbar: true });

  const isOpenFromNavbarToFalse = () => setState({ ...state, isOpenFromNavbar: false });

  const closeMenu = () => setState({ ...state, isMenuOpen: false });

  return (
    <UIContext.Provider
      value={{
        ...state,
        openMenu,
        closeMenu,
        openMenuForSearch,
        isOpenFromNavbarToFalse,
      }}
    >
      {children}
    </UIContext.Provider>
  );
};
