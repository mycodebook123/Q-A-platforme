import React from "react";
import ReactDOM from "react-dom/client";
import "@/index.css"; // Using path alias for the CSS file
import App from "./App"; // Using path alias for the App component

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
