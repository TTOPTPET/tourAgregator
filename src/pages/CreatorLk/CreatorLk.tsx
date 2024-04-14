import { useEffect, useState } from "react";
import { getMyTours } from "../../API/creatorAPI/getMyTours";
import Grid from "@mui/material/Grid";
import Skeleton from "@mui/material/Skeleton";
import AddTourButton from "../../components/AddTourModules/AddTourButton/AddTourButton";
import TourCard from "../../components/TourCard/TourCard";
import { ITour } from "../../models/tourCardModel/ITour";

import CreatorInfo from "../../components/UserInfo/CreatorInfo/CreatorInfo";
import { Typography, useMediaQuery, useTheme } from "@mui/material";
import DeleteTourModal from "../../components/Modals/DeleteTourModal/DeleteTourModal";
import SuccessDeleteTourModal from "../../components/Modals/SuccessDeleteTourModal/SuccessDeleteTourModal";
import NeedDeletePublicModal from "../../components/Modals/NeedDeletePublicModal/NeedDeletePublicModal";
import { ICreatorInfo } from "../../models/userModels/IUserInfo";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

function CreatorLk() {
  const [myTours, setMyTours] = useState<ITour[]>([]);
  const [loading, setLoading] = useState<Boolean>(false);

  const theme = useTheme();

  const moreThenMid = useMediaQuery(theme.breakpoints.up("md"));

  const CreatorData: ICreatorInfo = useSelector(
    (state: RootState) => state?.userInfo?.userInfo as ICreatorInfo
  );

  useEffect(() => {
    setLoading(true);
    getMyTours(
      (value) => {
        setMyTours(value);
        setLoading(false);
      },
      { isArchived: false },
      () => {
        setMyTours([]);
        setLoading(false);
      }
    );
  }, []);

  const elements =
    myTours &&
    myTours?.map((tour, i) => {
      return (
        <Grid key={i} item lg={3} md={3} sm={4}>
          <TourCard tour={tour} key={tour.tourId} tourCardType={"myTours"} />
        </Grid>
      );
    });

  const skeleton = () => {
    return (
      <>
        <Grid item lg={3} md={3} sm={4}>
          <Skeleton
            variant="rounded"
            animation="wave"
            sx={{
              borderRadius: "30px",
              width: { xs: 220, sm: 180, md: 205, lg: 280 },
              height: { xs: 330, sm: 270, md: 310, lg: 420 },
            }}
          />
        </Grid>
        <Grid item lg={3} md={3} sm={4}>
          <Skeleton
            variant="rounded"
            animation="wave"
            sx={{
              borderRadius: "30px",
              width: { xs: 220, sm: 180, md: 205, lg: 280 },
              height: { xs: 330, sm: 270, md: 310, lg: 420 },
            }}
          />
        </Grid>
        {moreThenMid && (
          <Grid item lg={3} md={3}>
            <Skeleton
              variant="rounded"
              animation="wave"
              sx={{
                borderRadius: "30px",
                width: { md: 205, lg: 280 },
                height: { md: 310, lg: 420 },
              }}
            />
          </Grid>
        )}
      </>
    );
  };

  return (
    <>
      <CreatorInfo CreatorData={CreatorData} />
      <Typography
        variant="h5"
        sx={{
          mb: { lg: "19px", md: "20px", sm: "10px", xs: "10px" },
          mt: "10px",
        }}
      >
        Мои туры
      </Typography>
      <Grid
        container
        spacing={2}
        justifyContent={{ sm: "flex-start", xs: "center" }}
        alignItems={"center"}
      >
        <Grid item lg={3} md={3} sm={4}>
          <AddTourButton isVerified={CreatorData.is_verified as boolean} />
        </Grid>
        {loading ? (
          skeleton()
        ) : myTours.length > 0 ? (
          elements
        ) : (
          <Typography variant="h4" sx={{ margin: "0 auto" }}>
            Еще нет созданных шаблонов туров
          </Typography>
        )}
      </Grid>
      <DeleteTourModal myTours={myTours} setMyTours={setMyTours} />
      <SuccessDeleteTourModal />
      <NeedDeletePublicModal />
    </>
  );
}

export default CreatorLk;
