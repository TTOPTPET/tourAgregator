import { Box, Button, CircularProgress, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import { useNavigate } from "react-router-dom";
import { addTour } from "../../../API/addTourAPI/addTourAPI";
import { editTourAPI } from "../../../API/creatorAPI/editTourAPI.ts";
import { addTourStepsMap } from "../AddTourPage";
import { Dispatch, SetStateAction, useState } from "react";
import { IAddTour } from "../../../models/addTourModels/IAddTour";
import { redColor } from "../../../config/MUI/color/color.ts";
import { setModalActive } from "../../../redux/Modal/ModalReducer.ts";
import { useDispatch } from "react-redux";
import { isEqual } from "lodash";
import { postNewPhotos } from "../../../API/creatorAPI/postNewPhotos.ts";

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
  tourInfoClone: IAddTour;
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
  tourInfoClone,
}: addTourRoutingProps) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const handlerSendTourClick = () => {
    setLoading(true);
    if (isEditing) {
      if (
        tourInfo.photos &&
        typeof tourInfo?.photos[tourInfo?.photos.length - 1] === "object"
      ) {
        postNewPhotos(
          tourInfo,
          (photosUrl) => {
            editTourAPI(
              tourId,
              tourInfo,
              photosUrl,
              () => {
                navigate("/creator/lk");
              },
              () => {
                setLoading(false);
              }
            );
          },
          () => {
            setLoading(false);
          }
        );
      } else {
        editTourAPI(
          tourId,
          tourInfo,
          undefined,
          () => {
            navigate("/creator/lk");
            setLoading(false);
          },
          () => {
            setLoading(false);
          }
        );
      }
    } else {
      postNewPhotos(
        tourInfo,
        (photosUrl) => {
          addTour(
            () => {
              navigate("/creator/lk");
              setLoading(false);
            },
            tourInfo,
            photosUrl,
            () => {
              setLoading(false);
              setAddError(true);
              setErrorMessage("Что-то пошло не так, попробуйте еще раз позже!");
            },
            false
          );
        },
        () => {
          setLoading(false);
        }
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
                if (
                  Object.keys(tourInfo).length > 0 &&
                  !isEqual(tourInfoClone, tourInfo)
                ) {
                  dispatch(setModalActive("confirmAddTourExit"));
                  return page;
                } else {
                  navigate("/creator/lk");
                  return page;
                }
              }
            })
          }
        >
          {"< "} Назад
        </Button>

        {page === addTourStepsMap.third ? (
          loading ? (
            <CircularProgress sx={{ mr: "90px" }} />
          ) : (
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
          )
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
