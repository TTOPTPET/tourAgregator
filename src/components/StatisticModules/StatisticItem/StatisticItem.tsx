import { IStatistic } from "../../../models/statisticModels/IStatistic";
import { TableCell, TableRow } from "@mui/material";

interface IStatisticItemProps {
  statistic: IStatistic;
}

const StatisticItem = ({ statistic }: IStatisticItemProps) => {
  return (
    <>
      <TableRow>
        <TableCell></TableCell>
        <TableCell>{statistic?.tourName || "Название тура"}</TableCell>
        <TableCell>
          {String(statistic?.tourAmount / 100).replace(
            /\B(?=(\d{3})+(?!\d))/g,
            " "
          ) || 0}{" "}
          ₽
        </TableCell>
        <TableCell>{statistic?.touristsAmount || 0}</TableCell>
      </TableRow>
    </>
  );
};

export default StatisticItem;
