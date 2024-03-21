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
import { useNavigate, useSearchParams } from "react-router-dom";
import getChipLabels, {
  ChipLabelType,
} from "../../components/TourList/getChipLabels";
import TourListSkeleton from "./TourListSkeleton/TourListSkeleton";
import { Catalog, ICatalog } from "../../models/tourListModels/ICatalog";
import { RootState } from "../../redux/store";
import { getCatalog } from "../../API/tourListAPI/filterAPI/filterAPI";

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
    searchParam: "",
  });
  const [filtersLabels, setFiltersLabels] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);

  const dispatch = useDispatch();

  const theme = useTheme();

  const navigate = useNavigate();

  const moreThanSmall = useMediaQuery(theme.breakpoints.up("sm"));
  const lessThenSmall = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    getCatalog(
      Catalog.country,
      (value) => {
        setFilters((filters) => ({
          ...filters,
          regions: value,
        }));
      },
      () => {}
    );
    getCatalog(
      Catalog.complexity,
      (value) => {
        setFilters((filters) => ({
          ...filters,
          complexity: value,
        }));
      },
      () => {}
    );
    getCatalog(
      Catalog.category,
      (value) => {
        setFilters((filters) => ({
          ...filters,
          category: value,
        }));
      },
      () => {}
    );
  }, []);

  const clearSearchField = (key: keyof ISearchRequest, value: string) => {
    const searchValue = searchData[key];
    if (searchValue instanceof Array) {
      setSearchData({
        ...searchData,
        [key]: [],
      });
    } else if (key === "prices" || key === "age") {
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
      if (searchKey === "searchParam") {
        searchParam.set("title", "");
        navigate(`/`);
      }
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
    setLoading(true);
    setPage(1);
    getToursSorted(
      searchData,
      { page: 1 },
      (search) => {
        setTourList(search.data);
        setLoading(false);
        setHasMore(search?.details?.hasMore!);
        setPage((prev) => prev + 1);
      },
      () => {
        setLoading(false);
      }
    );
  }, [filtersLabels]);

  const loadMore = () => {
    getToursSorted(
      searchData,
      { page },
      (search) => {
        setTourList((prev) => prev.concat(search.data));
        setLoading(false);
        setHasMore(search?.details?.hasMore!);
        setPage((prev) => prev + 1);
      },
      () => {
        setLoading(false);
      }
    );
  };

  useEffect(() => {
    if (!!searchParam.get("title")) {
      setSearchData({
        ...searchData,
        searchParam: searchParam.get("title") as string,
      });
    }
  }, [searchParam.get("title")]);

  useEffect(() => {
    if (searchData.searchParam) {
      setFiltersLabels(getChipLabels(searchData));
    }
  }, [searchData.searchParam]);

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
      {hasMore && (
        <Button onClick={loadMore} sx={{ m: "0 auto", mt: "10px" }}>
          Загрузить еще
        </Button>
      )}
    </Stack>
  );
}

export default TourListPage;
