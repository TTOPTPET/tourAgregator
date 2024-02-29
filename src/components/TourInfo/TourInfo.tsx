import {
  Box,
  Grid,
  Skeleton,
  Stack,
  SvgIcon,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import WalkingGuy from "../../media/walking-guy.svg";
import MapMarker from "../../media/map-marker.svg";
import ArrowRight from "../../media/right-arrow-navigation.svg";
import ArrowLeft from "../../media/left-arrow-navigation.svg";
import Carousel from "react-material-ui-carousel";
import { Dispatch, FC, SetStateAction } from "react";
import { Attention } from "../../components/Attention/Attention";
import { IAddTour } from "../../models/addTourModels/IAddTour";
import { ITourInfo } from "../../models/tourModels/ITourInfo";
import dayjs from "dayjs";
import { baseUrl } from "../../config/config";
import MapLeaflet from "../MapLeaflet/MapLeaflet";
import TourCreatorInfo from "../../pages/TourPage/TourCreatorInfo/TourCreatorInfo";
import { ICatalog } from "../../models/tourListModels/ICatalog";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

interface ITourInfoProps {
  images: any[];
  setImage: Dispatch<SetStateAction<any[]>>;
  addTourInfo: boolean;
  tourInfo: IAddTour | ITourInfo;
  isEditing: boolean;
}

export const TourInfo: FC<ITourInfoProps> = ({
  images,
  setImage,
  addTourInfo,
  tourInfo,
  isEditing,
}) => {
  const theme = useTheme();

  const country: ICatalog[] = useSelector(
    (state: RootState) => state?.catalogs?.country as ICatalog[]
  );

  const category: ICatalog[] = useSelector(
    (state: RootState) => state?.catalogs?.category as ICatalog[]
  );

  const complexity: ICatalog[] = useSelector(
    (state: RootState) => state?.catalogs?.complexity as ICatalog[]
  );

  const lessThenBig = useMediaQuery(theme.breakpoints.down("lg"));
  const lessThenMid = useMediaQuery(theme.breakpoints.down("md"));
  const upperThenSmall = useMediaQuery(theme.breakpoints.up("sm"));
  const lessThenSmall = useMediaQuery(theme.breakpoints.down("sm"));

  const tagsConverter = (key: "free" | "additional") => {
    switch (key) {
      case "free": {
        return tourInfo?.freeServices && tourInfo?.freeServices?.length !== 0
          ? tourInfo?.freeServices.map((service, index) =>
              index === tourInfo?.freeServices!.length - 1
                ? `${service}`
                : `${service} • `
            )
          : "Ничего не включено";
      }
      case "additional": {
        return tourInfo?.additionalServices &&
          tourInfo?.additionalServices?.length !== 0
          ? tourInfo?.additionalServices.map((service, index) =>
              index === tourInfo?.additionalServices!.length - 1
                ? `${service}`
                : `${service} • `
            )
          : "Ничего не включено";
      }
    }
  };

  const dataConverter = (key: "region" | "category" | "complexity") => {
    switch (key) {
      case "region": {
        return tourInfo?.region
          ? country.map(
              (region) => region.code === tourInfo?.region && `${region.name}`
            )
          : "Регион";
      }
      case "category": {
        return tourInfo?.category
          ? category.map(
              (category) =>
                category.code === tourInfo?.category && `${category.name}`
            )
          : "Категория";
      }
      case "complexity": {
        return tourInfo?.complexity
          ? complexity.map(
              (complexity) =>
                complexity.code === tourInfo?.complexity && `${complexity.name}`
            )
          : "Сложность";
      }
    }
  };

  return (
    <>
      <Stack direction={"row"} alignItems={"center"} gap={1} marginBottom={2}>
        <Stack direction={"row"} alignItems={"center"}>
          <Box
            className="tour-info-region-icon"
            sx={{
              width: { lg: "26px", xs: "18px" },
              height: { lg: "26px", xs: "18px" },
            }}
          >
            <img
              src={MapMarker}
              alt="Map Marker"
              style={{ objectFit: "contain", width: "100%", height: "100%" }}
            />
          </Box>
          <Typography variant={"caption"}>{dataConverter("region")}</Typography>
        </Stack>
        <Stack direction={"row"} alignItems={"center"}>
          <Box
            className="tour-info-region-icon"
            sx={{
              width: { lg: "26px", xs: "18px" },
              height: { lg: "26px", xs: "18px" },
            }}
          >
            <img
              src={WalkingGuy}
              alt="Walking Guy"
              style={{ objectFit: "contain", width: "100%", height: "100%" }}
            />
          </Box>
          <Typography variant={"caption"}>
            {dataConverter("category")}
          </Typography>
        </Stack>
      </Stack>
      <Grid container justifyContent={"space-between"}>
        <Grid
          item
          width={{
            lg: "490px",
            md: "348px",
            sm: "300px",
            xs: "260px",
          }}
          md={5.1}
          sm={5.1}
          className="addtour__carousel"
        >
          <Carousel
            navButtonsAlwaysVisible
            sx={{
              height: { lg: "490px", md: "348px", sm: "300px", xs: "260px" },
              width: { lg: "490px", md: "348px", sm: "300px", xs: "260px" },
            }}
            indicators={false}
            navButtonsProps={{
              style: {
                backgroundColor: "white",
                width: lessThenBig ? "24px" : "36px",
                height: lessThenBig ? "24px" : "36px",
              },
            }}
            NextIcon={
              <Box
                className="tour-info-region-icon"
                sx={{
                  width: "20px",
                  height: "20px",
                }}
              >
                <img
                  src={ArrowRight}
                  alt="Map Marker"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    objectFit: "contain",
                    width: "100%",
                    height: "100%",
                  }}
                />
              </Box>
            }
            PrevIcon={
              <Box
                className="tour-info-region-icon"
                sx={{
                  width: "20px",
                  height: "20px",
                }}
              >
                <img
                  src={ArrowLeft}
                  alt="Map Marker"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    objectFit: "contain",
                    width: "100%",
                    height: "100%",
                  }}
                />
              </Box>
            }
          >
            {tourInfo?.photos ? (
              tourInfo?.photos.map((image, index) => (
                <Box
                  key={index}
                  sx={{
                    width: {
                      lg: "490px",
                      md: "348px",
                      sm: "300px",
                      xs: "260px",
                    },
                    height: {
                      lg: "490px",
                      md: "348px",
                      sm: "300px",
                      xs: "260px",
                    },
                  }}
                >
                  <img
                    src={
                      typeof image === "string"
                        ? image
                        : URL.createObjectURL(image)
                    }
                    alt={`tour`}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      borderRadius: "40px",
                    }}
                  />
                </Box>
              ))
            ) : (
              <Box
                sx={{
                  width: {
                    lg: "490px",
                    md: "348px",
                    sm: "300px",
                    xs: "260px",
                  },
                  height: {
                    lg: "490px",
                    md: "348px",
                    sm: "300px",
                    xs: "260px",
                  },
                }}
              >
                <Skeleton
                  width={"100%"}
                  height={"100%"}
                  variant="rounded"
                  sx={{ borderRadius: "40px" }}
                />
                <Typography
                  variant={"h4"}
                  sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    textAlign: "center",
                    transform: "translatey(-50%) translatex(-50%)",
                    color: "rgba(0, 0, 0, 0.2)",
                    textTransform: "uppercase",
                  }}
                >
                  Выберите фото
                </Typography>{" "}
              </Box>
            )}
          </Carousel>
        </Grid>
        <Grid
          container
          direction={"column"}
          item
          md={6}
          sm={4.5}
          gap={{ lg: 2, sm: 1, xs: 1 }}
        >
          {lessThenMid && upperThenSmall && !addTourInfo && !isEditing && (
            <TourCreatorInfo tourInfo={tourInfo as ITourInfo} />
          )}
          {isEditing ? (
            <Attention text="Обращаем Ваше внимание, что все изменения будут применены только к предстоящим записям. Забронированные туры обслуживаются по старому тарифу." />
          ) : (
            <></>
          )}
          {/* <Typography variant={"h5"} sx={{ mt: lessThenSmall ? "10px" : "" }}>
              {tourInfo?.price !== undefined
                ? tourInfo?.price / 100 || 0
                : tourInfo?.prices?.from === tourInfo?.prices?.to
                ? tourInfo?.prices?.from / 100
                : (tourInfo?.prices?.from / 100 || 0) +
                  " до " +
                  (tourInfo?.prices?.to / 100 || 10000)}
              ₽
            </Typography> */}
          {addTourInfo ? (
            <></>
          ) : (
            <>
              <Typography variant={"h6"}>Дата ближайшего тура</Typography>
              <Typography variant={"caption"}>
                {"nearestDate" in tourInfo
                  ? (dayjs(tourInfo?.nearestDate?.from).format("D MMMM YYYY") ||
                      "") +
                    " - " +
                    (dayjs(tourInfo?.nearestDate?.to).format("D MMMM YYYY") ||
                      "")
                  : ""}
              </Typography>
            </>
          )}
          <Typography variant={"h6"}>Рекомендуемый возраст</Typography>
          <Typography variant={"caption"}>
            {tourInfo?.recommendedAgeFrom === tourInfo?.recommendedAgeTo
              ? "C " + (tourInfo?.recommendedAgeTo || "14")
              : (tourInfo?.recommendedAgeFrom || "") +
                (tourInfo?.recommendedAgeTo !== undefined || null
                  ? " - "
                  : "") +
                (tourInfo?.recommendedAgeTo || "+")}
          </Typography>

          <Typography variant={"h6"}>Сложность</Typography>
          <Typography variant={"caption"}>
            {dataConverter("complexity")}
          </Typography>

          <Typography variant={"h6"}>Включено в стоимость</Typography>
          <Typography variant={"caption"}>{tagsConverter("free")}</Typography>
          <Typography variant={"h6"}>Дополнительные услуги</Typography>
          <Typography variant={"caption"}>
            {tagsConverter("additional")}
          </Typography>

          <Typography variant={"h6"}>Описание</Typography>
          <Typography variant={"caption"} sx={{ mb: "10px" }}>
            {tourInfo?.tourDescription || "Описание тура"}
          </Typography>
          {!addTourInfo && !isEditing && (
            <TourCreatorInfo tourInfo={tourInfo as ITourInfo} />
          )}
        </Grid>
      </Grid>
      <Typography
        variant={"h5"}
        mt={{ lg: 4, sm: 2, xs: 1 }}
        mb={{ sm: 2, xs: 1 }}
      >
        Маршрут
      </Typography>
      {tourInfo?.mapPoints && tourInfo?.mapPoints.length === 0 ? (
        <Box sx={{ width: "100%", position: "relative" }}>
          <Skeleton
            variant="rounded"
            height={"330px"}
            sx={{ borderRadius: "10px" }}
          />
          <Typography
            variant={"h4"}
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              textAlign: "center",
              transform: "translatey(-50%) translatex(-50%)",
              color: "rgba(0, 0, 0, 0.2)",
              textTransform: "uppercase",
            }}
          >
            Маршрут не выбран
          </Typography>
        </Box>
      ) : (
        <MapLeaflet
          width={"100%"}
          height={"330px"}
          accessType="observe"
          mapCenter={tourInfo?.mapPoints ? tourInfo?.mapPoints[0] : undefined}
          positions={tourInfo?.mapPoints as [number, number][]}
        />
      )}
    </>
  );
};
