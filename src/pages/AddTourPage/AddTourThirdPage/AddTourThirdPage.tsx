import { Dispatch, SetStateAction, FC, useEffect } from "react";
import { Stack, Typography } from "@mui/material";
import { TourInfo } from "../../../components/TourInfo/TourInfo";
import { IAddTour } from "../../../models/addTourModels/IAddTour";

interface IAddTourThirdPageProps {
  images: any[];
  setImage: Dispatch<SetStateAction<any[]>>;
  tourInfo: IAddTour;
  isEditing: boolean;
  setAddError: Dispatch<SetStateAction<boolean>>;
  ageErrorStatus: boolean;
  setErrorMessage: Dispatch<SetStateAction<string>>;
}

export const AddTourThirdPage: FC<IAddTourThirdPageProps> = ({
  images,
  setImage,
  tourInfo,
  isEditing,
  setAddError,
  ageErrorStatus,
  setErrorMessage,
}) => {
  useEffect(() => {
    if (
      !tourInfo.category ||
      !tourInfo.complexity ||
      !tourInfo.mapPoints ||
      !tourInfo.photos ||
      tourInfo.photos.length === 0 ||
      !tourInfo.recommendedAgeFrom ||
      !tourInfo.recommendedAgeTo ||
      !tourInfo.region ||
      !tourInfo.tourDescription ||
      !tourInfo.tourName ||
      ageErrorStatus
    ) {
      setAddError(true);
      setErrorMessage("Проверьте правильность заполнения полей");
    } else {
      setAddError(false);
      setErrorMessage("");
    }
  }, []);

  return (
    <Stack gap={1}>
      <Typography variant={"h3"}>
        {tourInfo?.tourName || "Название тура"}
      </Typography>
      <TourInfo
        images={images}
        setImage={setImage}
        addTourInfo
        tourInfo={tourInfo}
        isEditing={isEditing}
      />
    </Stack>
  );
};
