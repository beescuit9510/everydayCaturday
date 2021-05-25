// import { Euthanasia } from "./components/Euthanasia";
// import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import React from "react";
import ReactDOM from "react-dom";
// import { NavApp } from "./components/NavApp";
// import { Navbar } from "./components/Navbar";
// import { Quiz2 } from "./components/Quiz2";
// import { Quiz } from "./components/Quiz";
// import { Reviews } from "./components/Reviews";
// import "./css/Navbar.css";
// import { CatSpecies } from "./components/CatSpecies";
import { CatSpecies2 } from "./components/CatSpecies2";
import "./css/CatSpecies2.css"
import "./css/Donor2.css"
import { ColorGenerator } from "./components/ColorGenerator";
// import { Donor } from "./components/Donor";
import { Donor2 } from "./components/Donor2";


ReactDOM.render(
  <React.StrictMode>
    {/* <CatSpecies></CatSpecies> */}
    <CatSpecies2></CatSpecies2>
    {/* <ColorGenerator></ColorGenerator> */}
    {/* <Donor></Donor> */}
    {/* <Euthanasia></Euthanasia> */}
    {/* </React.StrictMode>, */}
    {/* <Quiz></Quiz> */}
    {/* <Quiz2></Quiz2> */}
    {/* <Reviews></Reviews> */}
    {/* <Navbar></Navbar> */}
    {/* <NavApp></NavApp> */}
  </React.StrictMode>,
  document.getElementById("root")
);
