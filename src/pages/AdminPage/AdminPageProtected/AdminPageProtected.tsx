import { Stack, Box } from "@mui/material";
import { AdminSideBar } from "../../../components/Admin";
import { Route, Routes } from "react-router-dom";
import { AdminAccessTouristPage } from "../AdminAccessTouristPage/AdminAccessTouristPage";
import { AdminClaimsPage } from "../AdminClaimsPage/AdminClaimsPage";
import { AdminAppealsPage } from "../AdminAppealsPage/AdminAppealsPage";

export const AdminPageProptected = () => {
  return (
    <Box>
      <Stack direction={"row"} height="100%">
        <AdminSideBar />
        <Box className="admin-panels" ml={"350px"} mt={"50px"}>
          <Routes>
            <Route
              path={"access-tourist"}
              element={<AdminAccessTouristPage />}
            />
            <Route
              path={"access-creator"}
              element={<AdminAccessTouristPage />}
            />
            <Route path={"claims"} element={<AdminClaimsPage />} />
            <Route path={"appeals"} element={<AdminAppealsPage />} />
          </Routes>
        </Box>
      </Stack>
    </Box>
  );
};
