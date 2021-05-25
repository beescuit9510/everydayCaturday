import React, { useContext, useState, createContext } from "react";

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [IsSideBarOpen, setIsSideBarOpen] = useState(false);
  const [IsModalOpen, setIsModalOpen] = useState(false);

  const openSideBar = () => setIsSideBarOpen(true);
  const closeSideBar = () => setIsSideBarOpen(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <AppContext.Provider
      value={{
        IsModalOpen,
        IsSideBarOpen,
        openModal,
        closeModal,
        openSideBar,
        closeSideBar,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppProvider, AppContext };