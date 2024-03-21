import {
  Button,
  Dialog,
  DialogContent,
  Typography,
  Stack,
} from "@mui/material";

import { useDispatch, useSelector } from "react-redux";

import {
  isModalActive,
  setModalInactive,
} from "../../../redux/Modal/ModalReducer";
import { RootState } from "../../../redux/store";

function SuccesReturnMoney() {
  const activeModals = useSelector(
    (state: RootState) => state.modal.activeModals
  );

  const dispatch = useDispatch();

  const handlerBackClick = () => {
    dispatch(setModalInactive("succesReturnMoney"));
  };

  return (
    <Dialog
      className="succesReturnMoney"
      onClose={() => dispatch(setModalInactive("succesReturnMoney"))}
      open={isModalActive("succesReturnMoney", activeModals)}
      fullWidth
      maxWidth={"sm"}
    >
      <DialogContent>
        <Typography variant={"h5"} sx={{ mb: "30px" }}>
          Запрос на возврат успешно отправлен
        </Typography>
        <Typography variant={"caption"}>
          Деньги будут возвращены в течении 5 дней!{" "}
          <>
            <br />
          </>{" "}
          До новых встреч!
        </Typography>

        <Stack
          direction={"row"}
          justifyContent={"end"}
          marginTop={"30px"}
          gap={1}
        >
          <Button onClick={handlerBackClick}>К турам</Button>
        </Stack>
      </DialogContent>
    </Dialog>
  );
}

export default SuccesReturnMoney;
