import axios from "axios";
import { serverBaseUrl } from "../constants/global";
import { logOuthandler, updateAccessToken } from "../redux/slices/authslice";

// initializing storeData to access redux store data
let storeData;
export const injectStore = (_store) => {
  storeData = _store;
};

// axios basic instatnce
const serverApiInstance = axios.create({
  baseURL: serverBaseUrl,
});

// axios private instance
export const privateApiInstance = axios.create({
  baseURL: serverBaseUrl,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

////////////////////////////////////////////INTERCEPTOR SETUP//////////////////////////////////////
// for once initializing
let interceptorInitialized = false;

export const setupInterceptor = ({ dispatch, navigate }) => {
  if (interceptorInitialized) return;

  // request config
  privateApiInstance.interceptors.request.use(
    (config) => {
      const token = storeData.getState().auth.token;
      console.log(`from req ${token}`);
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      console.log("request Interceptor fired");
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // response config
  privateApiInstance.interceptors.response.use(
    (response) => {
      console.log("response Interceptor fired, not refreshed");
      return response;
    },
    async (error) => {
      const originalRequest = error.config;

      // checking the status for unauthorized and for retry flag
      if (error.response.status == 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        try {
          const response = await axios.get(
            `${serverBaseUrl}/auth/refresh-accesstoken`,
            {
              withCredentials: true,
            }
          );
          console.log("refreshed access token");

          const { token } = response.data;

          if (token) {
            dispatch(updateAccessToken(token));
          }

          originalRequest.headers.Authorization = `Bearer ${token}`;
          return privateApiInstance(originalRequest);
        } catch (error) {
          console.log("from refresh error");
          dispatch(logOuthandler());
          // navigate("/login");
          return Promise.reject(error);
        }
      }

      return Promise.reject(error);
    }
  );
  interceptorInitialized = true;
};

export default serverApiInstance;
