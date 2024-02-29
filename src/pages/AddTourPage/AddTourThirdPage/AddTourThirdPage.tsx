import { Dispatch, SetStateAction, FC } from "react";
import { Stack, Typography } from "@mui/material";
import { TourInfo } from "../../../components/TourInfo/TourInfo";
import { IAddTour } from "../../../models/addTourModels/IAddTour";

interface IAddTourThirdPageProps {
  images: any[];
  setImage: Dispatch<SetStateAction<any[]>>;
  tourInfo: IAddTour;
  isEditing: boolean;
}

export const AddTourThirdPage: FC<IAddTourThirdPageProps> = ({
  images,
  setImage,
  tourInfo,
  isEditing,
}) => {
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
