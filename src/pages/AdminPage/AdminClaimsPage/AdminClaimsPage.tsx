import { useEffect, useState } from "react";
import { IUserMessage } from "../../../models/adminModels/IUsersMessage";
import { getClaimsList } from "../../../API/adminAPI";
import { Stack, Typography } from "@mui/material";
import { AdminComponent } from "../../../components/Admin/AdminFabric/AdminFabric";
import { redColor } from "../../../config/MUI/color/color";

export const AdminClaimsPage = () => {
  const [userClaims, setUserClaims] = useState<IUserMessage[]>([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    getClaimsList((value) => setUserClaims(value), { page }, undefined);
  }, []);

  return (
    <Stack padding={1} gap={1}>
      {userClaims && userClaims.length > 0 ? (
        userClaims.map((item, index) => (
          <AdminComponent
            key={index}
            props={{ ...item, type: "message" }}
            arrayProps={userClaims}
            setArrayProps={setUserClaims}
          />
        ))
      ) : (
        <Typography variant="caption" sx={{ mt: "20px", textAlign: "center" }}>
          Нет обращений
        </Typography>
      )}
    </Stack>
  );
};
