import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { IFilterProps } from "../FilterTypes/IFilterProps";
import { ISearchRequest } from "../../../models/tourListModels/ISearchRequest";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "dayjs/locale/ru";
import {
  DatePicker,
  LocalizationProvider,
  PickersLocaleText,
} from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import getChipLabels from "../getChipLabels";

export const BasicFilter = ({
  filters,
  searchData,
  setSearchData,
  setFiltersLabels,
}: IFilterProps) => {
  const { regions } = filters;

  const theme = useTheme();

  const lessThanMedium = useMediaQuery(theme.breakpoints.down("md"));

  const moreThenSmall = useMediaQuery(theme.breakpoints.up("sm"));

  const handleFieldChange = <T extends any>(
    key: keyof ISearchRequest,
    e: T
  ) => {
    setSearchData({ ...searchData, [key]: e });
  };

  const handleDateChange = (type: "from" | "to", value: Dayjs | null) => {
    try {
      const stringDate = value && value.toISOString();
      switch (type) {
        case "from": {
          setSearchData({
            ...searchData,
            tourdate: {
              ...searchData.tourdate,
              dateFrom: stringDate as string,
            },
          });
          break;
        }
        case "to": {
          setSearchData({
            ...searchData,
            tourdate: { ...searchData.tourdate, dateTo: stringDate as string },
          });
          break;
        }
        default:
          break;
      }
    } catch (error) {
      console.log("invalid Data format");
    }
  };

  const handlerSearchClick = () => {
    setFiltersLabels(getChipLabels(searchData));
  };

  const customRuRULocaleText: Partial<PickersLocaleText<any>> = {
    okButtonLabel: "Принять",
    cancelButtonLabel: "Отмена",
  };

  return (
    <Stack
      direction={lessThanMedium ? "column" : "row"}
      gap={1}
      alignItems={lessThanMedium && moreThenSmall ? "center" : "end"}
      width={{ sm: "100%", xs: "220px" }}
      margin={"0 auto"}
    >
      <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-standard-label">Регион</InputLabel>
        <Select
          value={searchData?.region || ""}
          onChange={(e) => {
            setSearchData({
              ...searchData,
              region: String(e.target.value),
            });
          }}
          label="Регион"
        >
          <MenuItem value="">
            <em>-</em>
          </MenuItem>
          {regions.map((region) => {
            return (
              <MenuItem key={region.code} value={region.code}>
                {region.name}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
      <LocalizationProvider
        dateAdapter={AdapterDayjs}
        localeText={customRuRULocaleText}
        adapterLocale="ru"
      >
        <DatePicker
          label="Дата заезда"
          value={
            searchData?.tourdate?.dateFrom
              ? dayjs(searchData?.tourdate?.dateFrom ?? "")
              : null
          }
          onChange={(newValue) => handleDateChange("from", newValue as Dayjs)}
          slotProps={{
            textField: (props: any) => ({
              color: "primary",
              error:
                (props.error && props.inputProps.value !== "") ||
                (searchData?.tourdate?.dateTo &&
                  dayjs(searchData?.tourdate?.dateFrom).isAfter(
                    dayjs(searchData?.tourdate?.dateTo)
                  )) ||
                (!searchData?.tourdate?.dateFrom &&
                  searchData?.tourdate?.dateTo),
              ...props,
              inputProps: { ...props.inputProps, placeholder: "" },
            }),
          }}
        />
        <DatePicker
          label="Дата выезда"
          value={
            searchData?.tourdate?.dateTo
              ? dayjs(searchData?.tourdate?.dateTo ?? "")
                  .subtract(23, "h")
                  .subtract(59, "m")
                  .subtract(59, "s")
              : null
          }
          onChange={(newValue) =>
            handleDateChange(
              "to",
              newValue && newValue.add(23, "h").add(59, "m").add(59, "s")
            )
          }
          slotProps={{
            textField: (props: any) => ({
              color: "primary",
              error:
                (props.error && props.inputProps.value !== "") ||
                (searchData?.tourdate?.dateFrom &&
                  dayjs(searchData?.tourdate?.dateFrom).isAfter(
                    dayjs(searchData?.tourdate?.dateTo)
                  )),
              ...props,
              inputProps: { ...props.inputProps, placeholder: "" },
            }),
          }}
        />
      </LocalizationProvider>
      <TextField
        type={"number"}
        InputProps={{ inputProps: { min: 0 } }}
        value={!searchData?.maxPersonNumber ? "" : searchData?.maxPersonNumber}
        onChange={(e) =>
          handleFieldChange<number>("maxPersonNumber", +e.target.value)
        }
        label={"Количество человек"}
      />
      <Button
        variant="high"
        onClick={handlerSearchClick}
        sx={{ width: lessThanMedium && moreThenSmall ? "160px" : "" }}
        disabled={
          (searchData?.tourdate?.dateFrom &&
            searchData?.tourdate?.dateTo &&
            dayjs(searchData?.tourdate?.dateFrom).isAfter(
              dayjs(searchData?.tourdate?.dateTo)
            )) ||
          (!searchData?.tourdate?.dateFrom && !!searchData?.tourdate?.dateTo) ||
          (!!searchData?.tourdate?.dateFrom && !searchData?.tourdate?.dateTo)
        }
      >
        Найти
      </Button>
    </Stack>
  );
};
