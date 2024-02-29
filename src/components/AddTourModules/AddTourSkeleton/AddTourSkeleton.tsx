import { Box, Grid, Skeleton } from "@mui/material";
import { Stack } from "@mui/system";

export const AddTourSkeleton = () => {
  return (
    <Stack gap={1} marginTop={2}>
      <Skeleton variant={"text"} sx={{ width: "45%", height: "70px" }} />
      <Grid container justifyContent={"space-between"}>
        <Grid item md={5.6}>
          <Skeleton
            variant={"rounded"}
            sx={{ width: "500px", height: "532px" }}
          />
          <Skeleton
            variant={"text"}
            sx={{ width: "93%", height: "20px", marginBottom: "1" }}
          />
          <Skeleton variant={"rounded"} sx={{ width: "93%", height: "50px" }} />
        </Grid>
        <Grid container item md={6}>
          <Grid item>
            <Skeleton
              variant={"rounded"}
              animation={"wave"}
              sx={{ width: "472px", height: "136px" }}
            />
          </Grid>
          <Grid container direction={"row"} marginTop={5} spacing={2}>
            <Grid item md={6}>
              <Skeleton
                variant={"text"}
                sx={{ width: "100%", height: "40px", marginBottom: "1" }}
              />
              <Skeleton
                variant={"rounded"}
                sx={{ width: "100%", height: "50px" }}
              />
              <Box marginTop={16}>
                <Skeleton
                  variant={"text"}
                  sx={{ width: "100%", height: "40px" }}
                />
              </Box>
              <Stack direction={"row"} marginTop={1} gap={2}>
                <Skeleton
                  variant={"rounded"}
                  animation={"wave"}
                  sx={{ width: "100%", height: "50px" }}
                />
                <Skeleton
                  variant={"rounded"}
                  animation={"wave"}
                  sx={{ width: "100%", height: "50px" }}
                />
              </Stack>
              <Skeleton
                variant={"text"}
                sx={{ width: "100%", height: "40px", marginTop: "2" }}
              />
              <Skeleton
                variant={"rounded"}
                sx={{ width: "100%", height: "50px", marginTop: "1" }}
              />
            </Grid>
            <Grid item md={5}>
              <Skeleton
                variant={"text"}
                sx={{ width: "100%", height: "40px" }}
              />
              <Skeleton
                variant={"rounded"}
                animation={"wave"}
                sx={{ width: "100%", height: "365px" }}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Stack>
  );
};
