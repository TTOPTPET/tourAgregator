import { useEffect, useState } from "react";
import { IUserMessage } from "../../../models/adminModels/IUsersMessage";
import { getClaimsList } from "../../../API/adminAPI";
import { Button, CircularProgress, Stack, Typography } from "@mui/material";
import { AdminComponent } from "../../../components/Admin/AdminFabric/AdminFabric";

export const AdminClaimsPage = () => {
  const [userClaims, setUserClaims] = useState<IUserMessage[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setPage(1);
    setLoading(true);
    getClaimsList(
      (value) => {
        setUserClaims(value.data);
        setHasMore(value.details.hasMore);
        setPage((prev) => prev + 1);
        setLoading(false);
      },
      { page },
      () => {
        setLoading(false);
      }
    );
  }, []);

  const loadMore = () => {
    setLoading(true);
    getClaimsList(
      (value) => {
        setUserClaims((prev) => prev.concat(value.data));
        setHasMore(value.details.hasMore);
        setPage((prev) => prev + 1);
        setLoading(false);
      },
      { page },
      () => {
        setLoading(false);
      }
    );
  };

  return (
    <Stack padding={1} gap={1}>
      {userClaims && userClaims.length > 0
        ? userClaims.map((item, index) => (
            <AdminComponent
              key={index}
              props={{ ...item, type: "message" }}
              arrayProps={userClaims}
              setArrayProps={setUserClaims}
            />
          ))
        : !hasMore &&
          (loading ? (
            <CircularProgress sx={{ m: "0 auto", mt: "10px" }} />
          ) : (
            <Typography
              variant="caption"
              sx={{ mt: "20px", textAlign: "center" }}
            >
              Нет обращений
            </Typography>
          ))}
      {hasMore && loading ? (
        <CircularProgress sx={{ m: "0 auto", mt: "10px" }} />
      ) : (
        hasMore && (
          <Button onClick={loadMore} sx={{ m: "0 auto", mt: "10px" }}>
            Загрузить еще
          </Button>
        )
      )}
    </Stack>
  );
};
