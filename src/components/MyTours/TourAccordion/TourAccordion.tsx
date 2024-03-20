import {
  Stack,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Grid,
  SvgIcon,
  useTheme,
  useMediaQuery,
  Button,
} from "@mui/material";
import dayjs from "dayjs";
import { SetStateAction, useState, Dispatch, FC } from "react";
import { IUserRecord } from "../../../models/userModels/IUserRecord";
import NavigateIcon from "../../../media/navigate_before.svg?react";
import { TourDetails } from "../TourSummary/TourDetails";
// import SuccessMessageSendModal from "../../Modals/SuccessMessageSendModal/SuccessMessageSendModal";
import BaseChip from "./Chips/BaseChip/BaseChip";
import { checkReturnPayment } from "../TourSummary/TourDetails";

import { redirect, useNavigate } from "react-router-dom";

interface ITourAccordionProps {
  record: IUserRecord;
  records: IUserRecord[];
  setRecords: Dispatch<SetStateAction<IUserRecord[]>>;
}

export const TourAccordion: FC<ITourAccordionProps> = ({
  record,
  records,
  setRecords,
}) => {
  const [expanded, setExpanded] = useState<string | false>(false);
  console.log(record);
  const theme = useTheme();
  const navigate = useNavigate();

  const lessThenBig = useMediaQuery(theme.breakpoints.down("lg"));
  const lessThenSmall = useMediaQuery(theme.breakpoints.down("sm"));

  const fromModelsToPaymentName = new Map<string, string>([
    ["successPay", "Оплачено "],
    ["successReturn", "Средства возвращены"],
    ["waitPay", "Ожидание оплаты"],
    ["waitReturn", "Ожидание возврата"],
    ["failPay", "Ошибка оплаты"],
    ["failReturn", "Ошибка возврата"],
  ]);

  return (
    <>
      <Accordion
        defaultExpanded
        expanded={expanded === record.publicTourId}
        square={true}
        sx={{ width: "100%" }}
      >
        <AccordionSummary>
          <Grid
            container
            padding={{ lg: "24px", sm: "10px", xs: "4px" }}
            justifyContent={"space-between"}
            sx={{ position: "relative" }}
          >
            <Grid item md={5}>
              <Stack gap="5px">
                <Typography variant={"h5"}>
                  {record.tour.tourName + " "}№{record.bookingId}
                </Typography>
                <Typography variant={"caption"}>
                  {dayjs(record.dateFrom).format("D MMMM YYYY") +
                    " - " +
                    dayjs(record.dateTo).format("D MMMM YYYY")}
                </Typography>
                <Typography variant={"caption"}>ООО "Алтай тур"</Typography>
                {checkReturnPayment(record) && <BaseChip />}
              </Stack>
            </Grid>
            {/* <Grid item width={"fit-content"} justifyContent={"right"}>
                <Stack gap="5px">
                  {record?.bookingStatus?.needPayment ? (
                    <Stack
                      direction="row"
                      gap={2}
                      alignItems={"center"}
                      justifyContent={"right"}
                    >
                      <Button
                        onClick={() =>
                          bookingPay(record?.bookingId, (data) => {
                            window.location.replace(data.paymentUrl);
                          })
                        }
                        sx={{
                          position: lessThenSmall ? "absolute" : "relative",
                          right: "0px",
                          top: "0px",
                        }}
                      >
                        Оплатить
                      </Button>
  
                      <Typography
                        variant={"button"}
                        textAlign={"right"}
                        sx={{
                          position: lessThenSmall ? "absolute" : "",
                          bottom: "20px",
                          right: "0",
                        }}
                      >
                        {record.tourAmount / 100}₽
                      </Typography>
                    </Stack>
                  ) : (
                    <Typography
                      variant={"button"}
                      textAlign={"right"}
                      sx={{
                        position: lessThenSmall ? "absolute" : "",
                        bottom: "20px",
                        right: "0",
                      }}
                    >
                      {record.tourAmount / 100}₽
                    </Typography>
                  )}
                  <Typography
                    variant={"caption"}
                    textAlign={"right"}
                    sx={{
                      mt:
                        lessThenSmall && !record?.bookingStatus?.needPayment
                          ? "5px"
                          : "",
                    }}
                  >
                    {fromModelsToPaymentName.get(record.bookingStatus.payment)}
                  </Typography>
                </Stack>
              </Grid> */}
            <Stack
              direction={"row"}
              justifyContent={"right"}
              alignItems={"center"}
              sx={{ position: "absolute" }}
              bottom={{ lg: 20, sm: 0, xs: -9 }}
              right={{ lg: 20, sm: 0, xs: -10 }}
              onClick={() =>
                setExpanded(
                  expanded === record.publicTourId ? false : record.publicTourId
                )
              }
            >
              <Typography
                variant={"caption"}
                sx={{ m: lessThenBig ? "0 -5px 0px 0" : "" }}
              >
                {expanded === record.publicTourId ? (
                  <>Скрыть</>
                ) : (
                  <>Развернуть</>
                )}
              </Typography>
              <SvgIcon
                viewBox={lessThenBig ? "-10 -18 44 44" : "0 -8 24 24"}
                fontSize="medium"
                sx={
                  expanded === record.publicTourId
                    ? {}
                    : {
                        transform: "rotate(180deg)",
                      }
                }
              >
                <NavigateIcon width={24} />
              </SvgIcon>
            </Stack>
          </Grid>
        </AccordionSummary>
        <AccordionDetails>
          <TourDetails
            record={{ ...record, type: "record" }}
            records={records}
            setRecords={setRecords}
          />
        </AccordionDetails>
        {/* <SuccessMessageSendModal /> */}
      </Accordion>
    </>
  );
};
