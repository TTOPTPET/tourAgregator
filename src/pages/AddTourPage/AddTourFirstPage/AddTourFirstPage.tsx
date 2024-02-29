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
import { Dispatch, SetStateAction, FC, useState } from "react";
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
}

export const AddTourFirstPage: FC<IAddTourFirstPageProps> = ({
  images,
  setImage,
  tourInfo,
  setTourInfo,
  isEditing,
  addError,
}) => {
  const country: ICatalog[] = useSelector(
    (state: RootState) => state?.catalogs?.country as ICatalog[]
  );

  const category: ICatalog[] = useSelector(
    (state: RootState) => state?.catalogs?.category as ICatalog[]
  );

  console.log(images);

  const media = useMediaQuery("(max-width: 1200px)", { noSsr: true });

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
          onChange={(e) =>
            setTourInfo({ ...tourInfo, tourName: e.target.value })
          }
        />
        <AddTourImage
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
          onChange={(e) =>
            setTourInfo({ ...tourInfo, tourDescription: e.target.value })
          }
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
                  onChange={(e) =>
                    setTourInfo({ ...tourInfo, region: String(e.target.value) })
                  }
                  label="Регион"
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
        <Grid item container md={6}>
          <Typography variant={"h6"}>Рекомендуемый возраст</Typography>
          <Stack direction={"row"} gap={2} width={"100%"}>
            <TextField
              InputProps={{ inputProps: { min: 0 } }}
              type={"number"}
              label={"От"}
              value={tourInfo?.recommendedAgeFrom || ""}
              required
              error={
                (addError && tourInfo?.recommendedAgeFrom === undefined) ||
                tourInfo?.recommendedAgeFrom === 0
              }
              onChange={(e) =>
                setTourInfo({
                  ...tourInfo,
                  recommendedAgeFrom: +e.target.value,
                })
              }
            />
            <TextField
              InputProps={{ inputProps: { min: 0 } }}
              type={"number"}
              label={"До"}
              value={tourInfo?.recommendedAgeTo || ""}
              required
              error={
                (addError && tourInfo?.recommendedAgeTo === undefined) ||
                tourInfo?.recommendedAgeTo === 0
              }
              onChange={(e) =>
                setTourInfo({
                  ...tourInfo,
                  recommendedAgeTo: +e.target.value,
                })
              }
            />
          </Stack>
        </Grid>
      </Grid>
    </Grid>
  );
};
