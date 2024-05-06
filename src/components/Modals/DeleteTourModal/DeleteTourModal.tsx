import {
  Button,
  Dialog,
  DialogContent,
  Typography,
  Stack,
  CircularProgress,
} from "@mui/material";

import { useDispatch, useSelector } from "react-redux";
import { deleteTour } from "../../../API/creatorAPI/deleteTour";

import {
  isModalActive,
  setModalActive,
  setModalInactive,
} from "../../../redux/Modal/ModalReducer";
import { RootState } from "../../../redux/store";
import { ITour } from "../../../models/tourCardModel/ITour";
import { SetStateAction, Dispatch, useState } from "react";

interface IDeleteTourModalProps {
  myTours: ITour[];
  setMyTours: Dispatch<SetStateAction<ITour[]>>;
}

function DeleteTourModal({ myTours, setMyTours }: IDeleteTourModalProps) {
  const activeModals = useSelector(
    (state: RootState) => state.modal.activeModals
  );

  const modalProps = activeModals.find(
    (modal) => modal.id === "deleteTourModal"
  );

  let tourId = modalProps?.props?.tourId;

  const dispatch = useDispatch();

  const [postedTours, setPostedTours] = useState<ITour[]>([]);
  const [loading, setLoading] = useState(false);

  const handlerBackClick = () => {
    dispatch(setModalInactive("deleteTourModal"));
  };

  const handlerConfirmClick = () => {
    setLoading(true);
    deleteTour(
      tourId as string,
      (value) => {
        dispatch(setModalInactive("deleteTourModal"));
        setMyTours([...myTours.filter((tour) => tour.tourId !== tourId)]);
        dispatch(setModalActive("successDeleteTourModal"));
        setLoading(false);
      },
      () => {
        dispatch(setModalActive("сancelPostedToursModal"));
        setLoading(false);
      }
    );
  };
  return (
    <Dialog
      className="deleteTourModal"
      onClose={() => dispatch(setModalInactive("deleteTourModal"))}
      open={isModalActive("deleteTourModal", activeModals)}
      fullWidth
      maxWidth={"sm"}
    >
      <DialogContent>
        <Typography variant={"h5"} sx={{ mb: "30px" }}>
          Подтверждение удаления тура
        </Typography>
        <Typography variant={"caption"}>
          Вы уверены, что хотите удалить тур?
        </Typography>

        <Stack
          direction={"row"}
          justifyContent={loading ? "center" : "end"}
          marginTop={"30px"}
          gap={1}
        >
          {loading ? (
            <CircularProgress />
          ) : (
            <>
              <Button onClick={handlerBackClick}>Назад</Button>

              <Button onClick={handlerConfirmClick}>Да, удалить</Button>
            </>
          )}
        </Stack>
      </DialogContent>
    </Dialog>
  );
}

export default DeleteTourModal;
