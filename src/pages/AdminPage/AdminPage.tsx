import { Routes, Route, Navigate } from "react-router-dom";
// import { AdminAuth } from "./AdminAuth/AdminAuth";
import { AdminPageProptected } from "./AdminPageProtected/AdminPageProtected";

function AdminPage() {
  return (
    <>
      <Routes>
        {/* <Route path={"auth"} element={<AdminAuth />} /> */}
        <Route index element={<Navigate to={"access-tourist"} />} />
        <Route path={"*"} element={<AdminPageProptected />} />
      </Routes>
    </>
  );
}

export default AdminPage;
