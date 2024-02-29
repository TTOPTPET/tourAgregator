import { Paper, Stack, SvgIcon, Typography } from "@mui/material";
import AttentionIcon from "../../media/Attention.svg?react";

type Props = { text: string; style?: React.CSSProperties };

export const Attention = ({ text, style }: Props) => {
  return (
    <Paper elevation={5} sx={style}>
      <Stack gap={4} direction={"row"} alignItems={"center"}>
        <SvgIcon viewBox="0 0 33.33 33.33" fontSize="large">
          <AttentionIcon />
        </SvgIcon>
        <Typography variant="caption">{text}</Typography>
      </Stack>
    </Paper>
  );
};
