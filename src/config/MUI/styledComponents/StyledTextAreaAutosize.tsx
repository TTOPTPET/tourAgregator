import TextareaAutosize from "@mui/material/TextareaAutosize";
import { styled } from "@mui/material/styles";
import { darkBlueColor } from "../color/color";

export const StyledTextAreaAutosize = styled(TextareaAutosize)((props) => ({
  margin: "20px 0",
  minHeight: "134px",
  minWidth: "100%",
  maxWidth: "100%",
  border: "none",
  borderRadius: "30px",
  padding: "12px 17px",
  fontFamily: "Montserrat",
  fontSize: "16px",
  lineHeight: "20px",
  color: darkBlueColor,
  "&:focus": {
    border: "none",
    outline: "none",
  },
  "&::label": {
    color: darkBlueColor,
    opacity: 1,
  },
}));
