import { useEffect, useState } from "react";
import { IUserList } from "../../../models/adminModels/IUserList";
// import { getTouristList } from "../../../API/adminAPI";
import { AdminComponent } from "../../../components/Admin/AdminFabric/AdminFabric";
import { Stack } from "@mui/material";

export const AdminAccessTouristPage = () => {
  const [touristList, setTouristList] = useState<IUserList[]>();

  //   useEffect(() => {
  //     getTouristList((value) => setTouristList(value), undefined, false);
  //   }, []);

  return (
    <Stack padding={1} gap={1}>
      {touristList &&
        touristList.map((item, index) => (
          <AdminComponent
            key={index}
            props={{ ...item, type: "user" }}
            arrayProps={touristList}
          />
        ))}
    </Stack>
  );
};
