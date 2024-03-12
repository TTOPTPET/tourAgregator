import { Stack, Skeleton, Typography, Box } from "@mui/material";

function CalendarSidebarSkeleton() {
  return (
    <Stack direction={"column"} height={"65vh"}>
      <Typography variant={"h5"}>Выберите размещенный тур</Typography>

      <Stack gap={"1vh"} mt={4}>
        <Skeleton
          variant="rounded"
          height={"6vh"}
          sx={{ borderRadius: "10px" }}
        />

        <Box sx={{ width: "100%", position: "relative" }}>
          <Skeleton
            variant="rounded"
            height={"30vh"}
            sx={{ borderRadius: "10px" }}
          />
          <Typography
            variant={"h4"}
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              textAlign: "center",
              transform: "translatey(-50%) translatex(-50%)",
              color: "rgba(0, 0, 0, 0.2)",
              textTransform: "uppercase",
            }}
          >
            Выберите тур
          </Typography>
        </Box>

        <Skeleton
          variant="rounded"
          height={"13vh"}
          sx={{ borderRadius: "10px" }}
        />

        <Skeleton
          variant="rounded"
          height={"13vh"}
          sx={{ borderRadius: "10px" }}
        />
      </Stack>
    </Stack>
  );
}

export default CalendarSidebarSkeleton;
