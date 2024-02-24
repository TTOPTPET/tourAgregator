import { Box, Skeleton } from "@mui/material";

function UserInfoFabricSkeleton() {
  return (
    <Box>
      <Box>
        <Skeleton
          animation="wave"
          variant="rounded"
          width="100%"
          height="50px"
          sx={{ borderRadius: "20px" }}
        />
      </Box>
      <Box className="skeleton-wrapper">
        <Box className="skeleton__content" sx={{ mt: "50px", display: "flex" }}>
          <Skeleton
            animation="wave"
            variant="circular"
            width="140px"
            height="140px"
          />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              ml: "30px",
            }}
          >
            <Box>
              <Skeleton
                animation="wave"
                variant="rounded"
                width="400px"
                height="30px"
              />
            </Box>
            <Box
              sx={{
                mt: "30px",
                display: "flex",
                flexDirection: "column",
                gap: "5px",
              }}
            >
              <Skeleton
                animation="wave"
                variant="rounded"
                width="550px"
                height="30px"
              />
              <Skeleton
                animation="wave"
                variant="rounded"
                width="550px"
                height="30px"
              />
              <Skeleton
                animation="wave"
                variant="rounded"
                width="550px"
                height="30px"
              />
              <Skeleton
                animation="wave"
                variant="rounded"
                width="550px"
                height="30px"
              />
              <Skeleton
                animation="wave"
                variant="rounded"
                width="550px"
                height="30px"
              />
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default UserInfoFabricSkeleton;
