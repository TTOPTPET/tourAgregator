import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { RootState } from "../../redux/store";
import { setTourInfo } from "../../redux/TourInfo/TourInfoReducer";
import { ITourInfo } from "../../models/tourModels/ITourInfo";
import { getTourInfo } from "../../API/tourAPI/getTourInfo";
import { TourRouting } from "./TourRouting/TourRouting";
import { TourSteps } from "./TourSteps/TourSteps";
import { Box } from "@mui/material";
import { ITourBookingData } from "../../models/tourModels/ITourBookingData";
import SuccessPayModal from "../../components/Modals/SuccessPayModal/SuccessPayModal";
import ErrorBookingModal from "../../components/Modals/ErrorBookingModal/ErrorBookingModal";
import NoLoginModal from "../../components/Modals/NoLoginModal/NoLoginModal";

export enum tourStepsMap {
  first,
  second,
}

const bookingDataDefault = {
  tourAmount: 0,
  publicTourId: "",
  tourists: [],
  comment: "",
  touristsAmount: 0,
};

function TourPage() {
  const { tourId } = useParams();
  const [page, setPage] = useState<tourStepsMap>(tourStepsMap.first);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [bookingData, setBookingData] =
    useState<ITourBookingData>(bookingDataDefault);

  const dispatch = useDispatch();
  const tourInfo = useSelector((state: RootState) => state.tourInfo.tourInfo);

  useEffect(() => {
    getTourInfo(
      tourId as string,
      (response: ITourInfo) => dispatch(setTourInfo(response)),
      () => {},
      false
    );
    setIsLoading(false);
  }, []);

  useEffect(() => {
    setBookingData({
      ...bookingData,
      publicTourId: tourInfo?.publicTourId,
    });
  }, [tourInfo]);

  useEffect(() => {
    setBookingData({
      ...bookingData,
      tourAmount:
        bookingData?.touristsAmount! > 0
          ? bookingData?.touristsAmount! * tourInfo?.price!
          : 0,
    });
  }, [bookingData.touristsAmount]);

  if (isLoading) {
    return <></>;
  }
  return (
    <Box sx={{ position: "relative" }}>
      <TourRouting page={page} setPage={setPage} bookingData={bookingData} />
      <TourSteps
        page={page}
        tourInfo={tourInfo}
        setPage={setPage}
        bookingData={bookingData}
        setBookingData={setBookingData}
      />
      <SuccessPayModal meetingTime={tourInfo?.meetingDatetime} />
      <ErrorBookingModal />
      <NoLoginModal />
    </Box>
  );
}

export default TourPage;
