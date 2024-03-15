import {
  Button,
  Dialog,
  DialogContent,
  Typography,
  Stack,
  Autocomplete,
  TextField,
  Box,
} from "@mui/material";

import { SetStateAction, Dispatch, useState, useEffect } from "react";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "dayjs/locale/ru";
import {
  DateTimePicker,
  LocalizationProvider,
  PickersLocaleText,
  renderTimeViewClock,
} from "@mui/x-date-pickers";

import dayjs, { Dayjs } from "dayjs";

import { useDispatch, useSelector } from "react-redux";

import {
  isModalActive,
  setModalInactive,
} from "../../../redux/Modal/ModalReducer";
import { RootState } from "../../../redux/store";

import { ITour } from "../../../models/tourCardModel/ITour";

import { postNewPublic } from "../../../API/creatorAPI/postNewPublic";
import { IPublicTour } from "../../../models/calendarModels/IPublicTour";
import { editPublicTour } from "../../../API/creatorAPI/editPublicTour";
import { redColor } from "../../../config/MUI/color/color";
import { NumericFormat } from "react-number-format";
import { commission } from "../../../config/config";

type NewPublicModalProps = {
  myTours: ITour[];
  selectedPublic: IPublicTour | undefined;
  setSelectedPublic: Dispatch<SetStateAction<IPublicTour | undefined>>;
  setPublicTours: Dispatch<SetStateAction<IPublicTour[] | undefined>>;
};

type NewPublicErrorsNoDate = {
  [key in keyof Omit<
    IPublicTour,
    | "publicTourId"
    | "publicTourProfit"
    | "tourAmountWithCommission"
    | "bookingId"
    | "personNum"
    | "bookingNumber"
    | "cancelDeadline"
    | "updateDeadline"
    | "bookingInfo"
    | "tour"
    | "date"
    | "contactInformation"
  >]: boolean;
};

type NewPublicErrors = NewPublicErrorsNoDate & {
  tourDateFrom?: boolean;
  tourDateTo?: boolean;
};

const newPublicErrorsDefault: NewPublicErrors = {
  tourId: undefined,
  meetingPoint: undefined,
  meetingTime: undefined,
  tourAmount: undefined,
  maxPersonNumber: undefined,
  tourDateFrom: undefined,
  tourDateTo: undefined,
};

