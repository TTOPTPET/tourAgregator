import {
  Chip,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useState, FC, Dispatch, SetStateAction, useRef } from "react";
import { redColor } from "../../../config/MUI/color/color";
import MapLeaflet from "../../../components/MapLeaflet/MapLeaflet";
import { IAddTour } from "../../../models/addTourModels/IAddTour";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { ICatalog } from "../../../models/tourListModels/ICatalog";

interface IAddTourSecondPageProps {
  addError: boolean;
  tourInfo: IAddTour;
  setTourInfo: Dispatch<SetStateAction<IAddTour>>;
}

export const AddTourSecondPage: FC<IAddTourSecondPageProps> = ({
  addError,
  tourInfo,
  setTourInfo,
}) => {
  const complexity: ICatalog[] = useSelector(
    (state: RootState) => state?.catalogs?.complexity as ICatalog[]
  );

  const [freeText, setFreeText] = useState("");
  const [additionalText, setAdditionalText] = useState("");

  const handleDeleteTourServices = (e: string, key: "free" | "additional") => {
    switch (key) {
      case "free": {
        setTourInfo({
          ...tourInfo,

          freeServices: [
            ...((tourInfo.freeServices &&
              tourInfo?.freeServices.filter((item) => item !== e)) ||
              []),
          ],
        });
        break;
      }
      case "additional": {
        setTourInfo({
          ...tourInfo,
          additionalServices: [
            ...((tourInfo.additionalServices &&
              tourInfo?.additionalServices.filter((item) => item !== e)) ||
              []),
          ],
        });
        break;
      }
      default:
        break;
    }
  };

  const handleFreeServices = (e: any) => {
    if (tourInfo?.freeServices) {
      if (
        e.keyCode === 13 &&
        e.target.value &&
        !tourInfo?.freeServices.includes(e.target.value)
      ) {
        setTourInfo({
          ...tourInfo,
          freeServices: [...(tourInfo?.freeServices || []), e.target.value],
        });
        setFreeText("");
      }
    } else if (e.keyCode === 13 && e.target.value) {
      setTourInfo({
        ...tourInfo,
        freeServices: [...(tourInfo?.freeServices || []), e.target.value],
      });
      setFreeText("");
    }
  };

  const handleAdditionalServices = (e: any) => {
    if (tourInfo?.additionalServices) {
      if (
        e.keyCode === 13 &&
        e.target.value &&
        !tourInfo?.additionalServices.includes(e.target.value)
      ) {
        setTourInfo({
          ...tourInfo,
          additionalServices: [
            ...(tourInfo?.additionalServices || []),
            e.target.value,
          ],
        });
        setAdditionalText("");
      }
    } else if (e.keyCode === 13 && e.target.value) {
      setTourInfo({
        ...tourInfo,
        additionalServices: [
          ...(tourInfo?.additionalServices || []),
          e.target.value,
        ],
      });
      setAdditionalText("");
    }
  };

  return (
    <Stack gap={1}>
      <Typography variant={"h3"}>
        {tourInfo?.tourName || "Название тура"}
      </Typography>
      <Grid container item direction={"row"} justifyContent={"space-between"}>
        <Grid item sm={3.5} className="add__residency">
          <Typography variant={"h5"}>Включено в стоимость</Typography>
          <Stack flexWrap={"wrap"} direction={"row"} gap={1} marginBottom={1}>
            {tourInfo?.freeServices &&
              tourInfo?.freeServices.map((tag, index) => (
                <Chip
                  key={index}
                  label={tag}
                  variant={"outlined"}
                  onDelete={() => handleDeleteTourServices(tag, "free")}
                />
              ))}
          </Stack>
          <TextField
            label={"Услуга"}
            sx={{ width: "75%" }}
            onKeyDown={handleFreeServices}
            value={freeText}
            onChange={(e) => setFreeText(e.target.value)}
          />
        </Grid>
        <Grid item sm={3.5} className="add__insurance">
          <Typography variant={"h5"}>Дополнительные услуги</Typography>
          <Stack flexWrap={"wrap"} direction={"row"} gap={1} marginBottom={1}>
            {tourInfo?.additionalServices &&
              tourInfo?.additionalServices.map((tag, index) => (
                <Chip
                  key={index}
                  label={tag}
                  variant={"outlined"}
                  onDelete={() => handleDeleteTourServices(tag, "additional")}
                />
              ))}
          </Stack>
          <TextField
            label={"Услуга"}
            sx={{ width: "75%" }}
            onKeyDown={handleAdditionalServices}
            value={additionalText}
            onChange={(e) => setAdditionalText(e.target.value)}
          />
        </Grid>
        <Stack minHeight={350}>
          <Typography variant={"h5"}>Сложность маршрута</Typography>
          <RadioGroup
            value={tourInfo?.complexity || ""}
            onChange={(e) =>
              setTourInfo({ ...tourInfo, complexity: e.target.value })
            }
          >
            {complexity.map((complexity) => (
              <FormControlLabel
                key={complexity.code}
                label={complexity.name}
                control={
                  <Radio
                    sx={{
                      color:
                        (addError && tourInfo?.complexity === undefined) ||
                        tourInfo?.complexity === ""
                          ? redColor
                          : "",
                    }}
                  />
                }
                value={complexity.code}
              />
            ))}
          </RadioGroup>
        </Stack>
      </Grid>
      <Typography variant={"h5"} mt={5}>
        Маршрут
      </Typography>
      <MapLeaflet
        width={"100%"}
        height={"330px"}
        accessType="insert"
        positions={tourInfo?.mapPoints as [number, number][]}
        mapCenter={tourInfo?.mapPoints ? tourInfo?.mapPoints[0] : undefined}
        setPositions={(positions) => {
          setTourInfo({ ...tourInfo, mapPoints: positions });
        }}
      />
    </Stack>
  );
};
