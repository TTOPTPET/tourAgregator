import { Dispatch, FC, SetStateAction } from "react";
import { IStatisticSearch } from "../../../models/statisticModels/IStatisticSearch";
import { Button, Stack, TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import { IStatistic } from "../../../models/statisticModels/IStatistic";
import getStatistic from "../../../API/statisticAPI/getStatistic";

interface IStatisticSearchProps {
  statisticSearch: IStatisticSearch;
  setStatisticSearch: Dispatch<SetStateAction<IStatisticSearch>>;
  setStatistic: Dispatch<SetStateAction<IStatistic[]>>;
}

const StatisticSearch: FC<IStatisticSearchProps> = ({
  statisticSearch,
  setStatisticSearch,
  setStatistic,
}) => {
  const handlerChangeSearchField = (
    type: keyof IStatisticSearch,
    value: Dayjs
  ) => {
    const stringDate = value ? value.toISOString() : "";
    setStatisticSearch({ ...statisticSearch, [type]: stringDate });
  };

  const handlerSearchClick = () => {
    getStatistic(statisticSearch, (value) => setStatistic(value), undefined);
  };

  return (
    <Stack direction={"row"} columnGap={5}>
      <DatePicker
        label="Дата начала"
        value={dayjs(statisticSearch?.dateFrom || "")}
        onChange={(newValue) =>
          handlerChangeSearchField("dateFrom", newValue as Dayjs)
        }
        slotProps={{
          textField: (props: any) => ({
            ...props,
            error: props.error && props.inputProps.value !== "",
            inputProps: { ...props.inputProps, placeholder: "" },
          }),
        }}
      />
      <DatePicker
        label="Дата конца"
        value={dayjs(statisticSearch?.dateTo || "")}
        onChange={(newValue) =>
          handlerChangeSearchField("dateTo", newValue as Dayjs)
        }
        slotProps={{
          textField: (props: any) => ({
            ...props,
            error: props.error && props.inputProps.value !== "",
            inputProps: { ...props.inputProps, placeholder: "" },
          }),
        }}
      />
      <Button variant="high" onClick={handlerSearchClick}>
        Найти
      </Button>
    </Stack>
  );
};

export default StatisticSearch;
