import axios from "axios";
import { refreshToken } from "../../API/authAPI/UserAuthAPI/UserAuthAPI";
import {
  BAN_STATUS,
  REFRESH_TOKEN,
  TOKEN,
  USER_ROLE,
} from "../../config/types";
import { useCookies } from "react-cookie";

function AxiosProvider({ children }: { children: JSX.Element }) {
  const [cookies, setCookies, removeCookies] = useCookies([
    TOKEN,
    REFRESH_TOKEN,
    BAN_STATUS,
    USER_ROLE,
  ]);
  axios.interceptors.request.use(
    (config) => {
      if (!config?.headers?.Authorization)
        config.headers.Authorization = `Bearer ${cookies?.TOKEN}`;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  axios.interceptors.response.use(
    (res) => {
      return res;
    },
    async (err) => {
      const originalConfig = err.config;
      if (err.response) {
        // Access Token was expired
        if (
          err.response.status === 422 &&
          !originalConfig._retry &&
          cookies?.REFRESH_TOKEN
        ) {
          originalConfig._retry = true;

          try {
            let newToken;
            await refreshToken(cookies.REFRESH_TOKEN, (resp) => {
              newToken = resp?.accessToken;
              // removeCookies(TOKEN, { path: "/" });
              setCookies(TOKEN, resp?.accessToken, { path: "/" });
            });
            return axios.request({
              ...originalConfig,
              headers: {
                ...originalConfig.headers,
                Authorization: `Bearer ${newToken}`,
              },
            });
          } catch (_error: any) {
            if (_error.response && _error.response.data) {
              return Promise.reject(_error.response.data);
            }

            return Promise.reject(_error);
          }
        }

        if (err.response.status === 403 && err.response.data) {
          return Promise.reject(err.response.data);
        }
      }

      return Promise.reject(err);
    }
  );
  return <>{children}</>;
}

export default AxiosProvider;
