import Tooltip, { TooltipProps, tooltipClasses } from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";
import {
  darkTurquoiseColor,
  whiteColor,
  lightTurquoiseColor,
  darkBlueColor,
} from "../color/color";

export const DarkStyledTooltip = styled(
  ({ className, ...props }: TooltipProps) => (
    <Tooltip
      {...props}
      classes={{ popper: className }}
      enterDelay={1000}
      leaveDelay={300}
    />
  )
)(({ theme }) => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: darkTurquoiseColor,
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: darkTurquoiseColor,
    color: whiteColor,
    fontFamily: "Montserrat",
    fontWeight: "400",
    borderRadius: "4px",
    fontSize: "14px",
  },
}));

export const LightStyledTooltip = styled(
  ({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} classes={{ popper: className }} />
  )
)(({ theme }) => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: lightTurquoiseColor,
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: lightTurquoiseColor,
    color: darkBlueColor,
    fontFamily: "Montserrat",
    fontWeight: "400",
    borderRadius: "4px",
    fontSize: "14px",
  },
}));
