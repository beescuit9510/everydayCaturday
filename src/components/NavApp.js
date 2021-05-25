import React from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { links, social } from "../data/NavAppData";
import "../css/NavApp.css";
import { useGlobalContext, AppProvider } from "./NavAppUseContext";

function Home() {
  const { openSideBar, openModal } = useGlobalContext();

  return (
    <main>
      <button className="sidebar-toggle" onClick={openSideBar}>
        <FaBars></FaBars>
      </button>
      <button className="btn" onClick={openModal}>
        show modal
      </button>
    </main>
  );
}

function Modal() {
  const { IsModalOpen, closeModal } = useGlobalContext();

  return (
    <div
      className={`${
        IsModalOpen ? "modal-overlay show-modal" : "modal-overlay"
      }`}
    >
      <div className="modal-container">
        <h3>modal content</h3>
        <button className="close-modal-btn" onClick={closeModal}>
          <FaTimes></FaTimes>
        </button>
      </div>
    </div>
  );
}

function Sidebar() {
  const logo =
    "https://raw.githubusercontent.com/john-smilga/react-projects/181d6adf89c8c61c72a0b8c5c1a8ad6af15e6d19/12-sidebar-modal/final/src/logo.svg";
  const { IsSideBarOpen, closeSideBar } = useGlobalContext();

  return (
    // <aside className={`${IsSideBarOpen ? "sidebar show-sidbar" : "sidebar"}`}>
      <aside className={`${IsSideBarOpen ? 'sidebar show-sidebar' : 'sidebar'}`}>
      <div className="sidebar-header">
        <img src={logo} className="logo" alt="coding addict" />
        <button className="close-btn" onClick={closeSideBar}>
          <FaTimes/>
        </button>
      </div>
      <ul className="links">
        {links.map((link) => {
          const { id, url, text, icon } = link;
          return (
            <li key={id}>
              <a href={url}>
              {icon}
              {text}
              </a>
            </li>
          );
        })}
      </ul>
      <ul className="social-icons">
        {social.map((link) => {
          const { id, url, icon } = link;
          return (
            <li key={id}>
              <a href={url}>{icon}</a>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}

export const NavApp = () => {
  return (
    <>
      <AppProvider>
        <Home></Home>
        <Modal></Modal>
        <Sidebar></Sidebar>
      </AppProvider>
    </>
  );
};
