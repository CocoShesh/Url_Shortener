import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { UrlProvider } from "./components/context/UrlContext.jsx";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <UrlProvider>
      <App />
    </UrlProvider>
  </React.StrictMode>
);
