import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AddTourSkeleton } from "../../components/AddTourModules/AddTourSkeleton/AddTourSkeleton";
import AddTourRouting from "./AddTourRouting/AddTourRouting";
import AddTourSteps from "./AddTourSteps/AddTourSteps";
import { getMyTourById } from "../../API/creatorAPI/getMyTourById";
import { IAddTour } from "../../models/addTourModels/IAddTour";
import ConfirmAddTourExit from "../../components/Modals/ConfirmAddTourExit/ConfirmAddTourExit";

export enum addTourStepsMap {
  first,
  second,
  third,
}

function AddTourPage({ isEditing }: { isEditing: boolean }) {
  const { tourId } = useParams();

  const [page, setPage] = useState<addTourStepsMap>(addTourStepsMap.first);
  const [tourInfo, setTourInfo] = useState<IAddTour>({});
  const [isLoading, setLoading] = useState(true);
  const [addError, setAddError] = useState<boolean>(false);

  const [errorMessage, setErrorMessage] = useState<string>("");
  const [ageErrorStatus, setAgeErrorStatus] = useState<boolean>(false);

  useEffect(() => {
    if (isEditing) {
      getMyTourById((value) => {
        setTourInfo(value);
        setLoading(false);
      }, tourId as string);
    } else {
      setLoading(false);
    }
  }, []);

  if (isLoading) {
    return <AddTourSkeleton />;
  }
  return (
    <>
      <AddTourRouting
        page={page}
        setPage={setPage}
        tourInfo={tourInfo}
        isEditing={isEditing}
        tourId={tourId as string}
        setAddError={setAddError}
        addError={addError}
        errorMessage={errorMessage}
        setErrorMessage={setErrorMessage}
      />
      <AddTourSteps
        page={page}
        tourInfo={tourInfo}
        setTourInfo={setTourInfo}
        isEditing={isEditing}
        addError={addError}
        setAddError={setAddError}
        setErrorMessage={setErrorMessage}
        setAgeErrorStatus={setAgeErrorStatus}
        ageErrorStatus={ageErrorStatus}
      />
      <ConfirmAddTourExit />
    </>
  );
}

export default AddTourPage;
