import { useState, Dispatch, SetStateAction } from "react";
import { IAdminComponent } from "./AdminFabricTypes/AdminFabricTypes";
import { Button, Grid, Stack, Typography } from "@mui/material";
import { mobileWidth } from "../../../config/config";
import { whiteColor } from "../../../config/MUI/color/color";
// import {
//   changeMessageStatus,
//   tourBan,
//   userBan,
//   verifyCreator,
// } from "../../../API/adminAPI";

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
};

export const AdminComponent = ({ props, arrayProps }: AdminComponentProps) => {
  const [expanded, setExpanded] = useState<boolean>(false);
  const [statusVerify, setStatusVerify] = useState<string>(
    VerifyStatus.verified
  );
  const [statusMessage, setStatusMessage] = useState<string>("");

  //   const changeBanStatus = (key: string) => {
  //     const { type, ...propsValue } = props;
  //     const index = arrayProps.findIndex((item) => item[key] === propsValue[key]);
  //     //@ts-ignore
  //     arrayProps[index].banStatus = !propsValue.banStatus;
  //     setProps([...arrayProps]);
  //   };

  //   const handlerUserBanClick = (touristId: string) => {
  //     userBan(
  //       () => {
  //         if (props.type === "tourist") {
  //           changeBanStatus("touristId");
  //         }
  //         if (props.type === "creator") {
  //           changeBanStatus("creatorId");
  //         }
  //         if (props.type === "admin") {
  //           changeBanStatus("adminId");
  //         }
  //       },
  //       touristId,
  //       undefined,
  //       false
  //     );
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
      const { name, email, isActive, id, phone } = props;

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
            <Typography variant={"h6"}>{name}</Typography>
          </Grid>
          <Grid item className="tourist__contacts">
            <Typography variant={"h6"}>Контакты:</Typography>
            <Stack direction={"row"} gap={2}>
              <Stack>
                <Typography variant={"caption"}>Тел.</Typography>
                <Typography variant={"caption"}>Почта</Typography>
              </Stack>
              <Stack>
                <Typography variant={"caption"}>{phone}</Typography>
                <Typography variant={"caption"}>{email}</Typography>
              </Stack>
            </Stack>
          </Grid>
          <Grid item className="tourist__ban">
            <Typography variant={"h6"}>Статус блокировки:</Typography>
            {!isActive ? (
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
              //   onClick={() => isActive ? handlerUserBanClick(id) : handlerUserUnbanClick(id)}
            >
              Переключить статус блокировки
            </Button>
          </Grid>
        </Grid>
      );
    }
    case "message": {
      const { description, gidEmail, publicTourId, userEmail } = props;
      return (
        <Grid container padding={2} gap={4}>
          <Grid item xs={5} className="user__info">
            <Stack direction={"row"} gap={2}>
              <Stack>
                <Typography variant={"caption"}>Почта</Typography>
              </Stack>
              <Stack>
                <Typography variant={"caption"}>{userEmail}</Typography>
              </Stack>
            </Stack>
          </Grid>
          <Grid item xs={5} className="user__message">
            <Stack direction={"column"} gap={2}>
              <Stack>
                <Typography variant={"caption"}>Сообщение</Typography>
              </Stack>
              <Stack>
                <Typography variant={"caption"}>{description}</Typography>
              </Stack>
            </Stack>
          </Grid>
          <Grid
            item
            xs={5}
            sx={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}
            className="user__ban"
          >
            <Button
              variant="text"
              sx={{ fontSize: "18px" }}
              //   onClick={() => handlerUserBanClick(touristId)}
            >
              Принять
            </Button>
            <Button
              variant="text"
              sx={{ fontSize: "18px" }}
              //   onClick={() => handlerUserBanClick(touristId)}
            >
              Отклонить
            </Button>
          </Grid>
        </Grid>
      );
    }

    default:
      return null;
  }
};
