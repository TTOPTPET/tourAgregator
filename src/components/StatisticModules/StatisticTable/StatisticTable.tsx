import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

const StatisticTable = ({ children }: { children: JSX.Element[] }) => {
  return (
    <TableContainer
      sx={{
        marginTop: 5,
        border: "1px solid rgba(224, 224, 224, 1)",
        borderRadius: 5,
        boxShadow:
          "0px 1px 1px rgba(0, 0, 0, 0.2), 0px 2px 2px rgba(0, 0, 0, 0.14), 0px 1px 5px rgba(0, 0, 0, 0.12);",
        overflowX: "hidden",
      }}
    >
      <Table>
        <TableHead>
          <TableRow>
            <TableCell style={{ fontWeight: "bold" }} />
            <TableCell style={{ fontWeight: "bold" }}>Тур</TableCell>
            <TableCell style={{ fontWeight: "bold" }}>Статус</TableCell>
            <TableCell style={{ fontWeight: "bold" }}>Доход</TableCell>
            <TableCell style={{ fontWeight: "bold" }}>
              Количество человек
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>{children}</TableBody>
      </Table>
    </TableContainer>
  );
};

export default StatisticTable;
