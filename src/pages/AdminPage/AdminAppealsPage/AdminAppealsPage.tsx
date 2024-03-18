import { useEffect, useState } from "react";
import { IUserMessage } from "../../../models/adminModels/IUsersMessage";
// import { getUserMessages } from "../../../API/adminAPI";
import { Stack, Typography } from "@mui/material";
import { AdminComponent } from "../../../components/Admin/AdminFabric/AdminFabric";
import { getAppealsList } from "../../../API/adminAPI/AdminMessagesAPI/AdminMessagesAPI";

export const AdminAppealsPage = () => {
  const [userAppeals, setUserAppeals] = useState<IUserMessage[]>([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    getAppealsList(
      (value) => setUserAppeals(value),
      { page },
      () => {}
    );
  }, []);

  return (
    <Stack padding={1} gap={1}>
      {userAppeals && userAppeals.length > 0 ? (
        userAppeals.map((item, index) => (
          <AdminComponent
            key={index}
            props={{ ...item, type: "message" }}
            arrayProps={userAppeals}
            setArrayProps={setUserAppeals}
            appeals={true}
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
