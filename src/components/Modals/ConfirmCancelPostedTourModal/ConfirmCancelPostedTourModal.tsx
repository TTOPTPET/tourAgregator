import {
  Button,
  Dialog,
  DialogContent,
  Typography,
  Stack,
} from "@mui/material";

import { useDispatch, useSelector } from "react-redux";

import { SetStateAction, Dispatch } from "react";
import { IPublicTour } from "../../../models/calendarModels/IPublicTour";

import {
  isModalActive,
  setModalInactive,
  setModalActive,
} from "../../../redux/Modal/ModalReducer";
import { RootState } from "../../../redux/store";
import { ITour } from "../../../models/tourCardModel/ITour";
import { deletePostedTour } from "../../../API/calendarAPI/deletePostedTour";

type ConfirmCancelPostedTourModalProps = {
  setPublicTours?: Dispatch<SetStateAction<IPublicTour[] | undefined>>;
  setSelectedPublic?: Dispatch<SetStateAction<IPublicTour | undefined>>;
  setErrorMessage?: Dispatch<SetStateAction<string>>;
  publicTourId?: string;
  postedTours?: ITour[];
  tourId?: string;
  setMyTours?: Dispatch<SetStateAction<ITour[]>>;
  setPostedTours?: Dispatch<SetStateAction<ITour[]>>;
};

function ConfirmCancelPostedTourModal({
  setPublicTours,
  setSelectedPublic,
  setErrorMessage,
  publicTourId,
  postedTours,
  tourId,
  setMyTours,
  setPostedTours,
}: ConfirmCancelPostedTourModalProps) {
  const activeModals = useSelector(
    (state: RootState) => state.modal.activeModals
  );

  const dispatch = useDispatch();

  const modal = activeModals.find(
    (modal) => modal.id === "confirmCancelPostedTourModal"
  );

  const handlerBackClick = () => {
    dispatch(setModalInactive("confirmCancelPostedTourModal"));
  };

  const handlerDeleteAllClick = () => {
    dispatch(setModalInactive("confirmCancelPostedTourModal"));
    postedTours &&
      postedTours.forEach((tour: ITour) => {
        deletePostedTour(
          tour?.publicTourId as string,
          () => {
            setPostedTours &&
              setPostedTours((postedToursCurrent) =>
                postedToursCurrent.filter(
                  (postedTour) => postedTour.publicTourId !== tour.publicTourId
                )
              );

            setMyTours &&
              setMyTours((myTours) => {
                return myTours.map((tour) => {
                  if (tour.tourId === tourId && tour?.publicNum) {
                    tour.publicNum = tour?.publicNum - 1;
                  }
                  return tour;
                });
              });

            dispatch(
              setModalActive("successCancelPostedTourModal", { multiply: true })
            );
          },
          () => {
            setErrorMessage && setErrorMessage("Ошибка! Попробуйте позже!");
          }
        );
      });
  };

  const handlerDeleteClick = () => {
    publicTourId &&
      deletePostedTour(
        publicTourId,
        () => {
          setPublicTours &&
            setPublicTours((publicTours) =>
              publicTours?.filter((tour) => tour.publicTourId !== publicTourId)
            );
          setSelectedPublic && setSelectedPublic(undefined);
          setErrorMessage && setErrorMessage("");
          dispatch(
            setModalActive("successCancelPostedTourModal", { multiply: false })
          );
          dispatch(setModalInactive("confirmCancelPostedTourModal"));
        },
        () => {
          dispatch(setModalInactive("confirmCancelPostedTourModal"));
          setErrorMessage && setErrorMessage("Ошибка! Попробуйте позже!");
        }
      );
  };

  return (
    <Dialog
      className="confirmCancelPostedTourModal"
      onClose={() => dispatch(setModalInactive("confirmCancelPostedTourModal"))}
      open={isModalActive("confirmCancelPostedTourModal", activeModals)}
      fullWidth
      maxWidth={"sm"}
    >
      <DialogContent>
        <Typography variant={"h5"} sx={{ mb: "30px" }}>
          Подтверждение отмены {modal?.props?.multiply ? "туров" : "тура"}
        </Typography>
        <Typography variant={"caption"}>
          Вы уверены, что хотите отменить{" "}
          {modal?.props?.multiply ? "туры" : "тур"}?
          <br /> Все денежные средства будут <br />
          возвращены покупателям
        </Typography>

        <Stack
          direction={"row"}
          justifyContent={"end"}
          marginTop={"30px"}
          gap={1}
        >
          <Button onClick={handlerBackClick}>Назад</Button>
          <Button
            onClick={
              modal?.props?.multiply
                ? handlerDeleteAllClick
                : handlerDeleteClick
            }
          >
            Да, отменить
          </Button>
        </Stack>
      </DialogContent>
    </Dialog>
  );
}

export default ConfirmCancelPostedTourModal;
