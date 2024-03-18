import { useState, Dispatch, SetStateAction } from "react";
import { IAdminComponent } from "./AdminFabricTypes/AdminFabricTypes";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Grid,
  Stack,
  SvgIcon,
  Typography,
} from "@mui/material";
import { mobileWidth } from "../../../config/config";
import { whiteColor } from "../../../config/MUI/color/color";
import { banUser, unbanUser } from "../../../API/adminAPI";
import dayjs from "dayjs";
import "dayjs/locale/ru";
import NavigateIcon from "../../../media/navigate_before.svg?react";
import confirmIcon from "../../../media/confirmIcon.svg";
import rejectIcon from "../../../media/rejectIcon.svg";
import {
  confirmAppeals,
  confirmClaim,
  rejectClaim,
} from "../../../API/adminAPI/AdminMessagesAPI/AdminMessagesAPI";

enum MessageStatus {
  notRead = "notRead",
  read = "read",
  solved = "solved",
}

enum VerifyStatus {
  notVerified = "notVerified",
  verified = "verified",
  sendVerified = "sendVerified",
  waitVerified = "waitVerified",
}

const verifyTypes = [
  { id: VerifyStatus.notVerified, name: "Не подтверждён" },
  { id: VerifyStatus.verified, name: "Подтверджён" },
  { id: VerifyStatus.sendVerified, name: "Отправлен на подтверждение" },
  { id: VerifyStatus.waitVerified, name: "Ожидает подтверждения" },
];

const messageTypes = [
  { id: MessageStatus.notRead, name: "Не прочитано" },
  { id: MessageStatus.read, name: "Прочитано" },
  { id: MessageStatus.solved, name: "Решено" },
];

type AdminComponentProps = {
  props: IAdminComponent;
  arrayProps: any[];
  setArrayProps?: Dispatch<SetStateAction<any[]>>;
  appeals?: boolean;
};

