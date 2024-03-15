import { Grid, Skeleton, useMediaQuery, useTheme } from "@mui/material";

function TourListSkeleton() {
  const theme = useTheme();

  const moreThenMid = useMediaQuery(theme.breakpoints.up("md"));
  const moreThenSmall = useMediaQuery(theme.breakpoints.up("sm"));
  return (
    <>
      <Grid item lg={3} md={3} sm={4}>
        <Skeleton
          variant="rounded"
          animation="wave"
          sx={{
            borderRadius: "30px",
            width: { xs: 220, sm: 180, md: 205, lg: 280 },
            height: { xs: 330, sm: 270, md: 310, lg: 420 },
          }}
        />
      </Grid>
      {moreThenSmall && (
        <Grid item lg={3} md={3} sm={4}>
          <Skeleton
            variant="rounded"
            animation="wave"
            sx={{
              borderRadius: "30px",
              width: { xs: 220, sm: 180, md: 205, lg: 280 },
              height: { xs: 330, sm: 270, md: 310, lg: 420 },
            }}
          />
        </Grid>
      )}
      {moreThenSmall && (
        <Grid item lg={3} md={3} sm={4}>
          <Skeleton
            variant="rounded"
            animation="wave"
            sx={{
              borderRadius: "30px",
              width: { xs: 220, sm: 180, md: 205, lg: 280 },
              height: { xs: 330, sm: 270, md: 310, lg: 420 },
            }}
          />
        </Grid>
      )}
      {moreThenSmall && moreThenMid && (
        <Grid item lg={3} md={3}>
          <Skeleton
            variant="rounded"
            animation="wave"
            sx={{
              borderRadius: "30px",
              width: { md: 205, lg: 280 },
              height: { md: 310, lg: 420 },
            }}
          />
        </Grid>
      )}
    </>
  );
}

export default TourListSkeleton;
