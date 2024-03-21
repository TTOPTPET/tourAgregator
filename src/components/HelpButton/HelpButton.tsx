import helpIcon from "../../media/helpButtonIcon.svg";
import { Box, Paper } from "@mui/material";

import { setModalActive } from "../../redux/Modal/ModalReducer";

import { useDispatch, useSelector } from "react-redux";

export default function HelpButton() {
  const dispatch = useDispatch();

  return (
    <Box
      className="helpButton__wrapper"
      onClick={() => dispatch(setModalActive("errorReportModal"))}
    >
      <Paper variant="helpButton">
        <img src={helpIcon} alt="helpIcon" style={{ height: "100%" }} />
      </Paper>
    </Box>
  );
}
