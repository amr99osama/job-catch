import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

// import customFetch from "./utils/customFetch.jsx";
// const res = await customFetch.get("/test");
// console.log(res.data);
// fetch("/api/v1/test")
//   .then((res) => res.json())
//   .then((data) => console.log(data));
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
    <ToastContainer position="top-center" />
  </React.StrictMode>
);
