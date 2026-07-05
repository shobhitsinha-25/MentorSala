import axios from "axios";

import { useAuthStore }
from "../store/auth.store";

// ======================================================
// AXIOS INSTANCE
// ======================================================

const api = axios.create({

  baseURL:
  `${import.meta.env.VITE_API_URL}/api`,

  withCredentials: true,

});

// ======================================================
// REQUEST INTERCEPTOR
// ======================================================

api.interceptors.request.use(

  (config) => {

    const token =
      localStorage.getItem(
        "accessToken"
      );

    // ==============================================
    // ATTACH ACCESS TOKEN
    // ==============================================

    if (token) {

      config.headers.Authorization =
        `Bearer ${token}`;

    }

    return config;

  },

  (error) => {

    return Promise.reject(
      error
    );

  }

);

// ======================================================
// RESPONSE INTERCEPTOR
// ======================================================

api.interceptors.response.use(

  (response) => response,

  async (error) => {

    const originalRequest = error.config;

    // ==============================================
    // NETWORK ERROR
    // ==============================================

    if (!error.response) {
      return Promise.reject(error);
    }

    // ==============================================
    // SKIP REFRESH FOR AUTH ENDPOINTS
    // ==============================================

    const requestUrl = originalRequest?.url || "";

    const skipRefreshEndpoints = [

      "/auth/login",

      "/auth/register",

      "/auth/refresh-token",

      "/admin-auth/login",

      "/admin-auth/logout",

    ];

    if (

      skipRefreshEndpoints.some(

        (endpoint) => requestUrl.includes(endpoint)

      )

    ) {

      return Promise.reject(error);

    }

    // ==============================================
    // TOKEN EXPIRED
    // ==============================================

    if (

      error.response.status === 401 &&

      !originalRequest._retry

    ) {

      originalRequest._retry = true;

      try {

        console.log(

          "Access token expired. Refreshing session..."

        );

        const res = await axios.post(

          `${import.meta.env.VITE_API_URL}/api/auth/refresh-token`,

          {},

          {

            withCredentials: true,

          }

        );

        if (res.data.accessToken) {

          localStorage.setItem(

            "accessToken",

            res.data.accessToken

          );

        }

        if (

          res.data.success &&

          res.data.user

        ) {

          useAuthStore

            .getState()

            .setUser(res.data.user);

        }

        console.log(

          "Session restored successfully"

        );

        originalRequest.headers.Authorization =

          `Bearer ${res.data.accessToken}`;

        return api(originalRequest);

      } catch (refreshError) {

        console.error(

          "Refresh token expired or invalid"

        );

        localStorage.removeItem(

          "accessToken"

        );

        useAuthStore

          .getState()

          .setUser(null);

        return Promise.reject(refreshError);

      }

    }

    return Promise.reject(error);

  }

);

// ======================================================
// EXPORT
// ======================================================

export default api;