export const AdminComponent = ({
  props,
  arrayProps,
  setArrayProps,
  appeals,
}: AdminComponentProps) => {
  const [expanded, setExpanded] = useState<boolean>(false);
  const [statusVerify, setStatusVerify] = useState<string>(
    VerifyStatus.verified
  );
  const [statusMessage, setStatusMessage] = useState<string>("");

  dayjs.locale("ru");

  //   const changeBanStatus = (key: string) => {
  //     const { type, ...propsValue } = props;
  //     const index = arrayProps.findIndex((item) => item[key] === propsValue[key]);
  //     //@ts-ignore
  //     arrayProps[index].banStatus = !propsValue.banStatus;
  //     setProps([...arrayProps]);
  //   };

  //   const handlerTourBanClick = (tourId: string) => {
  //     tourBan(
  //       () => {
  //         if (props.type === "tour") {
  //           changeBanStatus("tourId");
  //         }
  //       },
  //       tourId,
  //       undefined,
  //       false
  //     );
  //   };

  //   const handlerMessageStatusClick = (messageId: string) => {
  //     changeMessageStatus(
  //       () => {
  //         if (props.type === "message") {
  //           const { type, ...propsValue } = props;
  //           const index = arrayProps.findIndex(
  //             (item) => item.messageId === propsValue.messageId
  //           );
  //           arrayProps[index].statusMessage = statusMessage;
  //           setProps([...arrayProps]);
  //         }
  //       },
  //       { messageId: messageId, statusMessage: statusMessage },
  //       undefined,
  //       false
  //     );
  //   };

  //   const handlerVerifyStatusClick = (creatorId: string) => {
  //     verifyCreator(
  //       () => {
  //         if (props.type === "creator") {
  //           const { type, ...propsValue } = props;
  //           const index = arrayProps.findIndex(
  //             (item) => item.creatorId === propsValue.creatorId
  //           );
  //           arrayProps[index].dataUser.statusVerify = statusVerify;
  //           setProps([...arrayProps]);
  //         }
  //       },
  //       { messageId: creatorId, statusMessage: statusVerify },
  //       undefined,
  //       false
  //     );
  //   };

  switch (props.type) {
    case "user": {
      const { name, email, is_active, id, phone } = props;

      const [isActive, setIsActive] = useState(is_active);

      return (
        <Grid
          container
          borderRadius={10}
          gap={4}
          padding={3}
          bgcolor={whiteColor}
          width={mobileWidth}
        >
          <Grid item className="tourist__name">
            <Typography
              variant={"h6"}
              sx={{
                width: "90px",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {name}
            </Typography>
          </Grid>
          <Grid item className="tourist__contacts">
            <Typography variant={"h6"} sx={{ mb: "5px" }}>
              Контакты:
            </Typography>
            <Stack direction={"row"} gap={2}>
              <Stack>
                <Typography variant={"caption"}>Тел.</Typography>
                <Typography variant={"caption"}>Почта</Typography>
              </Stack>
              <Stack>
                <Typography variant={"caption"}>{phone}</Typography>
                <Typography
                  variant={"caption"}
                  sx={{
                    width: "250px",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {email}
                </Typography>
              </Stack>
            </Stack>
          </Grid>
          <Grid item className="tourist__ban">
            <Typography variant={"h6"} sx={{ mb: "5px" }}>
              Статус блокировки:
            </Typography>
            {isActive ? (
              <Typography variant={"caption"}>Разблокирован</Typography>
            ) : (
              <Typography variant={"caption"}>Заблокирован</Typography>
            )}
          </Grid>
          <Grid
            item
            textAlign={"center"}
            marginY={"auto"}
            className="user__ban"
          >
            <Button
              variant="text"
              sx={{ fontSize: "18px" }}
              onClick={() => {
                isActive
                  ? banUser(
                      () => {
                        setIsActive((prev) => !prev);
                      },
                      id as number,
                      () => {}
                    )
                  : unbanUser(
                      () => {
                        setIsActive((prev) => !prev);
                      },
                      id as number,
                      () => {}
                    );
              }}
            >
              Переключить статус блокировки
            </Button>
          </Grid>
        </Grid>
      );
    }
    case "message": {
      const {
        description,
        gidEmail,
        touristEmail,
        tourName,
        claimId,
        creationDateTime,
      } = props;
      console.log(arrayProps);
      return (
        <div>
          <Accordion
            defaultExpanded
            className="message__panel"
            expanded={expanded}
            square={true}
          >
            <AccordionSummary id="panel4bh-header">
              <Grid container padding={2} gap={4}>
                <Grid item xs={20} className="user__info">
                  <Typography variant={"h6"}>Отправитель:</Typography>
                  <Stack direction={"row"} gap={2} mt={"5px"}>
                    <Stack gap="5px">
                      <Typography variant={"caption"}>Почта:</Typography>
                      <Typography variant={"caption"}>
                        Дата создания:
                      </Typography>
                    </Stack>
                    <Stack gap="5px">
                      <Typography
                        variant={"caption"}
                        sx={{
                          width: "450px",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {touristEmail}
                      </Typography>
                      <Typography variant={"caption"}>
                        {dayjs(creationDateTime).format("D MMMM YYYY HH:MM:ss")}
                      </Typography>
                    </Stack>
                  </Stack>
                  {!appeals && (
                    <>
                      <Typography variant={"h6"} mt="20px">
                        Жалоба на:
                      </Typography>
                      <Stack direction={"row"} gap={2} mt={"5px"}>
                        <Stack gap={"5px"}>
                          <Typography variant={"caption"}>
                            Название тура:
                          </Typography>
                          <Typography variant={"caption"}>
                            Почта гида:
                          </Typography>
                        </Stack>
                        <Stack gap="5px">
                          <Typography
                            variant={"caption"}
                            sx={{
                              width: "450px",
                              whiteSpace: "nowrap",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                            }}
                          >
                            {tourName}
                          </Typography>
                          <Typography
                            variant={"caption"}
                            sx={{
                              width: "450px",
                              whiteSpace: "nowrap",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                            }}
                          >
                            {gidEmail}
                          </Typography>
                        </Stack>
                      </Stack>
                    </>
                  )}
                </Grid>
                <Grid item xs={7} className="user__ban">
                  <Stack
                    direction={"row"}
                    justifyContent={"right"}
                    alignItems={"center"}
                    sx={{ position: "absolute" }}
                    bottom={{ lg: 20, sm: 0, xs: -9 }}
                    right={{ lg: 20, sm: 0, xs: -10 }}
                    onClick={() => setExpanded(expanded ? false : true)}
                  >
                    <Typography variant={"caption"}>
                      {expanded ? <>Скрыть</> : <>Развернуть</>}
                    </Typography>
                    <SvgIcon
                      viewBox={"0 -8 24 24"}
                      fontSize="medium"
                      sx={
                        expanded
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
              </Grid>
              <Stack
                direction={"row"}
                justifyContent={"right"}
                alignItems={"center"}
                sx={{ position: "absolute" }}
                top={30}
                right={20}
                gap="7px"
              >
                <Button
                  variant="editButton"
                  onClick={() =>
                    confirmClaim(
                      () => {
                        setArrayProps &&
                          setArrayProps((prev) =>
                            prev.filter((item) => item.claimId !== claimId)
                          );
                      },
                      { claimId },
                      () => {}
                    )
                  }
                >
                  <img
                    src={confirmIcon}
                    alt="plus icon"
                    style={{
                      width: "25px",
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                    }}
                    className="tour_button_icon"
                  />
                </Button>

                {!appeals && (
                  <Button
                    className="tour-card__button-delete"
                    onClick={() =>
                      appeals
                        ? confirmAppeals(
                            () => {
                              setArrayProps &&
                                setArrayProps((prev) =>
                                  prev.filter(
                                    (item) => item.claimId !== claimId
                                  )
                                );
                            },
                            { claimId },
                            () => {}
                          )
                        : rejectClaim(
                            () => {
                              setArrayProps &&
                                setArrayProps((prev) =>
                                  prev.filter(
                                    (item) => item.claimId !== claimId
                                  )
                                );
                            },
                            { claimId },
                            () => {}
                          )
                    }
                    variant="deleteButton"
                  >
                    <img
                      src={rejectIcon}
                      alt="plus icon"
                      style={{
                        width: "25px",
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                      }}
                      className="tour_button_icon"
                    />
                  </Button>
                )}
              </Stack>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant={"caption"} padding={2} flexWrap={"wrap"}>
                {description}
              </Typography>
            </AccordionDetails>
          </Accordion>
        </div>
      );
    }

    default:
      return null;
  }
};
