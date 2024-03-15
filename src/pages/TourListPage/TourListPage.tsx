import {
  Button,
  Chip,
  Grid,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setModalActive } from "../../redux/Modal/ModalReducer";
import { BasicFilter, ComplexFilter } from "../../components/TourList";
import { IFilter } from "../../models/tourListModels/IFilter";
import { ISearchRequest } from "../../models/tourListModels/ISearchRequest";
import { getToursSorted } from "../../API/tourListAPI/searchAPI/searchAPI";
import { ITourResponse } from "../../models/tourCardModel/ITour";
import TourCard from "../../components/TourCard/TourCard";
import { useSearchParams } from "react-router-dom";
import { ChipLabelType } from "../../components/TourList/getChipLabels";
import TourListSkeleton from "./TourListSkeleton/TourListSkeleton";
import { ICatalog } from "../../models/tourListModels/ICatalog";
import { RootState } from "../../redux/store";

const filterDefault: IFilter = {
  regions: [],
  category: [],
  complexity: [],
  maxPrice: 20000000,
};

function TourListPage() {
  const [searchParam] = useSearchParams();
  const [filters, setFilters] = useState<IFilter>(filterDefault);
  const [tourList, setTourList] = useState<ITourResponse[]>([]);
  const [searchData, setSearchData] = useState<ISearchRequest>({
    complexity: [],
    category: [],
    searchParam: searchParam.get("title") as string,
  });
  const [filtersLabels, setFiltersLabels] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  const dispatch = useDispatch();

  const theme = useTheme();

  const moreThanSmall = useMediaQuery(theme.breakpoints.up("sm"));
  const lessThenSmall = useMediaQuery(theme.breakpoints.down("sm"));

  const complexity: ICatalog[] = useSelector(
    (state: RootState) => state?.catalogs?.complexity as ICatalog[]
  );

  const country: ICatalog[] = useSelector(
    (state: RootState) => state?.catalogs?.country as ICatalog[]
  );

  const category: ICatalog[] = useSelector(
    (state: RootState) => state?.catalogs?.category as ICatalog[]
  );

  const clearSearchField = (key: keyof ISearchRequest, value: string) => {
    const searchValue = searchData[key];
    if (searchValue instanceof Array) {
      setSearchData({
        ...searchData,
        [key]: [],
      });
    } else if (key === "prices" || key === "recommendedAge") {
      setSearchData({
        ...searchData,
        [key]: null,
      });
    } else {
      setSearchData({
        ...searchData,
        [key]: null,
      });
    }
    setFiltersLabels([...filtersLabels.filter((item) => item !== value)]);
  };

  const handlerDeleteLabel = (value: string) => {
    const chipLabelTypeIndex = Object.values(ChipLabelType).indexOf(
      value as ChipLabelType
    );
    if (chipLabelTypeIndex !== -1) {
      const searchKey = Object.keys(ChipLabelType)[chipLabelTypeIndex];
      console.log(searchKey);
      clearSearchField(searchKey as keyof ISearchRequest, value);
    } else {
      const searchDataKeys = Object.keys(searchData);
      Object.values(searchData).forEach((item, key) => {
        if (typeof item === "string") {
          if (item === value) {
            clearSearchField(
              searchDataKeys[key] as keyof ISearchRequest,
              value
            );
          }
        } else if (item instanceof Array) {
          if (item.indexOf(value) !== -1) {
            clearSearchField(
              searchDataKeys[key] as keyof ISearchRequest,
              value
            );
          }
        }
      });
    }
  };

  useEffect(() => {
    setPage(1);
    setLoading(true);
    getToursSorted(
      (search) => {
        setTourList(search.data);
        setLoading(false);
      },
      searchData,
      { page },
      () => {
        setLoading(false);
      }
    );
  }, [filtersLabels]);

  useEffect(() => {
    setFilters((filters) => ({
      ...filters,
      regions: country,
      complexity: complexity,
      category: category,
    }));
  }, []);

  useEffect(() => {
    setPage(1);
    setSearchData({
      ...searchData,
      searchParam: searchParam.get("title") as string,
    });
    getToursSorted(
      (search) => setTourList(search.data),
      { ...searchData, searchParam: searchParam.get("title") as string },
      { page },
      undefined
    );
  }, [searchParam.get("title")]);

  return (
    <Stack gap={1}>
      <Grid
        container
        justifyContent={"space-between"}
        alignItems={"center"}
        sx={{ mb: { lg: "50px", md: "30px", sm: "20px", xs: "10px" } }}
      >
        <Grid item md={8}>
          <Typography variant={moreThanSmall ? "h3" : "h4"}>
            Все туры
          </Typography>
        </Grid>
        <Grid item md={4}>
          <Stack direction={"row"} justifyContent={"right"}>
            <Button
              variant={"textButton"}
              onClick={() => dispatch(setModalActive("filterModal"))}
            >
              Фильтры
            </Button>
          </Stack>
        </Grid>
      </Grid>

      <BasicFilter
        filters={filters}
        searchData={searchData}
        setSearchData={setSearchData}
        filtersLabels={filtersLabels}
        setFiltersLabels={setFiltersLabels}
      />
      <Stack
        direction={"row"}
        flexWrap={"wrap"}
        gap={{ lg: "15px", md: "10px", xs: "6px" }}
        sx={lessThenSmall ? { width: "220px", m: "0 auto" } : null}
      >
        {filtersLabels.map((item, index) => (
          <Chip
            key={index}
            variant={"outlined"}
            label={item}
            onDelete={() => handlerDeleteLabel(item)}
          />
        ))}
      </Stack>
      <ComplexFilter
        filters={filters}
        searchData={searchData}
        setSearchData={setSearchData}
        filtersLabels={filtersLabels}
        setFiltersLabels={setFiltersLabels}
      />
      <Grid
        container
        spacing={2}
        justifyContent={{ sm: "flex-start", xs: "center" }}
        marginTop={1}
      >
        {loading ? (
          <TourListSkeleton />
        ) : (
          tourList &&
          tourList.length > 0 &&
          tourList.map((tour, index) => (
            <Grid key={index} item lg={3} md={3} sm={4}>
              <TourCard key={index} tour={tour} tourCardType={"tourList"} />
            </Grid>
          ))
        )}
      </Grid>
    </Stack>
  );
}

export default TourListPage;
