import { FC, useState, useEffect, SetStateAction, Dispatch } from "react";
import { tourStepsMap } from "../TourPage";
import { TourFirstPage } from "../TourFirstPage/TourFirstPage";
import { TourSecondPage } from "../TourSecondPage/TourSecondPage";
import { ITourInfo } from "../../../models/tourModels/ITourInfo";
import { ITourBookingData } from "../../../models/tourModels/ITourBookingData";

interface TourStepsProps {
  page: tourStepsMap;
  setPage: (prop: any) => void;
  tourInfo: ITourInfo;
  bookingData: ITourBookingData;
  setBookingData: Dispatch<SetStateAction<ITourBookingData>>;
}

export const TourSteps: FC<TourStepsProps> = ({
  page,
  setPage,
  tourInfo,
  bookingData,
  setBookingData,
}) => {
  const [images, setImage] = useState<any[]>([]);

  switch (page) {
    case tourStepsMap.first: {
      return (
        <TourFirstPage
          images={images}
          setImage={setImage}
          tourInfo={tourInfo}
          bookingData={bookingData}
          setBookingData={setBookingData}
          page={page}
          setPage={setPage}
        />
      );
    }
    case tourStepsMap.second: {
      return (
        <TourSecondPage
          bookingData={bookingData}
          setBookingData={setBookingData}
          tourInfo={tourInfo}
        />
      );
    }
    default: {
      break;
    }
  }
};
