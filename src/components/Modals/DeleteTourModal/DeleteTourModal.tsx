import {
  Button,
  Dialog,
  DialogContent,
  Typography,
  Stack,
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
//   import CancelPostedToursModal from "../CancelPostedToursModal/CancelPostedToursModal";
//   import SuccessCancelPostedTourModal from "../SuccessCancelPostedTourModal/SuccessCancelPostedTourModal";

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

  const handlerBackClick = () => {
    dispatch(setModalInactive("deleteTourModal"));
  };

  const handlerConfirmClick = () => {
    deleteTour(
      tourId as string,
      (value) => {
        dispatch(setModalInactive("deleteTourModal"));
        setMyTours([...myTours.filter((tour) => tour.tourId !== tourId)]);
        dispatch(setModalActive("successDeleteTourModal"));
      },
      (data) => {
        setPostedTours(data);
        dispatch(setModalActive("сancelPostedToursModal"));
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
          justifyContent={"end"}
          marginTop={"30px"}
          gap={1}
        >
          <Button onClick={handlerBackClick}>Назад</Button>

          <Button onClick={handlerConfirmClick}>Да, удалить</Button>
        </Stack>
      </DialogContent>
      {/* <CancelPostedToursModal
          postedTours={postedTours}
          setPostedTours={setPostedTours}
          tourId={tourId}
          setMyTours={setMyTours}
          myTours={myTours}
        /> */}
      {/* <SuccessCancelPostedTourModal /> */}
    </Dialog>
  );
}

export default DeleteTourModal;
