import { createTheme } from "@mui/material";

import {
  darkBlueColor,
  darkTurquoiseColor,
  lightTurquoiseColor,
  redColor,
  whiteColor,
} from "../../color/color";

declare module "@mui/material/Button" {
  interface ButtonPropsVariantOverrides {
    high: true;
    whiteColor: true;
    textButton: true;
    fileInput: true;
    weakTextButton: true;
    arrowButton: true;
    errorButton: true;
    addTourImage: true;
    fullButton: true;
  }
}

declare module "@mui/material/InputBase" {
  interface InputBasePropsColorOverrides {
    whiteColor: true;
    lightTurquoiseColor: true;
  }
}

declare module "@mui/material/Paper" {
  interface PaperPropsVariantOverrides {
    helpButton: true;
    bigPadding: true;
    header: true;
    whiteBlue: true;
    postedTourItem: true;
    avatarBg: true;
  }
}

let breakpoints = createTheme({});

export const mainThemes = createTheme(breakpoints, {
  typography: {
    fontFamily: "Montserrat",
    h3: {
      fontFamily: "Jost",
      fontWeight: "800",
      fontSize: "50px",
      lineHeight: "50px",
      [breakpoints.breakpoints.down("lg")]: {
        fontWeight: "900",
        fontSize: "36px",
        lineHeight: "40px",
      },
    },
    h4: {
      fontFamily: "Jost",
      fontWeight: "800",
      fontSize: "34px",
      lineHeight: "40px",
      letterSpacing: "0.25px",
      [breakpoints.breakpoints.down("lg")]: {
        fontWeight: "900",
        fontSize: "20px",
        lineHeight: "24px",
      },
    },
    h5: {
      fontFamily: "Jost",
      fontWeight: "800",
      fontSize: "24px",
      lineHeight: "32px",
      [breakpoints.breakpoints.down("lg")]: {
        fontWeight: "900",
        fontSize: "14px",
        lineHeight: "16px",
      },
    },
    h6: {
      fontFamily: "Jost",
      fontWeight: "800",
      fontSize: "18px",
      lineHeight: "18px",
      [breakpoints.breakpoints.down("lg")]: {
        fontWeight: "900",
        fontSize: "12px",
        lineHeight: "12px",
      },
    },
    button: {
      fontFamily: "Jost",
      fontWeight: "700",
      fontSize: "20px",
      lineHeight: "20px",
      [breakpoints.breakpoints.down("lg")]: {
        fontSize: "14px",
        lineHeight: "14px",
      },
      [breakpoints.breakpoints.down("md")]: {
        fontSize: "12px",
        lineHeight: "12px",
      },
    },
    caption: {
      fontFamily: "Montserrat",
      fontWeight: "400",
      fontSize: "16px",
      lineHeight: "20px",
      [breakpoints.breakpoints.down("lg")]: {
        fontSize: "10px",
        lineHeight: "12px",
      },
    },
    body2: {
      fontFamily: "Montserrat",
      fontWeight: "400",
      fontSize: "14px",
      lineHeight: "20px",
    },
  },
  palette: {
    primary: {
      main: "#D2F7FF",
    },
    secondary: {
      main: whiteColor,
    },
  },
  components: {
    MuiContainer: {
      styleOverrides: {
        root: {
          maxWidth: "1200px !important",
          [breakpoints.breakpoints.down("lg")]: {
            maxWidth: "900px !important",
          },
          [breakpoints.breakpoints.down("md")]: {
            maxWidth: "600px !important",
          },
          [breakpoints.breakpoints.down("sm")]: {
            maxWidth: "260px !important",
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 30,
          padding: 30,
          "&.MuiPickersPopper-paper": {
            padding: 5,
          },
        },
      },
      variants: [
        {
          props: { variant: "helpButton" },
          style: {
            height: "70px",
            width: "70px",
            borderRadius: "50%",
            backgroundColor: lightTurquoiseColor,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer",
            padding: "15px",
            [breakpoints.breakpoints.down("lg")]: {
              width: "50px",
              height: "50px",
              padding: "10px",
            },
            [breakpoints.breakpoints.down("md")]: {
              width: "40px",
              height: "40px",
              padding: "7px",
            },
            [breakpoints.breakpoints.down("sm")]: {
              width: "40px",
              height: "40px",
            },
          },
        },
        {
          props: { variant: "bigPadding" },
          style: {
            padding: "50px",
          },
        },
        {
          props: { variant: "header" },
          style: {
            padding: 0,
            paddingLeft: "15px",
            paddingRight: "15px",
            backgroundColor: lightTurquoiseColor,
            height: 70,
            borderRadius: 0,
            [breakpoints.breakpoints.down("sm")]: {
              height: "50px",
            },
          },
        },
        {
          props: { variant: "whiteBlue" },
          style: {
            backgroundColor: whiteColor,
          },
        },
        {
          props: { variant: "postedTourItem" },
          style: {
            width: "507px",
            height: "140px",
            boxShadow: "none",
            padding: "30px 25px",
          },
        },
        {
          props: { variant: "avatarBg" },
          style: {
            width: "140px",
            height: "140px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: darkTurquoiseColor,
            borderRadius: "50%",
            padding: "0",
            boxShadow:
              "0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)",
            [breakpoints.breakpoints.down("lg")]: {
              width: "100px",
              height: "100px",
            },
            [breakpoints.breakpoints.down("md")]: {
              width: "80px",
              height: "80px",
            },
            [breakpoints.breakpoints.down("sm")]: {
              width: "50px",
              height: "50px",
            },
          },
        },
      ],
    },
    MuiAutocomplete: {
      styleOverrides: {
        root: {
          width: "100%",
          borderRadius: "30px",
          "&::label": {
            color: darkBlueColor,
            opacity: "1",
            fontSize: "16px",
            lineHeight: "20px",
            fontFamily: "Montserrat",
            fontWeight: "400",
          },
        },
        paper: {
          padding: "5px",
          fontSize: "16px",
          borderRadius: "20px",
          fontFamily: "Montserrat",
          fontWeight: "400",
          [breakpoints.breakpoints.down("lg")]: {
            fontSize: "10px",
            padding: "2px",
          },
        },
      },
    },
    MuiCalendarOrClockPicker: {
      styleOverrides: {
        root: {
          "& .MuiPickersToolbar-root": {
            "& .MuiTypography-root": {
              fontFamily: "Montserrat",
            },
            "& .MuiButtonBase-root": {
              backgroundColor: whiteColor,
            },
            "& .MuiDateTimePickerToolbar-timeContainer": {
              alignItems: "center",
            },
          },
          "& .MuiClockPicker-root": {
            "& .MuiClock-root": {
              "& .MuiClock-clock": {
                "& .MuiClock-pin": {
                  backgroundColor: darkTurquoiseColor,
                },
                "& .MuiClockPointer-root": {
                  backgroundColor: darkTurquoiseColor,
                  "& .MuiClockPointer-thumb": {
                    backgroundColor: lightTurquoiseColor,
                    border: `16px solid ${darkTurquoiseColor}`,
                  },
                },
                "& .MuiClock-wrapper": {
                  "& .Mui-selected": {
                    backgroundColor: darkTurquoiseColor,
                  },
                },
              },
            },
          },
          "& .MuiCalendarPicker-root": {
            "& .MuiPickersFadeTransitionGroup-root": {
              "& .MuiButtonBase-root": {
                "&.Mui-selected": {
                  backgroundColor: darkTurquoiseColor,
                },
              },
              "& .MuiPickersCalendarHeader-label": {
                fontFamily: "Montserrat",
              },
              "& .MuiYearPicker-root": {
                "& .PrivatePickersYear-root": {
                  "& .PrivatePickersYear-yearButton": {
                    fontFamily: "Montserrat",
                  },
                  "& .Mui-selected": {
                    backgroundColor: darkTurquoiseColor,
                  },
                },
              },
            },
          },
        },
      },
    },
    MuiCircularProgress: {
      styleOverrides: {
        root: {
          color: darkTurquoiseColor,
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          "& .MuiChip-deleteIcon": {
            [breakpoints.breakpoints.down("lg")]: {
              fontSize: "16px",
            },
            [breakpoints.breakpoints.down("sm")]: {
              fontSize: "12px",
            },
          },
          [breakpoints.breakpoints.down("lg")]: {
            height: "25px",
            fontSize: "11px",
          },
          [breakpoints.breakpoints.down("md")]: {
            height: "23px",
          },
          [breakpoints.breakpoints.down("sm")]: {
            height: "20px",
            fontSize: "9px",
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          minWidth: "fit-content",
          width: "fit-content",
          padding: "0 12px",
          backgroundColor: darkTurquoiseColor,
          height: "30px",
          borderRadius: "30px",
          fontFamily: "Jost",
          fontWeight: "700",
          fontSize: "20px",
          lineHeight: "20px",
          color: whiteColor,
          textTransform: "none",
          "&:hover": { backgroundColor: darkTurquoiseColor },
          "&.Mui-disabled": {
            backgroundColor: "#97d5e4",
            color: whiteColor,
          },
          [breakpoints.breakpoints.down("lg")]: {
            height: "20px",
            padding: "0 6px",
          },
        },
      },
      variants: [
        {
          props: { variant: "fullButton" },
          style: {
            height: "100%",
            [breakpoints.breakpoints.down("lg")]: {
              height: "100%",
              padding: "0 10px",
            },
            [breakpoints.breakpoints.down("sm")]: {
              height: "50px",
              width: "50px",
              padding: "0 10px",
            },
            "&:hover": { backgroundColor: "transparent" },
            width: "auto",
            borderRadius: 0,
            backgroundColor: "transparent",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer",
          },
        },
        {
          props: { variant: "high" },
          style: {
            height: "50px",
            [breakpoints.breakpoints.down("lg")]: {
              height: "30px",
              padding: "0 10px",
            },
          },
        },
        {
          props: { variant: "textButton" },
          style: {
            backgroundColor: "transparent",
            "&:hover": { backgroundColor: "transparent" },
            color: darkBlueColor,
          },
        },
        {
          props: { variant: "weakTextButton" },
          style: {
            backgroundColor: "transparent",
            "&:hover": { backgroundColor: "transparent" },
            color: darkBlueColor,
            fontFamily: "Montserrat",
            fontSize: "16px",
            fontWeight: 400,
            padding: 5,
          },
        },
        {
          props: { variant: "fileInput" },
          style: {
            letterSpacing: "0px",
            backgroundColor: lightTurquoiseColor,
            width: "100%",
            height: "50px",
            display: "flex",
            justifyContent: "space-between",
            "&:hover": { backgroundColor: lightTurquoiseColor },
            color: darkBlueColor,
            [breakpoints.breakpoints.down("lg")]: {
              height: "50px",
              padding: "0 16px",
            },
          },
        },
        {
          props: { variant: "arrowButton" },
          style: {
            minWidth: "34px",
            width: "fit-content",
            backgroundColor: whiteColor,
            color: darkBlueColor,
            borderRadius: "100%",
            height: "34px",
            padding: "0",
            [breakpoints.breakpoints.down("lg")]: {
              minWidth: "34px",
              width: "fit-content",
              backgroundColor: whiteColor,
              color: darkBlueColor,
              borderRadius: "100%",
              height: "34px",
              padding: "0",
            },
          },
        },
        {
          props: { variant: "errorButton" },
          style: {
            backgroundColor: redColor,
            "&:hover": { backgroundColor: redColor },
          },
        },
        {
          props: { variant: "addTourImage" },
          style: {
            width: "156px",
            height: "156px",
            margin: "0 auto 16px",
            [breakpoints.breakpoints.down("lg")]: {
              width: "156px",
              height: "156px",
              margin: "0 auto 16px",
            },
          },
        },
      ],
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          backgroundColor: lightTurquoiseColor,
          borderRadius: "30px",
          height: "50px",
          [breakpoints.breakpoints.down("lg")]: {
            height: "30px",
            borderRadius: "20px",
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          width: "100%",
          "& .MuiFormLabel-root": {
            color: darkBlueColor,
            opacity: "1",
            fontSize: "16px",
            lineHeight: "20px",
            fontFamily: "Montserrat",
            fontWeight: "400",
            [breakpoints.breakpoints.down("lg")]: {
              top: "-5px",
              fontSize: "10px",
              lineHeight: "12px",
            },
          },
          "& label.Mui-focused": {
            top: "2px",
            [breakpoints.breakpoints.down("lg")]: {
              top: "5px",
            },
          },
          "& label.MuiFormLabel-filled": {
            top: "2px",
            [breakpoints.breakpoints.down("lg")]: {
              top: "5px",
            },
          },
          "& label.Mui-error": {
            color: redColor,
          },
          input: {
            width: "100%",
            height: "50px",
            padding: "6px",
            borderRadius: "30px",
            border: "none",
            color: darkBlueColor,
            fontSize: "16px",
            lineHeight: "20px",
            fontFamily: "Montserrat",
            fontWeight: "400",
            boxSizing: "border-box",

            [breakpoints.breakpoints.down("lg")]: {
              height: "30px",
              borderRadius: "20px",
              fontSize: "10px",
              lineHeight: "12px",
            },

            "&::-webkit-outer-spin-button": {
              "-webkit-appearance": "none",
            },
            "&::-webkit-inner-spin-button": {
              "-webkit-appearance": "none",
            },
          },
          "& .MuiOutlinedInput-root": {
            "&:hover fieldset": {
              borderColor: lightTurquoiseColor,
            },
          },
          "& .MuiInputBase-colorPrimary": {
            "&:hover fieldset": {
              borderColor: lightTurquoiseColor,
            },
            input: {
              "&:-webkit-autofill": {
                WebkitBoxShadow: `0 0 0 1000px ${lightTurquoiseColor} inset`,
                borderRadius: "30px",
                fontSize: "10px",
                lineHeight: "12px",
              },
            },
          },
          "& .MuiInputBase-colorSecondary": {
            "&:hover fieldset": {
              borderColor: "#FFF",
            },
            input: {
              "&:-webkit-autofill": {
                WebkitBoxShadow: `0 0 0 1000px #FFF inset`,
                borderRadius: "30px",
              },
            },
          },
          "& .MuiInputBase-colorSecondary.Mui-focused, .MuiInputBase-colorSecondary.Mui-disabled":
            {
              fieldset: {
                borderColor: "#FFF",
              },
            },
          "& .MuiInputBase-colorSecondary.MuiOutlinedInput-root": {
            backgroundColor: "#FFF",
          },
          "& .Mui-error": {
            "&:hover fieldset": {
              borderColor: "#d32f2f",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#d32f2f",
            },
          },
          "& .Mui-disabled": {
            "& .MuiOutlinedInput-notchedOutline": {
              border: "none",
            },
          },
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          fontFamily: "Montserrat",
          padding: "0 15px 0 12px !important ",
          [breakpoints.breakpoints.down("lg")]: {
            padding: "0 8px 0 6px !important ",
          },
        },
      },
      variants: [
        {
          props: { color: "primary" },
          style: {
            input: {
              backgroundColor: lightTurquoiseColor,
              borderRadius: "30px",
            },
            fieldset: {
              borderColor: lightTurquoiseColor,
            },
          },
        },
        {
          props: { color: "secondary" },
          style: {
            input: {
              backgroundColor: "#FFF",
              borderRadius: "30px",
            },
            fieldset: {
              borderColor: "#FFF",
            },
          },
        },
      ],
    },
    MuiFormLabel: {
      styleOverrides: {
        root: {
          color: darkBlueColor,
          "&.Mui-focused": {
            color: darkBlueColor,
          },
        },
      },
    },
    MuiTypography: {
      defaultProps: {
        variantMapping: {
          h1: "div",
          h2: "div",
          h3: "div",
          h4: "div",
          h5: "div",
          h6: "div",
          subtitle1: "div",
          subtitle2: "div",
          button: "div",
          caption: "div",
          body1: "div",
          body2: "div",
          inherit: "div",
        },
      },
      styleOverrides: {
        root: {
          color: darkBlueColor,
          textTransform: "none",
        },
      },
    },
    MuiRadio: {
      styleOverrides: {
        root: {
          color: darkBlueColor,
          "&.Mui-checked": {
            color: darkBlueColor,
          },
          [breakpoints.breakpoints.down("lg")]: {
            padding: "5px 9px",
          },
          [breakpoints.breakpoints.down("md")]: {
            padding: "3px 9px",
          },
        },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          color: darkBlueColor,
          "&.Mui-checked": {
            color: darkTurquoiseColor,
          },
          [breakpoints.breakpoints.down("lg")]: {
            padding: "5px 9px",
          },
          [breakpoints.breakpoints.down("md")]: {
            padding: "3px 9px",
          },
        },
      },
    },
    MuiFormControlLabel: {
      styleOverrides: {
        root: {
          "& .MuiTypography-root": {
            fontFamily: "Montserrat",
            fontSize: "16px",
            [breakpoints.breakpoints.down("lg")]: {
              fontSize: "10px",
            },
          },
        },
      },
    },
    MuiAccordion: {
      styleOverrides: {
        root: {
          backgroundColor: whiteColor,
          borderRadius: 0,
          "&.MuiPaper-root": {
            borderRadius: 20,
            padding: 0,
            "&.MuiAccordion-root": {
              "&.Mui-expanded": { margin: "0" },
            },
          },
          "&:before": {
            backgroundColor: "rgba(0,0,0,0)",
          },
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
    MuiDialog: {
      styleOverrides: {
        paper: {
          backgroundColor: whiteColor,
          [breakpoints.breakpoints.down("sm")]: {
            padding: "20px",
          },
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        root: {
          borderRadius: 30,
          [breakpoints.breakpoints.down("lg")]: {
            borderRadius: 20,
            minHeight: "30px",
            height: "30px",
          },
        },
        indicator: {
          visibility: "hidden",
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: "none",
          backgroundColor: lightTurquoiseColor,
          color: darkBlueColor,
          "&.Mui-selected": {
            backgroundColor: darkTurquoiseColor,
            color: whiteColor,
          },
          [breakpoints.breakpoints.down("lg")]: {
            minHeight: "30px",
            padding: "5px 15px",
          },
        },
      },
    },
  },
});
