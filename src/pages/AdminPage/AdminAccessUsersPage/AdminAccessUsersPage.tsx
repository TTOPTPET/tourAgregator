import { useEffect, useState } from "react";
import { IUserList } from "../../../models/adminModels/IUserList";
import { getUsersList } from "../../../API/adminAPI";
import { AdminComponent } from "../../../components/Admin/AdminFabric/AdminFabric";
import {
  Button,
  CircularProgress,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { redColor } from "../../../config/MUI/color/color";

type AdminAccessTouristPageProps = {
  roleId: number;
};

export const AdminAccessTouristPage = ({
  roleId,
}: AdminAccessTouristPageProps) => {
  const [userList, setUserList] = useState<IUserList[]>([]);
  const [page, setPage] = useState(1);
  const [emailString, setEmailString] = useState("");
  const [errorMessage, setErrorMessage] = useState(
    "Что-то пошло не так, попробуйте позже"
  );
  const [error, setError] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const [loading, setLoading] = useState(false);

  const touristSearch = () => {
    setError(false);
    setLoading(true);
    setPage(1);
    getUsersList(
      (value) => {
        setUserList(value.data);
        setError(false);
        value.data.length === 0 && setError(true);
        setErrorMessage("Нет таких пользователей!");
        setHasMore(value.details.hasMore);
        setLoading(false);
      },
      { page, emailString, roleId },
      () => {
        setError(true);
        setEmailString("");
        setLoading(false);
      }
    );
  };
  console.log(page);
  const loadMore = () => {
    setLoading(true);
    getUsersList(
      (value) => {
        setUserList((prev) => prev.concat(value.data));
        setHasMore(value.details.hasMore);
        setPage((prev) => prev + 1);
        setLoading(false);
      },
      { page, emailString, roleId },
      () => {
        setLoading(false);
      }
    );
  };

  useEffect(() => {
    setUserList([]);
    setError(false);
    setEmailString("");
    setPage(1);
  }, [roleId]);

  return (
    <Stack padding={1} gap={1} sx={{ width: "100%" }}>
      <Stack direction={"row"} gap="20px">
        <TextField
          label="Найти пользователя (от 4 символов)"
          color="primary"
          value={emailString}
          onChange={(e) => setEmailString(e.target.value)}
        />
        <Button
          variant="high"
          disabled={emailString.length < 4}
          onClick={touristSearch}
        >
          Найти
        </Button>
      </Stack>

      {userList && userList.length > 0
        ? userList.map((item, index) => (
            <AdminComponent
              key={index}
              props={{ ...item, type: "user" }}
              arrayProps={userList}
            />
          ))
        : !hasMore &&
          loading && <CircularProgress sx={{ m: "0 auto", mt: "10px" }} />}
      {hasMore && loading ? (
        <CircularProgress sx={{ m: "0 auto", mt: "10px" }} />
      ) : (
        hasMore && (
          <Button onClick={loadMore} sx={{ m: "0 auto", mt: "10px" }}>
            Загрузить еще
          </Button>
        )
      )}
      {error && (
        <Typography
          variant="caption"
          color={redColor}
          sx={{ mt: "20px", textAlign: "center" }}
        >
          {errorMessage}
        </Typography>
      )}
    </Stack>
  );
};
