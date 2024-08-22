import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import "./css/main.css";
const link = document.createElement("link");
link.rel = "stylesheet";
link.href = "https://unpkg.com/leaflet/dist/leaflet.css";
document.head.appendChild(link);
const rootDoc = document.querySelector("#root");

const root = ReactDOM.createRoot(rootDoc);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
