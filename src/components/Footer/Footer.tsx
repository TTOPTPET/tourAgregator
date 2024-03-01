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
        justifyContent={media ? "center" : "space-between"}
        textAlign={"center"}
        gap={"15px"}
      >
        <Stack direction={"column"} gap={"15px"}>
          <Typography variant={"caption"}>© 2023 «СвойПуть.ру»</Typography>
          <Typography variant={"caption"}>
            Проект на{" "}
            <span style={{ fontFamily: "Unbounded", color: darkBlueColor }}>
              {" "}
              deeplom
            </span>
          </Typography>
        </Stack>
        <Stack
          direction={media ? "column" : "row"}
          gap={media ? "15px" : "30px"}
        >
          <Typography
            variant={"caption"}
            component={Link}
            to={"/"}
            style={{ textDecoration: "none" }}
          >
            Пользовательское соглашение
          </Typography>
          <Typography
            variant={"caption"}
            component={Link}
            to={"/documents"}
            style={{ textDecoration: "none" }}
          >
            Юридическая информация
          </Typography>
          <Typography
            variant={"caption"}
            component={Link}
            to={"/contacts"}
            style={{ textDecoration: "none" }}
          >
            Контакты
          </Typography>
        </Stack>
        {/* <a
          href="https://vk.com/way_to_mountains"
          rel={"noreferrer"}
          target={"_blank"}
          style={{ float: "right" }}
        >
          <img src={vkIcon} alt="vk icon" style={{ width: "20px" }} />
        </a> */}
      </Stack>
    </Container>
  );
};

export default Footer;
