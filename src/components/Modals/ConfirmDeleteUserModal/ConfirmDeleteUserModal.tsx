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
//   import CancelPostedToursModal from "../CancelPostedToursModal/CancelPostedToursModal";
//   import SuccessCancelPostedTourModal from "../SuccessCancelPostedTourModal/SuccessCancelPostedTourModal";

interface IConfirmDeleteUserModalProps {
  myTours: ITour[];
  setMyTours: Dispatch<SetStateAction<ITour[]>>;
}

function ConfirmDeleteUserModal() {
  const activeModals = useSelector(
    (state: RootState) => state.modal.activeModals
  );

  const modalProps = activeModals.find(
    (modal) => modal.id === "confirmDeleteUserModal"
  );

  let tourId = modalProps?.props?.tourId;

  const dispatch = useDispatch();

  const [postedTours, setPostedTours] = useState<ITour[]>([]);
  const [loading, setLoading] = useState(false);

  const handlerBackClick = () => {
    dispatch(setModalInactive("confirmDeleteUserModal"));
  };

  const handlerConfirmClick = () => {
    // setLoading(true);
    // deleteTour(
    //   tourId as string,
    //   (value) => {
    //     dispatch(setModalInactive("confirmDeleteUserModal"));
    //     setMyTours([...myTours.filter((tour) => tour.tourId !== tourId)]);
    //     dispatch(setModalActive("successconfirmDeleteUserModal"));
    //     setLoading(false);
    //   },
    //   (data) => {
    //     setPostedTours(data);
    //     dispatch(setModalActive("сancelPostedToursModal"));
    //     setLoading(false);
    //   }
    // );
  };
  return (
    <Dialog
      className="confirmDeleteUserModal"
      onClose={() => dispatch(setModalInactive("confirmDeleteUserModal"))}
      open={isModalActive("confirmDeleteUserModal", activeModals)}
      fullWidth
      maxWidth={"sm"}
    >
      <DialogContent>
        <Typography variant={"h5"} sx={{ mb: "30px" }}>
          Подтверждение удаления
        </Typography>
        <Typography variant={"caption"}>
          Вы уверены, что хотите удалить учетную запись? Данное действие
          отменить будет нельзя!
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

export default ConfirmDeleteUserModal;
