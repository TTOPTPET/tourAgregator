import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogContent,
  FormControlLabel,
  Grid,
  Slider,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  isModalActive,
  setModalInactive,
} from "../../../redux/Modal/ModalReducer";
import { RootState } from "../../../redux/store";
import { IFilterProps } from "../FilterTypes/IFilterProps";
import { ISearchRequest } from "../../../models/tourListModels/ISearchRequest";
import getChipLabels from "../getChipLabels";
import dayjs from "dayjs";

export const ComplexFilter = ({
  filters,
  searchData,
  setSearchData,
  setFiltersLabels,
}: IFilterProps) => {
  const theme = useTheme();

  const lessThenSmall = useMediaQuery(theme.breakpoints.down("sm"));
  const lessThenMid = useMediaQuery(theme.breakpoints.down("md"));

  const { maxPrice, category, complexity } = filters;
  const activeModals = useSelector(
    (state: RootState) => state.modal.activeModals
  );
  const dispatch = useDispatch();

  const handleCategoryChange = (e: any) => {
    if (
      searchData?.category &&
      searchData?.category.indexOf(e.target.value) === -1
    ) {
      setSearchData({
        ...searchData,
        category: [...searchData?.category, e.target.value],
      });
    } else {
      setSearchData({
        ...searchData,
        category: [
          ...searchData?.category!.filter((item) => item !== e.target.value),
        ],
      });
    }
  };

  const handleComplexityChange = (e: any) => {
    if (
      searchData?.complexity &&
      searchData?.complexity.indexOf(e.target.value) === -1
    ) {
      setSearchData({
        ...searchData,
        complexity: [...searchData?.complexity, e.target.value],
      });
    } else {
      setSearchData({
        ...searchData,
        complexity: [
          ...searchData?.complexity!.filter((item) => item !== e.target.value),
        ],
      });
    }
  };

  const handleChangeField = (key: keyof ISearchRequest, e: number[]) => {
    let numbers = Object.values(e);
    setSearchData({
      ...searchData,
      [key]: {
        min: key === "prices" ? numbers[0] * 100 : numbers[0],
        max: key === "prices" ? numbers[1] * 100 : numbers[1],
      },
    });
  };

  const handlerConfirmClick = () => {
    setFiltersLabels(getChipLabels(searchData));
    dispatch(setModalInactive("filterModal"));
  };

  const handlerClearClick = () => {
    setSearchData({
      searchParam: searchData.searchParam,
      region: searchData.region,
      tourdate: searchData.tourdate,
      maxPersonNumber: searchData.maxPersonNumber,
      category: [],
      complexity: [],
    });
    setSliderInputValue([0, maxPrice / 100]);
  };

  const marks = [
    {
      value: 0,
      label: 0,
    },
    {
      value: maxPrice / 100,
      label: maxPrice / 100,
    },
  ];

  const age = [
    {
      value: 0,
      label: 0,
    },
    {
      value: 120,
      label: 120,
    },
  ];

  const [sliderInputValue, setSliderInputValue] = useState(
    searchData?.prices
      ? [
          searchData?.prices?.min && searchData?.prices?.min / 100,
          searchData?.prices?.max && searchData?.prices?.max / 100,
        ]
      : [0, maxPrice / 100]
  );

  useEffect(() => {
    searchData?.prices
      ? setSliderInputValue((curValue) => [curValue[0], curValue[1]])
      : setSliderInputValue([0, maxPrice / 100]);
  }, [searchData?.prices]);

  return (
    <Dialog
      className="filters"
      onClose={() => dispatch(setModalInactive("filterModal"))}
      open={isModalActive("filterModal", activeModals)}
      fullWidth
      maxWidth={"md"}
    >
      <DialogContent sx={{ p: lessThenSmall ? "0px" : "20px 24px" }}>
        <Grid
          container
          item
          direction={lessThenSmall ? "column" : "row"}
          width={lessThenSmall ? "60%" : "100%"}
          justifyContent={"space-between"}
        >
          <Grid item sm={4}>
            <Typography variant={"h5"}>Категория тура</Typography>
            <Box
              sx={{
                m: lessThenMid ? "7px 0" : "0px 0",
                display: "flex",
                flexDirection: "column",
              }}
            >
              {category.map((category) => (
                <FormControlLabel
                  key={category.code}
                  value={category.code}
                  control={
                    <Checkbox
                      checked={
                        searchData.category &&
                        searchData.category.indexOf(category.code) !== -1
                          ? true
                          : false
                      }
                    />
                  }
                  label={category.name}
                  onChange={(e) => {
                    handleCategoryChange(e);
                  }}
                />
              ))}
            </Box>
            <Typography variant={"h5"} marginTop={lessThenSmall ? 0 : 5}>
              Стоимость
            </Typography>
            <Slider
              max={maxPrice / 100}
              marks={marks}
              value={sliderInputValue}
              onChange={(e, value) => {
                handleChangeField("prices", value as number[]);
                setSliderInputValue(value as number[]);
              }}
              valueLabelDisplay="auto"
              sx={{ ml: "15px" }}
            />
          </Grid>
          <Grid item sm={5}>
            <Typography variant={"h5"}>Сложность маршрута</Typography>
            <Box
              sx={{
                m: lessThenMid ? "7px 0" : "0px 0",
                display: "flex",
                flexDirection: "column",
              }}
            >
              {complexity.map((complexity) => (
                <FormControlLabel
                  key={complexity.code}
                  value={complexity.code}
                  control={
                    <Checkbox
                      checked={
                        searchData.complexity &&
                        searchData.complexity.indexOf(complexity.code) !== -1
                          ? true
                          : false
                      }
                    />
                  }
                  label={complexity.name}
                  onChange={(e) => {
                    handleComplexityChange(e);
                  }}
                />
              ))}
            </Box>
            <Typography variant={"h5"} marginTop={lessThenSmall ? 0 : 5}>
              Рекомендуемый возраст
            </Typography>
            <Slider
              max={120}
              marks={age}
              value={
                searchData?.age
                  ? [searchData?.age?.min, searchData?.age?.max]
                  : [0, 120]
              }
              onChange={(_, value) =>
                handleChangeField("age", value as number[])
              }
              valueLabelDisplay="auto"
              sx={{ ml: "15px", width: "85%" }}
            />
          </Grid>
        </Grid>
        <Stack direction={"row"} justifyContent={"end"} marginTop={4} gap={1}>
          <Button
            onClick={handlerConfirmClick}
            disabled={
              (searchData?.tourdate?.dateFrom &&
                searchData?.tourdate?.dateTo &&
                dayjs(searchData?.tourdate?.dateFrom).isAfter(
                  dayjs(searchData?.tourdate?.dateTo)
                )) ||
              (!searchData?.tourdate?.dateFrom &&
                !!searchData?.tourdate?.dateTo) ||
              (!!searchData?.tourdate?.dateFrom &&
                !searchData?.tourdate?.dateTo)
            }
          >
            Применить
          </Button>
          <Button onClick={handlerClearClick}>Сбросить</Button>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};
