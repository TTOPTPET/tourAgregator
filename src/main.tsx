import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { CookiesProvider } from "react-cookie";
import { Provider } from "react-redux";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import store from "./redux/store.ts";
import AxiosProvider from "./components/AxiosProvider/AxiosProvider.tsx";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <CookiesProvider>
    <React.StrictMode>
      <Provider store={store}>
        <AxiosProvider>
          <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={"ru"}>
            <App />
          </LocalizationProvider>
        </AxiosProvider>
      </Provider>
    </React.StrictMode>
  </CookiesProvider>
);
