import { FC, useState } from "react";
import { IStatistic } from "../../../models/statisticModels/IStatistic";
import {
  Collapse,
  IconButton,
  TableCell,
  TableRow,
  Stack,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

interface IStatisticItemProps {
  statistic: IStatistic;
}

const StatisticItem: FC<IStatisticItemProps> = ({ statistic }) => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <>
      <TableRow>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell>{statistic?.tourName || "Название тура"}</TableCell>
        <TableCell>{statistic?.tourAmount / 100 || 0}</TableCell>
        <TableCell>{statistic?.touristsAmount || 0}</TableCell>
      </TableRow>
    </>
  );
};

export default StatisticItem;
