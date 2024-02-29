import { Box, Button } from "@mui/material";
import { Stack } from "@mui/system";
import { useNavigate } from "react-router-dom";
import { addTour } from "../../../API/addTourAPI/addTourAPI";
import { editTourAPI } from "../../../API/creatorAPI/editTourAPI.ts";
import { AddErrorSnackbarType, addTourStepsMap } from "../AddTourPage";
import { Dispatch, SetStateAction } from "react";
import { IAddTour } from "../../../models/addTourModels/IAddTour";

interface addTourRoutingProps {
  page: addTourStepsMap;
  setPage: (prop: any) => void;
  tourInfo: IAddTour;
  setTourInfo: Dispatch<SetStateAction<IAddTour>>;
  isEditing: boolean;
  tourId: string;
  setAddError: Dispatch<SetStateAction<boolean>>;
  snackbar: AddErrorSnackbarType;
  setSnackbar: Dispatch<SetStateAction<AddErrorSnackbarType>>;
}

export default function AddTourRouting({
  page,
  tourInfo,
  setTourInfo,
  setPage,
  isEditing,
  tourId,
  setAddError,
  snackbar,
  setSnackbar,
}: addTourRoutingProps) {
  const navigate = useNavigate();

  const handlerSendTourClick = () => {
    if (isEditing) {
      console.log(tourInfo);
      editTourAPI(tourId, tourInfo, () => {
        navigate("/creator/lk");
      });
    } else {
      console.log(tourInfo);
      addTour(
        () => {
          navigate("/creator/lk");
        },
        tourInfo,
        () => {
          setAddError(true);
          setSnackbar({
            ...snackbar,
            open: !snackbar.open,
          });
        },
        false
      );
    }
  };

  return (
    <Box sx={{ mb: "20px" }}>
      <Stack direction={"row"} justifyContent={"space-between"}>
        <Button
          variant="textButton"
          onClick={() =>
            setPage((page: addTourStepsMap) => {
              if (page > 0) {
                return page - 1;
              } else {
                navigate("/creator/lk");
                return page;
              }
            })
          }
        >
          {"< "} Назад
        </Button>
        {page === addTourStepsMap.third ? (
          <Button variant="contained" onClick={handlerSendTourClick}>
            {isEditing ? "Редактировать тур" : "Добавить тур"}
          </Button>
        ) : (
          <Button
            variant="textButton"
            onClick={() =>
              setPage((page: addTourStepsMap) => (page < 2 ? page + 1 : page))
            }
          >
            Вперёд {" >"}
          </Button>
        )}
      </Stack>
    </Box>
  );
}
