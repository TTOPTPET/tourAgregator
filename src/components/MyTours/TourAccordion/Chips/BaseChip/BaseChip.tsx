import { Paper, Stack, SvgIcon, Typography } from "@mui/material";
import Attention from "../../../../../media/Attention.svg?react";
import { whiteColor } from "../../../../../config/MUI/color/color";
import "./BaseChip.css";

interface IBaseChipProps {
  refund?: boolean;
  touristCancelled?: boolean;
  consideration?: boolean;
}

const BaseChip = ({
  refund,
  touristCancelled,
  consideration,
}: IBaseChipProps) => {
  return (
    <Paper
      color={whiteColor}
      elevation={0}
      sx={{ padding: "4px", width: "max-content", display: "flex" }}
    >
      <Stack
        direction={"row"}
        sx={{ alignItems: "center" }}
        ml={"2px"}
        mr={"4px"}
      >
        <SvgIcon viewBox="0 0 24 24" fontSize="small" sx={{ marginTop: "2px" }}>
          <Attention
            width={20}
            height={20}
            className={
              refund || touristCancelled ? "yellow-attention" : undefined
            }
          />
        </SvgIcon>
        <Typography variant={"caption"}>
          {refund
            ? "Деньги возвращены"
            : touristCancelled
              ? "Ожидается возврат средств"
              : consideration
                ? "Жалоба рассматривается"
                : "Тур был отменен"}
        </Typography>
      </Stack>
    </Paper>
  );
};

export default BaseChip;
