import plus from "../../../media/plus-circle-outline-white.svg";
import Box from "@mui/material/Box";
import { darkTurquoiseColor } from "../../../config/MUI/color/color";
import { Link } from "react-router-dom";

function AddTourButton() {
  return (
    <Box
      component={Link}
      to={"/creator/addTour"}
      className="tour_button"
      sx={{
        display: "block",
        width: { xs: 220, sm: 180, md: 205, lg: 280 },
        height: { xs: 330, sm: 270, md: 310, lg: 420 },
        backgroundColor: darkTurquoiseColor,
        borderRadius: "30px",
        position: "relative",
      }}
    >
      <img
        src={plus}
        alt="plus icon"
        style={{
          width: "40px",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
        className="tour_button_icon"
      />
    </Box>
  );
}

export default AddTourButton;
