import { Box, Grid, Stack, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { IPublicTour } from "../../models/calendarModels/IPublicTour";
import { getPublicTours } from "../../API/calendarAPI/getPublicTours";
import CalendarSidebar from "../../components/CalendarModules/CalendarSidebar/CalendarSidebar";
import { ITour } from "../../models/tourCardModel/ITour";
import { getMyTours } from "../../API/creatorAPI/getMyTours";
import NewPublicModal from "../../components/Modals/NewPublicModal/NewPublicModal";
import { Calendar } from "../../components/CalendarModules/Calendar/Calendar";
import CalendarDatePicker from "../../components/CalendarModules/CalendarDatePicker/CalendarDatePicker";
import dayjs, { Dayjs } from "dayjs";
import BookingInfoModal from "../../components/Modals/BookingInfoModal/BookingInfoModal";
import CalendarSidebarSkeleton from "../../components/CalendarModules/CalendarSidebar/CalendarSidebarSkeleton/CalendarSidebarSkeleton";
import SuccessCancelPostedTourModal from "../../components/Modals/SuccessCancelPostedTourModal/SuccessCancelPostedTourModal";

function TourCalendarPage() {
  const [publicTours, setPublicTours] = useState<IPublicTour[] | undefined>([]);
  const [selectedPublic, setSelectedPublic] = useState<
    IPublicTour | undefined
  >();
  const [myTours, setMyTours] = useState<ITour[]>([]);
  const [viewMonth, setViewMonth] = useState<Dayjs>(dayjs());
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    getMyTours((value) => {
      setMyTours(value);
    }, undefined);
  }, []);

  useEffect(() => {
    getPublicTours({ year: viewMonth.year() }, (value) => {
      setPublicTours(value);
    });
  }, [viewMonth.year()]);

  console.log(publicTours);

  return (
    <Box>
      <Typography variant={"h3"} sx={{ mb: "40px" }}>
        Мои туры
      </Typography>

      <Grid container spacing={8} height={"80vh"}>
        <Grid item xs={8} height={"100%"}>
          <Stack display={"flex"} direction={"column"} height={"100%"}>
            <CalendarDatePicker
              viewMonth={viewMonth}
              setViewMonth={setViewMonth}
            />
            <Calendar
              viewMonth={viewMonth}
              publicTours={publicTours}
              selectedPublic={selectedPublic}
              setSelectedPublic={setSelectedPublic}
            />
          </Stack>
        </Grid>
        <Grid item xs={4} height={"100%"}>
          {selectedPublic ? (
            <CalendarSidebar
              selectedPublic={selectedPublic}
              setErrorMessage={setErrorMessage}
              errorMessage={errorMessage}
              setSelectedPublic={setSelectedPublic}
              setPublicTours={setPublicTours}
            />
          ) : (
            <CalendarSidebarSkeleton />
          )}

          {/* Это говнище будет работать по клику, так что потом просто логику малесь переделать */}
        </Grid>
      </Grid>
      <NewPublicModal
        myTours={myTours}
        selectedPublic={selectedPublic}
        setSelectedPublic={setSelectedPublic}
        setPublicTours={setPublicTours}
      />
      {selectedPublic?.bookingInfo && (
        <BookingInfoModal selectedBooking={selectedPublic} />
      )}
      <SuccessCancelPostedTourModal />
    </Box>
  );
}

export default TourCalendarPage;
