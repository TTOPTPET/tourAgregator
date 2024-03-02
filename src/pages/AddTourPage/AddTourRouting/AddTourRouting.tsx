import { Box, Button, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import { useNavigate } from "react-router-dom";
import { addTour } from "../../../API/addTourAPI/addTourAPI";
import { editTourAPI } from "../../../API/creatorAPI/editTourAPI.ts";
import { addTourStepsMap } from "../AddTourPage";
import { Dispatch, SetStateAction } from "react";
import { IAddTour } from "../../../models/addTourModels/IAddTour";
import { redColor } from "../../../config/MUI/color/color.ts";

interface addTourRoutingProps {
  page: addTourStepsMap;
  setPage: (prop: any) => void;
  tourInfo: IAddTour;
  isEditing: boolean;
  tourId: string;
  setAddError: Dispatch<SetStateAction<boolean>>;
  addError: boolean;
  errorMessage: string;
  setErrorMessage: Dispatch<SetStateAction<string>>;
}

export default function AddTourRouting({
  page,
  tourInfo,
  setPage,
  isEditing,
  tourId,
  setAddError,
  addError,
  errorMessage,
  setErrorMessage,
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
          setErrorMessage("Что-то пошло не так, попробуйте еще раз позже!");
        },
        false
      );
    }
  };

  return (
    <Box sx={{ mb: "30px", position: "relative" }}>
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
          <>
            <Button
              variant="contained"
              onClick={handlerSendTourClick}
              disabled={addError}
            >
              {isEditing ? "Редактировать тур" : "Добавить тур"}
            </Button>
            {addError && (
              <Typography
                variant="caption"
                className="author__error"
                sx={{
                  color: redColor,
                  mb: "15px",
                  position: "absolute",
                  right: "5px",
                  top: "40px",
                }}
              >
                {errorMessage}
              </Typography>
            )}
          </>
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
