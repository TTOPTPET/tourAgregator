import "./App.css";
import dayjs from "dayjs";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Container, ThemeProvider, Box } from "@mui/material";

import { mainThemes } from "./config/MUI/themes/mainTheme/mainTheme";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

import { useDispatch } from "react-redux";
// import TourPage from "./pages/TourPage/TourPage";
import { useEffect, Suspense } from "react";
// import { getUserInfo } from "./API/commonAPI";
// import { setUserInfo } from "./redux/UserInfo/UserInfoReducer";
// import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
// import NavTool from "./components/NavTool/NavTool";
import { BAN_STATUS, SESSION, USER_ROLE } from "./config/types";
import { useCookies } from "react-cookie";
// import HelpButton from "./components/HelpButton/HelpButton";
// import ErrorReportModal from "./components/Modals/ErrorReportModal/ErrorReportModal";
import { lazyWithRetry } from "./tools/lazyWithRetry";
// import SuccessMessageSendModal from "./components/Modals/SuccessMessageSendModal/SuccessMessageSendModal";
// import ContactsPage from "./pages/ContactsPage/ContactsPage";
// import DocumentsPage from "./pages/DocumentsPage/DocumentsPage";

// const AdminPage = lazyWithRetry(() =>
//   import("./pages/AdminPage/AdminPage").then(({ default: AdminPage }) => ({
//     default: AdminPage,
//   }))
// );
const Authorization = lazyWithRetry(() =>
  import("./pages/Authorization/Authorization").then(
    ({ default: Authorization }) => ({ default: Authorization })
  )
);

const VerifyUserEmail = lazyWithRetry(() =>
  import("./pages/VerifyUserEmail/VerifyUserEmail").then(
    ({ default: VerifyUserEmail }) => ({ default: VerifyUserEmail })
  )
);
// const CreatorLk = lazyWithRetry(() =>
//   import("./pages/CreatorLk/CreatorLk").then(({ default: CreatorLk }) => ({
//     default: CreatorLk,
//   }))
// );
// const NotificationsPage = lazyWithRetry(() =>
//   import("./pages/NotificationsPage/NotificationsPage").then(
//     ({ default: NotificationsPage }) => ({ default: NotificationsPage })
//   )
// );
// const PaymentSettingsPage = lazyWithRetry(() =>
//   import("./pages/PaymentSettingsPage/PaymentSettingsPage").then(
//     ({ default: PaymentSettingsPage }) => ({ default: PaymentSettingsPage })
//   )
// );
// const StatisticPage = lazyWithRetry(() =>
//   import("./pages/StatisticPage/StatisticPage").then(
//     ({ default: StatisticPage }) => ({ default: StatisticPage })
//   )
// );
// const TourCalendarPage = lazyWithRetry(() =>
//   import("./pages/TourCalendarPage/TourCalendarPage").then(
//     ({ default: TourCalendarPage }) => ({ default: TourCalendarPage })
//   )
// );
// const TouristLk = lazyWithRetry(() =>
//   import("./pages/TouristLk/TouristLk").then(({ default: TouristLk }) => ({
//     default: TouristLk,
//   }))
// );
// const TourListPage = lazyWithRetry(() =>
//   import("./pages/TourListPage/TourListPage").then(
//     ({ default: TourListPage }) => ({ default: TourListPage })
//   )
// );
// const AddTourPage = lazyWithRetry(() =>
//   import("./pages/AddTourPage/AddTourPage").then(
//     ({ default: AddTourPage }) => ({ default: AddTourPage })
//   )
// );
// const StartPage = lazyWithRetry(() =>
//   import("./pages/StartPage/StartPage").then(({ default: StartPage }) => ({
//     default: StartPage,
//   }))
// );
// const EditCreatorInfoPage = lazyWithRetry(() =>
//   import("./pages/EditCreatorInfoPage/EditCreatorInfoPage").then(
//     ({ default: EditCreatorInfoPage }) => ({ default: EditCreatorInfoPage })
//   )
// );
// const EditTouristInfoPage = lazyWithRetry(() =>
//   import("./pages/EditTouristInfoPage/EditTouristInfoPage").then(
//     ({ default: EditTouristInfoPage }) => ({ default: EditTouristInfoPage })
//   )
// );

