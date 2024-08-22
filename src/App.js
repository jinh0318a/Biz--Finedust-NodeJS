import React from "react";
import StationMainMain from "./station/StationMain";
import OnceMain from "./once/OnceMain";
import { Route, Routes } from "react-router-dom";
import "./css/main.css";

const App = () => {
  return (
    <>
      <header className="main">광주광역시 미세먼지 현황</header>
      <Routes>
        <Route path="/" element={<StationMainMain />} />
        <Route path="/once" element={<OnceMain />} />
      </Routes>
    </>
  );
};

export default App;
