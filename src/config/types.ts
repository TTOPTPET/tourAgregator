export const TOKEN = "TOKEN";
export const REFRESH_TOKEN = "REFRESH_TOKEN";
export const USER_ROLE = "USER_ROLE";
export const BAN_STATUS = "BAN_STATUS";
export const VISITED = "VISITED";

export const fromModelsToFieldsName = new Map<string, string>([
  ["innOOO", "ИНН"],
  ["kppOOO", "КПП"],
  ["ogrnOOO", "ОГРН"],
  ["okpoOOO", "ОКПО"],
  ["okatoOOO", "Код ОКАТО"],
  ["okvedOOO", "ОКВЭД"],
  ["urAdress", "Юридический адрес"],
  ["innIP", "ИНН"],
  ["egripIP", "Выписка из ЕГРИП"],
  ["adressIP", "Адрес регистрации"],
  ["ogrnipIP", "ОГРНИП"],
  ["innSELF", "ИНН"],
  ["adressSELF", "Адрес регистрации"],
  ["pasportSELF", "Серия и номер паспорта"],
  ["region", "Регион проживания"],
]);
