import { useState, Dispatch, SetStateAction } from "react";
import { AddTourFirstPage } from "../AddTourFirstPage/AddTourFirstPage";
import { addTourStepsMap } from "../AddTourPage";
import { AddTourSecondPage } from "../AddTourSecondPage/AddTourSecondPage";
import { AddTourThirdPage } from "../AddTourThirdPage/AddTourThirdPage";
import { IAddTour } from "../../../models/addTourModels/IAddTour";

interface addTourStepsProps {
  page: addTourStepsMap;
  tourInfo: IAddTour;
  setTourInfo: Dispatch<SetStateAction<IAddTour>>;
  isEditing: boolean;
  addError: boolean;
  setAddError: Dispatch<SetStateAction<boolean>>;
  setErrorMessage: Dispatch<SetStateAction<string>>;
  setAgeErrorStatus: Dispatch<SetStateAction<boolean>>;
  ageErrorStatus: boolean;
  tourInfoClone: IAddTour;
}

const loadImages = {
  src: "",
  loading: true,
};

const imageLoaderHelper = (newImages: (string | File)[], skeleton: any[]) => {
  newImages.forEach((image) => {
    skeleton.pop();
    skeleton = [image, ...skeleton];
  });
  return skeleton;
};

function AddTourSteps({
  page,
  isEditing,
  tourInfo,
  setTourInfo,
  addError,
  setAddError,
  setErrorMessage,
  setAgeErrorStatus,
  ageErrorStatus,
  tourInfoClone,
}: addTourStepsProps) {
  const [images, setImage] = useState<any[]>(
    tourInfo?.photos && tourInfo?.photos.length !== 0
      ? imageLoaderHelper(
          tourInfo.photos,
          new Array<typeof loadImages>(8).fill(loadImages)
        )
      : new Array<typeof loadImages>(8).fill(loadImages)
  );

  switch (page) {
    case addTourStepsMap.first:
      return (
        <AddTourFirstPage
          images={images}
          setImage={setImage}
          tourInfo={tourInfo}
          setTourInfo={setTourInfo}
          isEditing={isEditing}
          addError={addError}
          setAgeErrorStatus={setAgeErrorStatus}
          ageErrorStatus={ageErrorStatus}
        />
      );
    case addTourStepsMap.second:
      return (
        <AddTourSecondPage
          addError={addError}
          tourInfo={tourInfo}
          setTourInfo={setTourInfo}
        />
      );
    case addTourStepsMap.third:
      return (
        <AddTourThirdPage
          images={images}
          setImage={setImage}
          tourInfo={tourInfo}
          isEditing={isEditing}
          setAddError={setAddError}
          ageErrorStatus={ageErrorStatus}
          setErrorMessage={setErrorMessage}
          tourInfoClone={tourInfoClone}
        />
      );
    default:
      break;
  }
}

export default AddTourSteps;
