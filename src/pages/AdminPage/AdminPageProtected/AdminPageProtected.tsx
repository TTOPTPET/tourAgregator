import { Stack, Box } from "@mui/material";
import { AdminSideBar } from "../../../components/Admin";
import { Route, Routes } from "react-router-dom";
import { AdminAccessTouristPage } from "../AdminAccessUsersPage/AdminAccessUsersPage";
import { AdminClaimsPage } from "../AdminClaimsPage/AdminClaimsPage";
import { AdminAppealsPage } from "../AdminAppealsPage/AdminAppealsPage";

export const AdminPageProptected = () => {
  return (
    <Box>
      <Stack direction={"row"} height="100%" width="100%">
        <AdminSideBar />
        <Box className="admin-panels" ml={"350px"} width="60%">
          <Routes>
            <Route
              path={"access-tourist"}
              element={<AdminAccessTouristPage roleId={1} />}
            />
            <Route
              path={"access-creator"}
              element={<AdminAccessTouristPage roleId={2} />}
            />
            <Route path={"claims"} element={<AdminClaimsPage />} />
            <Route path={"appeals"} element={<AdminAppealsPage />} />
          </Routes>
        </Box>
      </Stack>
    </Box>
  );
};
