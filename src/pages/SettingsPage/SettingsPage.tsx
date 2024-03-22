import { Box, Button, Stack, Typography } from "@mui/material";
import ConfirmDeleteUserModal from "../../components/Modals/ConfirmDeleteUserModal/ConfirmDeleteUserModal";
import { useDispatch } from "react-redux";
import { setModalActive } from "../../redux/Modal/ModalReducer";

function TouristLk() {
  const dispatch = useDispatch();
  return (
    <Box>
      <Typography variant={"h3"}>Настройки</Typography>
      <Stack mt={"50px"} gap={"30px"}>
        <Stack gap={"20px"}>
          <Typography variant={"h5"}>Смена пароля</Typography>
          <Button>Сменить пароль</Button>
        </Stack>
        <Stack gap={"20px"}>
          <Typography variant={"h5"}>Удаление учетной записи</Typography>
          <Button
            variant="deleteUserButton"
            onClick={() => dispatch(setModalActive("confirmDeleteUserModal"))}
          >
            Удалить
          </Button>
        </Stack>
        <Stack gap={"20px"}>
          <Typography variant={"h5"}>Верификация почты</Typography>
          <Button>Отправить письмо</Button>
        </Stack>
      </Stack>
      <ConfirmDeleteUserModal />
    </Box>
  );
}

export default TouristLk;
