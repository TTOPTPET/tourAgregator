import { Stack, Typography } from "@mui/material";
import { ITourInfo } from "../../../models/tourModels/ITourInfo";

interface TourFirstPageProps {
  tourInfo: ITourInfo;
}

export default function TourCreatorInfo({ tourInfo }: TourFirstPageProps) {
  return (
    <Stack
      direction={"row"}
      gap={{ lg: "20px", xs: "10px" }}
      alignItems={"center"}
    >
      <Typography variant={"button"}>
        {tourInfo?.creatorName
          ? `${tourInfo?.creatorName}`
          : "ФИО туросоздателя"}
      </Typography>
    </Stack>
  );
}
