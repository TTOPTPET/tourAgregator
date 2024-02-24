import { Box, Typography } from "@mui/material";
import { ICreatorInfo } from "../../../../models/userModels/IUserInfo";

type fieldsCreatorProps = {
  creatorInfo: ICreatorInfo;
};

function InfoFieldsCreator({ creatorInfo }: fieldsCreatorProps) {
  const generFields = (creatorInfo: ICreatorInfo) => {
    return (
      <Box
        sx={{
          display: "flex",
          gap: {
            lg: "50px",
            md: "20px",
            sm: "20px",
            xs: "20px",
          },
          mt: "21px",
        }}
      >
        <Box
          className="userInfo__data-titles"
          sx={{
            width: {
              lg: "265px",
              md: "200px",
              sm: "200px",
              xs: "160px",
            },
            display: "flex",
            flexDirection: "column",
            gap: "5px",
          }}
        >
          <Typography variant="h6">ИНН:</Typography>
        </Box>
        <Box
          className="userInfo__data-descr"
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "3px",
          }}
        >
          <Typography variant="caption">{creatorInfo?.inn}</Typography>
        </Box>
      </Box>
    );
  };
  return <>{generFields(creatorInfo)}</>;
}

export default InfoFieldsCreator;
