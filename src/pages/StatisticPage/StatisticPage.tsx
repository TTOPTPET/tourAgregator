import { useEffect, useState } from "react";
import { Box, CircularProgress, Typography } from "@mui/material";
import {
  StatisticItem,
  StatisticSearch,
  StatisticTable,
} from "../../components/StatisticModules";
import { IStatistic } from "../../models/statisticModels/IStatistic";
import getStatistic from "../../API/statisticAPI/getStatistic";
import { IStatisticSearch } from "../../models/statisticModels/IStatisticSearch";
import dayjs from "dayjs";

function StatisticPage() {
  const [statistic, setStatistic] = useState<IStatistic[]>([]);
  const [statisticSearch, setStatisticSearch] = useState<IStatisticSearch>({
    dateFrom: dayjs(new Date()).date(1).toISOString(),
    dateTo: dayjs(new Date()).toISOString(),
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getStatistic(
      statisticSearch,
      (value) => {
        setStatistic(value);
        setLoading(false);
      },
      () => {
        setLoading(false);
      }
    );
  }, []);

  return (
    <Box>
      <Typography variant={"h3"} mb={5}>
        Статистика
      </Typography>
      <StatisticSearch
        statisticSearch={statisticSearch}
        setStatisticSearch={setStatisticSearch}
        setStatistic={setStatistic}
      />
      {loading ? (
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            mt: "40px",
          }}
        >
          <CircularProgress size={"80px"} />
        </Box>
      ) : (
        <StatisticTable>
          {statistic &&
            statistic.map((item, index) => (
              <StatisticItem key={index} statistic={item} />
            ))}
        </StatisticTable>
      )}
    </Box>
  );
}

export default StatisticPage;
