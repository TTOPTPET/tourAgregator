import { FC } from "react";
import { Bar } from "react-chartjs-2";
import { registerables, Chart } from "chart.js";
import {
  lightTurquoiseColor,
  darkTurquoiseColor,
} from "../../../../config/MUI/color/color";
import { Box, Stack, Typography } from "@mui/material";

Chart.register(...registerables);

// const plugin = {
//   id: "customCanvasBackgroundColor",
//   beforeDraw: (chart, args, options) => {
//     const { ctx } = chart;
//     ctx.save();
//     ctx.globalCompositeOperation = "destination-over";
//     ctx.fillStyle = options.color || "#99ffff";
//     ctx.fillRect(0, 0, chart.width, chart.height);
//     ctx.restore();
//   },
// };

// Chart.register(plugin);

interface IStatisticDiagramProps {
  stat: {
    name?: string;
    labels?: string[];
    data?: number[];
    units?: string;
  };
}

const StatisticDiagram: FC<IStatisticDiagramProps> = ({ stat }) => {
  return (
    <Stack
      textAlign={"center"}
      direction={"column"}
      width={"40%"}
      minWidth={"400px"}
    >
      <Typography variant="h6" padding={2}>
        {stat?.name || ""}
      </Typography>
      <Box bgcolor={lightTurquoiseColor} padding={5} borderRadius={10}>
        <Bar
          width={130}
          height={50}
          data={{
            labels: stat.labels,
            datasets: [{ data: stat.data }],
          }}
          options={{
            backgroundColor: darkTurquoiseColor,
            scales: {
              y: {
                ticks: {
                  callback: (value) => `${value}${stat?.units || ""}`,
                },
                border: {
                  display: false,
                },
                position: "right",
                grid: {
                  display: false,
                },
              },
              x: {
                grid: {
                  display: false,
                },
                border: {
                  display: false,
                },
              },
            },
            plugins: {
              legend: {
                display: false,
              },
              tooltip: {
                callbacks: {
                  label: (value) => ` ${value.raw}${"%"}`,
                },
              },
            },
          }}
        />
      </Box>
    </Stack>
  );
};

export default StatisticDiagram;
