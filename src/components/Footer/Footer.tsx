import { Container, Stack, Typography, useMediaQuery } from "@mui/material";
import { darkBlueColor } from "../../config/MUI/color/color";
import { Link } from "react-router-dom";

import vkIcon from "../../media/vk-icon-contactPage.svg";

const Footer = () => {
  const media = useMediaQuery("(max-width: 680px)");

  return (
    <Container sx={{ p: 0 }}>
      <Stack
        direction={media ? "column" : "row"}
        padding={"20px"}
        sx={{ width: "100%" }}
        justifyContent={"center"}
        textAlign={"center"}
        gap={"15px"}
      >
        <Stack direction={"column"} gap={"20px"}>
          <Typography variant={"caption"}>© 2024 «СвойПуть.ру»</Typography>
          <Typography variant={"caption"}>
            Проект на{" "}
            <span style={{ fontFamily: "Unbounded", color: darkBlueColor }}>
              {" "}
              deeplom
            </span>
          </Typography>
        </Stack>
      </Stack>
    </Container>
  );
};

export default Footer;
