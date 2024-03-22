import { FC, useEffect, useState } from "react";
import { tourStepsMap } from "../TourPage";
import { useNavigate } from "react-router-dom";
import { Stack, Button, Typography } from "@mui/material";
import { useCookies } from "react-cookie";
import { LOGGINED, ROLE } from "../../../config/types";
import { useDispatch } from "react-redux";
import { setModalActive } from "../../../redux/Modal/ModalReducer";
import { ITourBookingData } from "../../../models/tourModels/ITourBookingData";
import { booking } from "../../../API/touristAPI/booking";
import { getUserInfo } from "../../../API/commonAPI";
import { redColor } from "../../../config/MUI/color/color";

interface TourRoutingProps {
  page: tourStepsMap;
  setPage: (prop: any) => void;
  bookingData: ITourBookingData;
}

export const TourRouting: FC<TourRoutingProps> = ({
  page,
  setPage,
  bookingData,
}) => {
  const navigate = useNavigate();

  const [cookies, setCookies, removeCookies] = useCookies([LOGGINED, ROLE]);
  const [isVerified, setIsVerified] = useState(true);

  const dispatch = useDispatch();

  const handlerPurchaseClick = () => {
    booking(
      bookingData,
      (data) => {
        // window.location.replace(data?.paymentUrl);
        dispatch(setModalActive("successPayModal"));
      },
      () => {
        dispatch(setModalActive("errorBookingModal"));
        // setError(true);
      }
    );
  };

  useEffect(() => {
    getUserInfo((value) => {
      setIsVerified(value.is_verified as boolean);
    });
  }, []);

  return (
    <>
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
        sx={{ mb: !isVerified ? "5px" : "20px" }}
      >
        <Button
          variant="textButton"
          onClick={() =>
            setPage((page: tourStepsMap) => {
              if (page > 0) {
                return page - 1;
              } else {
                navigate("/");
                return page;
              }
            })
          }
        >
          {"< "} Назад
        </Button>
        <Stack
          display="flex"
          direction={"column"}
          gap={"10px"}
          justifyContent={"flex-end"}
          alignItems={"flex-end"}
        >
          {cookies.ROLE !== 2 &&
            cookies.ROLE !== 3 &&
            (page === 0 ? (
              <Button
                variant={"contained"}
                sx={{ marginTop: 1 }}
                disabled={!isVerified}
                onClick={() => {
                  cookies.LOGGINED
                    ? setPage((page: tourStepsMap) =>
                        page < 2 ? page + 1 : page
                      )
                    : dispatch(setModalActive("noLoginModal"));
                }}
              >
                Забронировать
              </Button>
            ) : (
              <Stack direction={"row"} gap={2} mt={"10px"}>
                <Button
                  onClick={() => handlerPurchaseClick()}
                  disabled={bookingData.touristsAmount === 0}
                >
                  Оплатить
                </Button>
              </Stack>
            ))}
          {!isVerified && (
            <Typography variant={"caption"} sx={{ color: redColor }}>
              Для бронирования необходимо подтвердить почту
            </Typography>
          )}
        </Stack>
      </Stack>
    </>
  );
};
