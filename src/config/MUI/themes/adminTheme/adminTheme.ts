import { createTheme } from "@mui/material";
import {
  darkBlueColor,
  darkTurquoiseColor,
  lightTurquoiseColor,
  redColor,
  whiteColor,
} from "../../color/color";

export const themes = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "15px",
          textTransform: "none",
          maxHeight: "70px",
          color: darkBlueColor,
          "&:active": {
            backgroundColor: darkTurquoiseColor,
            color: whiteColor,
          },
          "&.active": {
            backgroundColor: lightTurquoiseColor,
          },
        },
      },
      variants: [
        {
          props: { color: "error" },
          style: {
            color: redColor,
            "&:active": {
              backgroundColor: redColor,
            },
          },
        },
        {
          props: { color: "secondary" },
          style: {
            backgroundColor: lightTurquoiseColor,
            width: "100%",
            "&:hover": {
              backgroundColor: darkBlueColor,
              color: whiteColor,
            },
            "&:active": {
              backgroundColor: redColor,
            },
          },
        },
        {
          props: { color: "info" },
          style: {
            justifyContent: "left",
            width: "250px",
          },
        },
      ],
    },
    MuiTypography: {
      styleOverrides: {
        root: {},
      },
      variants: [
        {
          props: { variant: "h4" },
          style: {
            fontSize: 24,
            marginTop: 5,
          },
        },
        {
          props: { variant: "h5" },
          style: {
            fontSize: 16,
            marginTop: 10,
          },
        },
      ],
    },
    MuiAccordion: {
      styleOverrides: {
        root: {
          backgroundColor: whiteColor,
          borderRadius: 20,
        },
      },
    },
    MuiAccordionSummary: {
      styleOverrides: {
        root: {
          backgroundColor: lightTurquoiseColor,
          borderRadius: 20,
        },
      },
    },
  },
});
