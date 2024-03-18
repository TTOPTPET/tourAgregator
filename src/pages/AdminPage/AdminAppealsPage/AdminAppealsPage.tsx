import { useEffect, useState } from "react";
import { IUserMessage } from "../../../models/adminModels/IUsersMessage";
// import { getUserMessages } from "../../../API/adminAPI";
import { Stack } from "@mui/material";
import { AdminComponent } from "../../../components/Admin/AdminFabric/AdminFabric";

export const AdminAppealsPage = () => {
  const [userAppeals, setUserAppeals] = useState<IUserMessage[]>([]);

  //   useEffect(() => {
  //     getUserMessages((value) => setUserMessages(value), undefined, false);
  //   }, []);

  return (
    <Stack padding={1} gap={1}>
      {userAppeals &&
        userAppeals.map((item, index) => (
          <AdminComponent
            key={index}
            props={{ ...item, type: "message" }}
            arrayProps={userAppeals}
          />
        ))}
    </Stack>
  );
};