function App() {
  const [cookies] = useCookies([SESSION, BAN_STATUS, USER_ROLE]);

  dayjs.locale("ru");
  const dispatch = useDispatch();
  useEffect(() => {
    // cookies.TOKEN &&
    //   getUserInfo((value) => {
    //     dispatch(setUserInfo(value));
    //     // setLoadingStatus(false);
    //   });
  }, [cookies]);

  return (
    <BrowserRouter>
      <ThemeProvider theme={mainThemes}>
        <Header />
        <Suspense>
          <Container sx={{ p: "35px 0 70px 0", minHeight: "79vh" }}>
            <Routes>
              {/* <Route
                path={"/creator/lk"}
                element={
                  <ProtectedRoute>
                    <CreatorLk />
                  </ProtectedRoute>
                }
              /> */}
              {/* <Route
                path={"/creator/lk/editInfo"}
                element={
                  <ProtectedRoute>
                    <EditCreatorInfoPage />
                  </ProtectedRoute>
                }
              /> */}
              {/* <Route
                path={"/tourist/lk/editInfo"}
                element={
                  <ProtectedRoute>
                    <EditTouristInfoPage />
                  </ProtectedRoute>
                }
              /> */}
              {/* <Route
                path={"/creator/addTour"}
                element={
                  <ProtectedRoute>
                    <AddTourPage isEditing={false} />
                  </ProtectedRoute>
                }
              /> */}
              {/* <Route
                path={"/creator/editTour/:tourId"}
                element={
                  <ProtectedRoute>
                    <AddTourPage isEditing />
                  </ProtectedRoute>
                }
              /> */}
              {/* <Route
                path={"/creator/notifications"}
                element={
                  <ProtectedRoute>
                    <NotificationsPage />
                  </ProtectedRoute>
                }
              /> */}
              {/* <Route
                path={"/creator/payment"}
                element={
                  <ProtectedRoute>
                    <PaymentSettingsPage />
                  </ProtectedRoute>
                }
              /> */}
              {/* <Route
                path={"/creator/calendar"}
                element={
                  <ProtectedRoute>
                    <TourCalendarPage />
                  </ProtectedRoute>
                }
              /> */}
              {/* <Route
                path={"/tourist/lk"}
                element={
                  <ProtectedRoute>
                    <TouristLk />
                  </ProtectedRoute>
                }
              /> */}
              {/* <Route path={"/"} element={<StartPage />} /> */}
              {/* <Route path={"/admin/*"} element={<AdminPage />} /> */}
              <Route path={"/auth"} element={<Authorization />} />
              <Route path={"/verify/:token"} element={<VerifyUserEmail />} />
              {/* <Route path={"/tours/all"} element={<TourListPage />} /> */}
              {/* <Route path={"/tours/tour/:tourId"} element={<TourPage />} /> */}
              {/* <Route path={"/contacts"} element={<ContactsPage />} /> */}
              {/* <Route path={"/documents"} element={<DocumentsPage />} /> */}
            </Routes>
          </Container>
        </Suspense>
        {/* <Box
          sx={{
            position: "fixed",
            bottom: "50px",
            right: "50px",
            zIndex: "1000",
          }}
        >
          <HelpButton />
        </Box> */}
        <Footer />
        {/* HACK:Инструмент навигации для разработки */}
        {/* {import.meta.env.VITE_APP_ACCESS_TYPE === "DEV" && <NavTool />} */}
        {/* <ErrorReportModal /> */}
        {/* <SuccessMessageSendModal /> */}
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
