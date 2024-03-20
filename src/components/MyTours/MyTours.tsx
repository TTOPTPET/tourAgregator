import {
  Stack,
  Typography,
  Tabs,
  Tab,
  useTheme,
  useMediaQuery,
  Box,
  CircularProgress,
} from "@mui/material";
import { SyntheticEvent, useEffect, useState } from "react";
import { IUserRecord } from "../../models/userModels/IUserRecord";
import { getTouristRecords } from "../../API/touristAPI/getTouristRecords";
import { TourAccordion } from "./TourAccordion/TourAccordion";
import ErrorBookingModal from "../Modals/ErrorBookingModal/ErrorBookingModal";
import ConfirmCancelBooking from "../Modals/ConfirmCancelBooking/ConfirmCancelBooking";
import SuccessCancelBooking from "../Modals/SuccessCancelBooking/SuccessCancelBooking";

enum tabValues {
  upcomming,
  past,
}

export const MyTours = () => {
  const [records, setRecords] = useState<IUserRecord[]>([]);
  const [tabValue, setTabValue] = useState<tabValues>(tabValues.upcomming);
  const [loading, setLoading] = useState(false);

  const weights = [
    "successPay",
    "waitPay",
    "failPay",
    "waitReturn",
    "failReturn",
    "successReturn",
  ].reverse();

  const [sortedByDateRecords, setSortedByDateRecords] = useState<IUserRecord[]>(
    []
  );
  console.log(records);
  useEffect(() => {
    const sortedRecords =
      records && records.sort((a, b) => (a.dateFrom > b.dateFrom ? 1 : -1));
    setSortedByDateRecords(sortedRecords);
  }, [records]);

  const theme = useTheme();

  const lessThenSmall = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    switch (tabValue) {
      case tabValues.past: {
        filterRecords(true);
        break;
      }
      case tabValues.upcomming: {
        filterRecords(false);
        break;
      }
      default: {
        break;
      }
    }
  }, [tabValue]);

  const filterRecords = (isFinished: boolean) => {
    setLoading(true);
    getTouristRecords(
      { isFinished },
      (value) => {
        setRecords(value);
        setLoading(false);
      },
      () => {
        setLoading(false);
      }
    );
  };

  const handlerTabChange = (e: SyntheticEvent, newValue: tabValues) => {
    setTabValue(newValue);
    switch (newValue) {
      case tabValues.past: {
        filterRecords(true);
        break;
      }
      case tabValues.upcomming: {
        filterRecords(false);
        break;
      }
      default: {
        break;
      }
    }
  };

  return (
    <>
      <Stack
        justifyContent={"space-between"}
        alignItems={"flex-end"}
        direction={"row"}
        flexWrap={"wrap"}
        margin={{ lg: "50px 0 40px", sm: "30px 0 20px", xs: "10px 0 15px" }}
      >
        <Typography variant={lessThenSmall ? "h4" : "h3"}>
          Мои записи
        </Typography>
        <Tabs
          value={tabValue}
          onChange={handlerTabChange}
          sx={{
            m: lessThenSmall ? "0 auto" : "",
            mt: lessThenSmall ? "10px" : "",
          }}
        >
          <Tab value={tabValues.upcomming} label={"Предстоящие"} />
          <Tab value={tabValues.past} label={"Прошедшие"} />
        </Tabs>
      </Stack>

      {loading ? (
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            mt: "40px",
          }}
        >
          <CircularProgress size={"60px"} />
        </Box>
      ) : (
        <Stack direction={"column"} gap={{ lg: "20px", xs: "10px" }}>
          {sortedByDateRecords && sortedByDateRecords.length > 0 ? (
            sortedByDateRecords.map((record, index) => (
              <TourAccordion
                key={index}
                record={record}
                records={records}
                setRecords={setRecords}
              />
            ))
          ) : (
            <Typography mt={3} variant={lessThenSmall ? "h5" : "h4"}>
              У вас еще нет записей
            </Typography>
          )}
        </Stack>
      )}
      <ErrorBookingModal />
      <ConfirmCancelBooking />
      <SuccessCancelBooking />
    </>
  );
};
