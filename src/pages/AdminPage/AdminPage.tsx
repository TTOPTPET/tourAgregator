import { Routes, Route, Navigate } from "react-router-dom";
import { AdminPageProptected } from "./AdminPageProtected/AdminPageProtected";

function AdminPage() {
  return (
    <>
      <Routes>
        <Route index element={<Navigate to={"access-tourist"} />} />
        <Route path={"*"} element={<AdminPageProptected />} />
      </Routes>
    </>
  );
}

export default AdminPage;
