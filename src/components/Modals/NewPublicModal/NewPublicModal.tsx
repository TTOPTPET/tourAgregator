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
import { StyledTextAreaAutosize } from "../../../config/MUI/styledComponents/StyledTextAreaAutosize";

import { postNewPublic } from "../../../API/creatorAPI/postNewPublic";
import { IPublicTour } from "../../../models/calendarModels/IPublicTour";
import { editPublicTour } from "../../../API/creatorAPI/editPublicTour";
import { redColor } from "../../../config/MUI/color/color";
import { NumericFormat } from "react-number-format";

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
        return value && Number(value) >= 1 ? false : true;
      case "meetingTime":
        return value &&
          dayjs(value).isBefore(dayjs(editedPublic?.date?.dateFrom))
          ? false
          : true;

      case "tourDateFrom":
        return value &&
          dayjs(value).isAfter(dayjs()) &&
          dayjs(editedPublic?.date?.dateTo).isAfter(dayjs(value))
          ? false
          : true;

      case "tourDateTo":
        return value &&
          dayjs(value).isAfter(dayjs()) &&
          dayjs(value).isAfter(dayjs(editedPublic?.date?.dateFrom))
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

  useEffect(() => {
    if (isModalActive("newPublicModal", activeModals)) {
      if (modal?.props?.newPublic) {
        setEditedPublic((editedPublic) => ({
          ...editedPublic,
          date: modal?.props?.date,
        }));
      } else {
        setEditedPublic(selectedPublic);
      }
    }
  }, [activeModals]);

  useEffect(() => {
    handlerNewPublicErrorChange(
      "tourDateFrom",
      newPublicInputValidation(
        "tourDateFrom",
        editedPublic?.date?.dateFrom as string
      )
    );
    handlerNewPublicErrorChange(
      "tourDateTo",
      newPublicInputValidation(
        "tourDateTo",
        editedPublic?.date?.dateTo as string
      )
    );
  }, [editedPublic]);

  const customRuRULocaleText: Partial<PickersLocaleText<any>> = {
    okButtonLabel: "Принять",
    cancelButtonLabel: "Отмена",
  };

  console.log(editedPublic);

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
                      tour: { tourName: newValue?.tourName },
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
                value={dayjs(editedPublic?.date?.dateFrom) || ""}
                ampm={false}
                onChange={(newValue: any) => {
                  console.log(newValue);
                  setEditedPublic(
                    (editedPublic) =>
                      ({
                        ...editedPublic,
                        date: {
                          ...editedPublic?.date,
                          dateFrom:
                            newValue && !isNaN(+newValue) && newValue
                              ? newValue?.toISOString()
                              : "",
                        },
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
                    error: newPublicInputError.tourDateFrom,
                    ...props,
                    inputProps: { ...props.inputProps, placeholder: "" },
                  }),
                }}
              />
              <DateTimePicker
                label="Дата и время конца"
                value={dayjs(editedPublic?.date?.dateTo)}
                ampm={false}
                onChange={(newValue: any) => {
                  setEditedPublic(
                    (editedPublic) =>
                      ({
                        ...editedPublic,
                        date: {
                          ...editedPublic?.date,
                          dateTo:
                            newValue && !isNaN(+newValue) && newValue
                              ? newValue?.toISOString()
                              : "",
                        },
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
                    error: newPublicInputError.tourDateTo,
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
            <StyledTextAreaAutosize
              placeholder="Контактная информация"
              sx={{ m: "0", minHeight: "50px" }}
              value={editedPublic?.contactInformation}
              onChange={(e) => {
                setEditedPublic({
                  ...editedPublic,
                  contactInformation: e.target.value,
                });
              }}
            />
            <Stack direction={"row"} gap="14px" alignItems={"center"}>
              <Box>
                {/* @ts-ignore */}
                <NumericFormat
                  value={
                    editedPublic?.tourAmount && editedPublic?.tourAmount / 100
                  }
                  decimalScale={2}
                  onValueChange={(values) => {
                    setEditedPublic((editedPublic) => ({
                      ...editedPublic,
                      tourAmount: values.floatValue && values?.floatValue * 100,
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
                    Number(editedPublic?.tourAmount! / 100) < 10
                  }
                  InputProps={{ inputProps: { min: 0 } }}
                  label="Стоимость"
                />
                {/* <TextField
                    type={"number"}
                    color="secondary"
                    error={newPublicInputError.tourAmount}
                    value={editedPublic?.tourAmount || ""}
                    InputProps={{ inputProps: { min: 0 } }}
                    onChange={(e) => {
                      setEditedPublic((editedPublic) => ({
                        ...editedPublic,
                        tourAmount: +e.target.value,
                      }));
                      handlerNewPublicErrorChange(
                        "tourAmount",
                        newPublicInputValidation("tourAmount", e.target.value)
                      );
                    }}
                    label={"Стоимость"}
                  /> */}
              </Box>

              <Box sx={{ flexGrow: "1" }}>
                <Typography variant="caption">
                  Стоимость на платформе: <br />
                  {editedPublic?.tourAmount
                    ? ((editedPublic?.tourAmount / 100) * 1.03)
                        .toFixed(2)
                        .replace(/\B(?=(\d{3})+(?!\d))/g, " ")
                    : "-"}
                </Typography>
              </Box>
            </Stack>
            {editedPublic?.tourAmount &&
            Number(editedPublic?.tourAmount / 100) < 10 &&
            editedPublic?.tourAmount ? (
              <Typography
                variant="caption"
                sx={{ color: redColor, mt: "10px", textAlign: "center" }}
              >
                Минимальная стоимость - 10 рублей
              </Typography>
            ) : null}

            {editedPublic?.date && (
              <Typography
                variant="caption"
                sx={{
                  mt:
                    Number(editedPublic?.tourAmount) < 1 &&
                    editedPublic?.tourAmount
                      ? "0px"
                      : "30px",
                  textAlign: "center",
                }}
              >
                Вы можете редактировать тур до{" "}
                {dayjs(editedPublic?.date?.dateFrom)
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
                    )
              }
              onClick={() => {
                if (modal?.props?.newPublic) {
                  postNewPublic(editedPublic as IPublicTour, (resp) => {
                    dispatch(setModalInactive("newPublicModal"));
                    setPublicTours((publicTours) =>
                      publicTours?.concat({
                        ...editedPublic,
                        publicTourId: resp?.publicTourId,
                      })
                    );
                    setSelectedPublic({
                      ...editedPublic,
                      publicTourId: resp?.publicTourId,
                      cancelDeadline: resp?.cancelDeadline,
                      updateDeadline: resp?.updateDeadline,
                      tourAmountWithCommission: resp?.tourAmountWithCommission,
                    });
                    setEditedPublic(undefined);
                  });
                } else {
                  editPublicTour(editPublicTour as IPublicTour, (resp) => {
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
                      tourAmountWithCommission: resp?.tourAmountWithCommission,
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