import React, { useEffect, useRef, useState } from "react";
import { FaBars } from "react-icons/fa";
import { links, social } from "../data/NavbarData";
import "../css/Navbar.css";

export const Navbar = () => {
  const [ShowLinks, setShowLinks] = useState(false);
  const linksContainerRef = useRef(null);
  const linksRef = useRef(null);

  useEffect(() => {
    const linksHeight = linksRef.current.getBoundingClientRect().height;
    if (ShowLinks) {
      linksContainerRef.current.style.height = `${linksHeight}px`;
    } else if (ShowLinks === false) {
      linksContainerRef.current.style.height = "0px";
    }
  }, [ShowLinks]);
  return (
    <div>
      <nav>
        <div className="nav-center">
          <div className="nav-header">
            <button
              className="nav-toggle"
              onClick={() => setShowLinks(!ShowLinks)}
            >
              <FaBars />
            </button>
          </div>
          <div className="links-container" ref={linksContainerRef}>
            <ul className="links" ref={linksRef}>
              {links.map((link) => {
                const { id, text, url } = link;
                return (
                  <li key={id}>
                    <a href={url}>{text}</a>
                  </li>
                );
              })}
            </ul>
          </div>
          <div>
            <ul className="social-icons">
              {social.map((socialIcon) => {
                const { id, url, icon } = socialIcon;
                return (
                  <li key={id}>
                    <a href={url} target="_blank">
                      {icon}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};
