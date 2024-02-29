import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AddTourSkeleton } from "../../components/AddTourModules/AddTourSkeleton/AddTourSkeleton";
import AddTourRouting from "./AddTourRouting/AddTourRouting";
import AddTourSteps from "./AddTourSteps/AddTourSteps";
import { getMyTourById } from "../../API/creatorAPI/getMyTourById";
import { IAddTour } from "../../models/addTourModels/IAddTour";
import { Fade, Snackbar } from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import { darkTurquoiseColor } from "../../config/MUI/color/color";

export enum addTourStepsMap {
  first,
  second,
  third,
}

export type AddErrorSnackbarType = {
  open: boolean;
  Transition: React.ComponentType<
    TransitionProps & {
      children: React.ReactElement<any, any>;
    }
  >;
};

function AddTourPage({ isEditing }: { isEditing: boolean }) {
  const { tourId } = useParams();

  const [page, setPage] = useState<addTourStepsMap>(addTourStepsMap.first);
  const [tourInfo, setTourInfo] = useState<IAddTour>({});
  const [isLoading, setLoading] = useState(true);
  const [addError, setAddError] = useState<boolean>(false);
  const [snackbar, setSnackbar] = useState<AddErrorSnackbarType>({
    open: false,
    Transition: Fade,
  });

  console.log(tourInfo);

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

  const handlerSnackOnClose = () => {
    setSnackbar({
      ...snackbar,
      open: !snackbar.open,
    });
  };

  if (isLoading) {
    return <AddTourSkeleton />;
  }
  return (
    <>
      <AddTourRouting
        page={page}
        setPage={setPage}
        tourInfo={tourInfo}
        setTourInfo={setTourInfo}
        isEditing={isEditing}
        tourId={tourId as string}
        setAddError={setAddError}
        snackbar={snackbar}
        setSnackbar={setSnackbar}
      />
      <AddTourSteps
        page={page}
        tourInfo={tourInfo}
        setTourInfo={setTourInfo}
        isEditing={isEditing}
        addError={addError}
        setAddError={setAddError}
      />
      <Snackbar
        open={snackbar.open}
        onClose={handlerSnackOnClose}
        message={"Заполните недостающие поля"}
        key={snackbar.Transition.name}
        TransitionComponent={snackbar.Transition}
        ContentProps={{
          sx: {
            background: darkTurquoiseColor,
          },
        }}
      />
    </>
  );
}

export default AddTourPage;