export default function NewPublicModal({
  myTours,
  selectedPublic,
  setSelectedPublic,
  setPublicTours,
}: NewPublicModalProps) {
  const [newPublicInputError, setNewPublicInputError] =
    useState<NewPublicErrors>(newPublicErrorsDefault);

  const newPublicInputValidation = (
    type: keyof NewPublicErrors,
    value: string
  ): boolean => {
    switch (type) {
      case "tourId":
        return value ? false : true;
      case "meetingPoint":
        return value ? false : true;
      case "maxPersonNumber":
        return value ? false : true;
      case "tourAmount":
        return value && Number(value) >= 10 && Number(value) <= 200000
          ? false
          : true;
      case "meetingTime":
        return value && dayjs(value).isBefore(dayjs(editedPublic?.dateFrom))
          ? false
          : true;

      case "tourDateFrom":
        return value &&
          dayjs(value).isAfter(dayjs()) &&
          dayjs(editedPublic?.dateTo).isAfter(dayjs(value))
          ? false
          : true;

      case "tourDateTo":
        return value &&
          dayjs(value).isAfter(dayjs()) &&
          dayjs(value).isAfter(dayjs(editedPublic?.dateFrom))
          ? false
          : true;

      default:
        return false;
    }
  };

  const handlerNewPublicErrorChange = (
    key: keyof NewPublicErrors,
    error: boolean
  ) => {
    setNewPublicInputError((CurNewPublicInputError) => ({
      ...CurNewPublicInputError,
      [key]: error,
    }));
  };

  const activeModals = useSelector(
    (state: RootState) => state.modal.activeModals
  );
  const modal = activeModals.find((modal) => modal.id === "newPublicModal");

  const dispatch = useDispatch();

  const [editedPublic, setEditedPublic] = useState<IPublicTour | undefined>(
    undefined
  );

  const publicTours = modal?.props?.publicTours;

  const [dateError, setDateError] = useState(false);

  useEffect(() => {
    const errorsArray: boolean[] = [];

    publicTours?.map((item) => {
      if (
        dayjs(item.dateFrom).isBetween(
          dayjs(editedPublic?.dateFrom),
          dayjs(editedPublic?.dateTo)
        ) ||
        dayjs(item.dateTo).isBetween(
          dayjs(editedPublic?.dateFrom),
          dayjs(editedPublic?.dateTo)
        ) ||
        dayjs(editedPublic?.dateFrom).isBetween(
          dayjs(item.dateFrom),
          dayjs(item.dateTo)
        ) ||
        dayjs(editedPublic?.dateTo).isBetween(
          dayjs(item.dateFrom),
          dayjs(item.dateTo)
        ) ||
        dayjs(editedPublic?.dateFrom).isSame(dayjs(item.dateFrom), "day") ||
        dayjs(editedPublic?.dateFrom).isSame(dayjs(item.dateTo), "day") ||
        dayjs(editedPublic?.dateTo).isSame(dayjs(item.dateFrom), "day") ||
        dayjs(editedPublic?.dateTo).isSame(dayjs(item.dateTo), "day")
      ) {
        errorsArray.push(true);
      } else {
        errorsArray.push(false);
      }
      setDateError(
        errorsArray.some((item) => {
          return item === true;
        })
      );
    });
  }, [editedPublic]);
  console.log(editedPublic);

  useEffect(() => {
    if (isModalActive("newPublicModal", activeModals)) {
      if (modal?.props?.newPublic) {
        setEditedPublic((editedPublic) => ({
          ...editedPublic,
          dateFrom: modal?.props?.dateFrom,
          dateTo: modal?.props?.dateTo,
        }));
      } else {
        setEditedPublic(selectedPublic);
      }
    }
  }, [activeModals]);

  useEffect(() => {
    handlerNewPublicErrorChange(
      "tourDateFrom",
      newPublicInputValidation("tourDateFrom", editedPublic?.dateFrom as string)
    );
    handlerNewPublicErrorChange(
      "tourDateTo",
      newPublicInputValidation("tourDateTo", editedPublic?.dateTo as string)
    );
  }, [editedPublic]);

  const customRuRULocaleText: Partial<PickersLocaleText<any>> = {
    okButtonLabel: "Принять",
    cancelButtonLabel: "Отмена",
  };

  dayjs.locale("ru");

  return (
    <Dialog
      className="newPublicModal"
      onClose={() => {
        dispatch(setModalInactive("newPublicModal"));
        setEditedPublic(undefined);
        setNewPublicInputError(newPublicErrorsDefault);
      }}
      open={isModalActive("newPublicModal", activeModals)}
      fullWidth
      maxWidth={"sm"}
    >
      <DialogContent sx={{ p: "20px" }}>
        <Box>
          <Typography variant={"h4"} sx={{ mb: "30px", textAlign: "center" }}>
            {modal?.props?.newPublic ? "Разместить тур" : "Редактировать тур"}
          </Typography>
          <Stack direction={"column"} gap={"15px"}>
            <Autocomplete
              disabled={!modal?.props?.newPublic}
              id="tourID"
              value={
                myTours.find((tour) => tour?.tourId === editedPublic?.tourId) ||
                null
              }
              onChange={(event: any, newValue) => {
                setEditedPublic(
                  (editedPublic) =>
                    ({
                      ...editedPublic,
                      tourId: newValue?.tourId,
                      tourAmount: newValue?.price,
                    }) as IPublicTour
                );
                handlerNewPublicErrorChange(
                  "tourId",
                  newPublicInputValidation("tourId", newValue?.tourId as string)
                );
              }}
              options={myTours}
              getOptionLabel={(option) => option.tourName}
              noOptionsText={"У вас еще нет созданных туров!"}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Выбор тура"
                  color="secondary"
                  error={newPublicInputError.tourId}
                />
              )}
            />
            <LocalizationProvider
              dateAdapter={AdapterDayjs}
              localeText={customRuRULocaleText}
              adapterLocale="ru"
            >
              <DateTimePicker
                label="Дата и время начала"
                value={dayjs(editedPublic?.dateFrom) || ""}
                ampm={false}
                onChange={(newValue: any) => {
                  setEditedPublic(
                    (editedPublic) =>
                      ({
                        ...editedPublic,
                        dateFrom:
                          newValue && !isNaN(+newValue) && newValue
                            ? newValue?.toISOString()
                            : "",
                      }) as IPublicTour
                  );
                }}
                viewRenderers={{
                  hours: renderTimeViewClock,
                  minutes: renderTimeViewClock,
                  seconds: renderTimeViewClock,
                }}
                slotProps={{
                  textField: (props: any) => ({
                    color: "secondary",
                    error: newPublicInputError.tourDateFrom || dateError,
                    ...props,
                    inputProps: { ...props.inputProps, placeholder: "" },
                  }),
                }}
              />
              <DateTimePicker
                label="Дата и время конца"
                value={dayjs(editedPublic?.dateTo)}
                ampm={false}
                onChange={(newValue: any) => {
                  setEditedPublic(
                    (editedPublic) =>
                      ({
                        ...editedPublic,
                        dateTo:
                          newValue && !isNaN(+newValue) && newValue
                            ? newValue?.toISOString()
                            : "",
                      }) as IPublicTour
                  );
                }}
                viewRenderers={{
                  hours: renderTimeViewClock,
                  minutes: renderTimeViewClock,
                  seconds: renderTimeViewClock,
                }}
                slotProps={{
                  textField: (props: any) => ({
                    color: "secondary",
                    error: newPublicInputError.tourDateTo || dateError,
                    ...props,
                    inputProps: { ...props.inputProps, placeholder: "" },
                  }),
                }}
              />
            </LocalizationProvider>
            <TextField
              color="secondary"
              value={editedPublic?.meetingPoint || ""}
              error={newPublicInputError.meetingPoint}
              onChange={(e) => {
                setEditedPublic({
                  ...editedPublic,
                  meetingPoint: e.target.value,
                });
                handlerNewPublicErrorChange(
                  "meetingPoint",
                  newPublicInputValidation("meetingPoint", e.target.value)
                );
              }}
              label={"Место встречи"}
            />
            <LocalizationProvider
              dateAdapter={AdapterDayjs}
              localeText={customRuRULocaleText}
              adapterLocale="ru"
            >
              <DateTimePicker
                label="Время встречи"
                value={
                  (editedPublic?.meetingTime &&
                    dayjs(editedPublic?.meetingTime)) ||
                  null
                }
                ampm={false}
                onChange={(newValue: Dayjs | null) => {
                  setEditedPublic((editedPublic) => ({
                    ...editedPublic,
                    meetingTime:
                      newValue && !isNaN(+newValue) && newValue
                        ? newValue?.toISOString()
                        : "",
                  }));
                  handlerNewPublicErrorChange(
                    "meetingTime",
                    newPublicInputValidation("meetingTime", String(newValue))
                  );
                }}
                viewRenderers={{
                  hours: renderTimeViewClock,
                  minutes: renderTimeViewClock,
                  seconds: renderTimeViewClock,
                }}
                slotProps={{
                  textField: (props: any) => ({
                    color: "secondary",
                    error: newPublicInputError.meetingTime,
                    ...props,
                    inputProps: { ...props.inputProps, placeholder: "" },
                  }),
                }}
              />
            </LocalizationProvider>
            <TextField
              type={"number"}
              color="secondary"
              value={editedPublic?.maxPersonNumber || ""}
              InputProps={{ inputProps: { min: 0 } }}
              error={newPublicInputError.maxPersonNumber}
              onChange={(e) => {
                setEditedPublic((editedPublic) => ({
                  ...editedPublic,
                  maxPersonNumber: +e.target.value,
                }));
                handlerNewPublicErrorChange(
                  "maxPersonNumber",
                  newPublicInputValidation("maxPersonNumber", e.target.value)
                );
              }}
              label={"Количество человек"}
            />
            <Stack direction={"row"} gap="14px" alignItems={"center"}>
              <Box>
                {/* @ts-ignore */}
                <NumericFormat
                  value={
                    editedPublic?.tourAmount &&
                    editedPublic?.tourAmount / commission / 100
                  }
                  decimalScale={2}
                  onValueChange={(values) => {
                    setEditedPublic((editedPublic) => ({
                      ...editedPublic,
                      tourAmount:
                        values.floatValue &&
                        values?.floatValue * 100 * commission,
                    }));
                    handlerNewPublicErrorChange(
                      "tourAmount",
                      newPublicInputValidation(
                        "tourAmount",
                        String(values.floatValue)
                      )
                    );
                  }}
                  thousandSeparator=" "
                  customInput={TextField}
                  color="secondary"
                  error={
                    newPublicInputError.tourAmount ||
                    Number(editedPublic?.tourAmount! / 100) < 10 ||
                    Number(editedPublic?.tourAmount! / 100 / commission) >
                      200000
                  }
                  InputProps={{ inputProps: { min: 0, max: 20000000 } }}
                  label="Стоимость"
                />
              </Box>

              <Box sx={{ flexGrow: "1" }}>
                <Typography variant="caption">
                  Стоимость на платформе: <br />
                  {editedPublic?.tourAmount
                    ? (editedPublic?.tourAmount / 100)
                        .toFixed(2)
                        .replace(/\B(?=(\d{3})+(?!\d))/g, " ")
                    : "-"}
                </Typography>
              </Box>
            </Stack>
            {editedPublic?.tourAmount &&
            Number(editedPublic?.tourAmount / 100) < 10 ? (
              <Typography
                variant="caption"
                sx={{ color: redColor, mt: "10px", textAlign: "center" }}
              >
                Минимальная стоимость - 10 рублей
              </Typography>
            ) : editedPublic?.tourAmount &&
              Number(editedPublic?.tourAmount / 100 / commission) > 200000 ? (
              <Typography
                variant="caption"
                sx={{ color: redColor, mt: "10px", textAlign: "center" }}
              >
                Максимальная стоимость - 200 000 рублей
              </Typography>
            ) : null}

            {editedPublic?.dateFrom && editedPublic?.dateTo && dateError && (
              <Typography
                variant="caption"
                sx={{ color: redColor, mt: "10px", textAlign: "center" }}
              >
                У вас уже есть туры в это время!
              </Typography>
            )}

            {editedPublic?.dateFrom && editedPublic?.dateTo && (
              <Typography
                variant="caption"
                sx={{
                  mt:
                    (Number(editedPublic?.tourAmount) < 1 &&
                      editedPublic?.tourAmount) ||
                    dateError
                      ? "0px"
                      : "30px",
                  textAlign: "center",
                }}
              >
                Вы можете редактировать тур до{" "}
                {dayjs(editedPublic?.dateFrom)
                  .add(-1, "day")
                  .format("D MMMM YYYY")}
              </Typography>
            )}
          </Stack>

          <Stack
            direction={"row"}
            justifyContent={"center"}
            marginTop={"20px"}
            gap={"10px"}
          >
            <Button
              onClick={() => {
                dispatch(setModalInactive("newPublicModal"));
                setEditedPublic(undefined);
              }}
            >
              Отменить
            </Button>
            <Button
              disabled={
                modal?.props?.newPublic
                  ? Object.values(newPublicInputError).some(
                      (value) => value !== false
                    )
                  : Object.values(newPublicInputError).some(
                      (value) => value === true
                    ) || dateError
              }
              onClick={() => {
                if (modal?.props?.newPublic) {
                  postNewPublic(editedPublic as IPublicTour, (resp) => {
                    dispatch(setModalInactive("newPublicModal"));
                    setPublicTours((publicTours) =>
                      publicTours?.concat({
                        ...editedPublic,
                        publicTourId: resp?.publicTourId,
                        tourName: resp?.tourName,
                        cancelDeadline: resp?.cancelDeadline,
                        updateDeadline: resp?.updateDeadline,
                      })
                    );
                    setSelectedPublic({
                      ...editedPublic,
                      publicTourId: resp?.publicTourId,
                      cancelDeadline: resp?.cancelDeadline,
                      updateDeadline: resp?.updateDeadline,
                      tourName: resp?.tourName,
                    });
                    setEditedPublic(undefined);
                  });
                } else {
                  editPublicTour(editedPublic as IPublicTour, (resp) => {
                    dispatch(setModalInactive("newPublicModal"));
                    setPublicTours((publicTours: any) => {
                      return publicTours?.map((tour: IPublicTour) => {
                        if (tour.publicTourId === editedPublic?.publicTourId) {
                          return editedPublic;
                        }
                        return tour;
                      });
                    });
                    setSelectedPublic({
                      ...editedPublic,
                      publicTourId: resp?.publicTourId,
                      cancelDeadline: resp?.cancelDeadline,
                      updateDeadline: resp?.updateDeadline,
                      tourName: resp?.tourName,
                    });
                    setEditedPublic(undefined);
                  });
                }
              }}
            >
              {modal?.props?.newPublic
                ? "Разместить тур"
                : "Сохранить изменения"}
            </Button>
          </Stack>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
