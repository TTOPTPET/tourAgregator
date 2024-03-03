import {
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { AddTourImage } from "../../../components/AddTourModules/AddTourImage/AddTourImage";
import { Dispatch, SetStateAction, FC, useState, useEffect } from "react";
import { Attention } from "../../../components/Attention/Attention";
import { StyledTextAreaAutosize } from "../../../config/MUI/styledComponents/StyledTextAreaAutosize";
import { lightTurquoiseColor, redColor } from "../../../config/MUI/color/color";
import { IAddTour } from "../../../models/addTourModels/IAddTour";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { ICatalog } from "../../../models/tourListModels/ICatalog";

interface IAddTourFirstPageProps {
  images: any[];
  setImage: Dispatch<SetStateAction<any[]>>;
  tourInfo: IAddTour;
  setTourInfo: Dispatch<SetStateAction<IAddTour>>;
  isEditing: boolean;
  addError: boolean;
  setAgeErrorStatus: Dispatch<SetStateAction<boolean>>;
  ageErrorStatus: boolean;
}

export const AddTourFirstPage: FC<IAddTourFirstPageProps> = ({
  images,
  setImage,
  tourInfo,
  setTourInfo,
  isEditing,
  addError,
  setAgeErrorStatus,
  ageErrorStatus,
}) => {
  const country: ICatalog[] = useSelector(
    (state: RootState) => state?.catalogs?.country as ICatalog[]
  );

  const category: ICatalog[] = useSelector(
    (state: RootState) => state?.catalogs?.category as ICatalog[]
  );

  const [ageErrorMessage, setAgeErrorMessage] = useState("");

  const media = useMediaQuery("(max-width: 1200px)", { noSsr: true });

  useEffect(() => {
    if (
      tourInfo.recommendedAgeFrom &&
      tourInfo.recommendedAgeTo &&
      tourInfo.recommendedAgeFrom > tourInfo.recommendedAgeTo
    ) {
      setAgeErrorStatus(true);
      setAgeErrorMessage("Возраст 'от' больше возраста 'до'!");
    } else {
      setAgeErrorStatus(false);
      setAgeErrorMessage("");
    }
  }, [tourInfo.recommendedAgeFrom, tourInfo.recommendedAgeTo]);

  const handleAgeChange = (num: any, type: string) => {
    const onlyNums = num.replace(/[^0-9]/g, "");
    if (num === "" || onlyNums.length < 4) {
      if (type === "recomendedAgeFrom") {
        setTourInfo({
          ...tourInfo,
          recommendedAgeFrom: Number(num),
        });
      } else {
        setTourInfo({
          ...tourInfo,
          recommendedAgeTo: Number(num),
        });
      }
    }
  };

  return (
    <Grid container justifyContent={media ? "center" : "space-between"}>
      <Grid item xs={5.2} minWidth={500}>
        <TextField
          label={"Название тура"}
          value={tourInfo?.tourName || ""}
          required
          error={
            (addError && tourInfo?.tourName === undefined) ||
            tourInfo?.tourName === ""
          }
          sx={{ marginBottom: "15px" }}
          onChange={(e) => {
            setTourInfo({ ...tourInfo, tourName: e.target.value });
          }}
          inputProps={{ maxLength: 50 }}
        />
        <AddTourImage
          addError={addError}
          images={images}
          setImage={setImage}
          tourInfo={tourInfo}
          setTourInfo={setTourInfo}
          isEditing={isEditing}
        />
        <Typography variant={"h6"} marginBottom={1}>
          Описание
        </Typography>
        <StyledTextAreaAutosize
          placeholder={"Описание тура (не более 2500 символов)"}
          maxLength={2500}
          minRows={2}
          sx={{
            minHeight: "30px",
            backgroundColor: lightTurquoiseColor,
            margin: "0 0",
            border:
              (addError && tourInfo?.tourDescription === undefined) ||
              tourInfo?.tourDescription === ""
                ? `1px solid ${redColor}`
                : "",
          }}
          value={tourInfo?.tourDescription || ""}
          onChange={(e) => {
            setTourInfo({ ...tourInfo, tourDescription: e.target.value });
          }}
        />
      </Grid>
      <Grid
        container
        item
        xs={6}
        justifyContent={"flex-start"}
        minWidth={500}
        mt={media ? 2 : 0}
      >
        {isEditing && (
          <Grid item>
            <Attention text="Обращаем Ваше внимание, что все изменения будут применены только к предстоящим записям. Забронированные туры обслуживаются по старому тарифу." />
          </Grid>
        )}

        <Grid container item justifyContent={"space-between"} mt={2}>
          <Grid item md={6}>
            <Stack direction={"column"}>
              <Typography variant={"h6"} marginBottom={1}>
                Регион проведения
              </Typography>
              <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="demo-simple-select-standard-label">
                  Регион
                </InputLabel>
                <Select
                  value={tourInfo?.region || ""}
                  onChange={(e) => {
                    setTourInfo({
                      ...tourInfo,
                      region: String(e.target.value),
                    });
                  }}
                  label="Регион"
                  error={
                    (addError && tourInfo?.region === undefined) ||
                    tourInfo?.region === ""
                  }
                >
                  <MenuItem value="">
                    <em>-</em>
                  </MenuItem>
                  {country.map((region) => {
                    return (
                      <MenuItem key={region.code} value={region.code}>
                        {region.name}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Stack>
          </Grid>
          <Grid item md={4.5}>
            <Stack direction={"column"}>
              <Typography variant={"h6"}>Категория тура</Typography>
              <RadioGroup
                value={tourInfo?.category || ""}
                onChange={(e) =>
                  setTourInfo({
                    ...tourInfo,
                    category: e.target.value,
                  })
                }
              >
                {category.map((category) => (
                  <FormControlLabel
                    key={category.code}
                    value={category.code}
                    control={
                      <Radio
                        sx={{
                          color:
                            (addError && tourInfo?.category === undefined) ||
                            tourInfo?.category === ""
                              ? redColor
                              : "",
                        }}
                      />
                    }
                    label={category.name}
                  />
                ))}
              </RadioGroup>
            </Stack>
          </Grid>
        </Grid>
        <Grid item container md={7}>
          <Stack>
            <Typography variant={"h6"} sx={{ mb: "15px" }}>
              Рекомендуемый возраст
            </Typography>
            <Stack direction={"row"} gap={2} width={"100%"} sx={{ mb: "15px" }}>
              <TextField
                InputProps={{ inputProps: { min: 0 } }}
                label={"От"}
                value={tourInfo?.recommendedAgeFrom || ""}
                required
                error={
                  (addError && tourInfo?.recommendedAgeFrom === undefined) ||
                  tourInfo?.recommendedAgeFrom === 0 ||
                  ageErrorStatus
                }
                onChange={(e) => {
                  Number.isInteger(+e.target.value)
                    ? handleAgeChange(e.target.value, "recomendedAgeFrom")
                    : null;
                }}
              />
              <TextField
                InputProps={{ inputProps: { min: 0 } }}
                label={"До"}
                value={tourInfo?.recommendedAgeTo || ""}
                required
                error={
                  (addError && tourInfo?.recommendedAgeTo === undefined) ||
                  tourInfo?.recommendedAgeTo === 0 ||
                  ageErrorStatus
                }
                onChange={(e) => {
                  Number.isInteger(+e.target.value)
                    ? handleAgeChange(e.target.value, "recomendedAgeTo")
                    : null;
                }}
              />
            </Stack>
            {ageErrorStatus && (
              <Typography
                variant="caption"
                className="author__error"
                sx={{ color: redColor, margin: "0 auto" }}
              >
                {ageErrorMessage}
              </Typography>
            )}
          </Stack>
        </Grid>
      </Grid>
    </Grid>
  );
};
