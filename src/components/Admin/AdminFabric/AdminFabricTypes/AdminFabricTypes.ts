import { IUserList } from "../../../../models/adminModels/IUserList";
import { IUserMessage } from "../../../../models/adminModels/IUsersMessage";

interface IUserComponent extends IUserList {
  type: "user";
}

interface IMessageComponent extends IUserMessage {
  type: "message";
}

export type IAdminComponent = IUserComponent | IMessageComponent;
