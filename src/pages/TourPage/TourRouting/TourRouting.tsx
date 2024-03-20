import { FC } from "react";
import { tourStepsMap } from "../TourPage";
import { useNavigate } from "react-router-dom";
import { Stack, Button } from "@mui/material";
import { useCookies } from "react-cookie";
import { LOGGINED, ROLE } from "../../../config/types";
import { useDispatch } from "react-redux";
import { setModalActive } from "../../../redux/Modal/ModalReducer";
import { ITourBookingData } from "../../../models/tourModels/ITourBookingData";

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

  const dispatch = useDispatch();

  console.log(bookingData);

  return (
    <>
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
        sx={{ mb: "20px" }}
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
        {cookies.ROLE !== 2 &&
          cookies.ROLE !== 3 &&
          (page === 0 ? (
            <Button
              variant={"contained"}
              sx={{ marginTop: 1 }}
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
            <Stack direction={"row"} gap={2} mt={"8px"}>
              <Button
                //   onClick={() => handlerPurchaseClick(true)}
                disabled={bookingData.touristsAmount === 0}
              >
                Оплатить
              </Button>
            </Stack>
          ))}
      </Stack>
    </>
  );
};
