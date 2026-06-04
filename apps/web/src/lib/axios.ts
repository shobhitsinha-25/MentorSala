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

    const originalRequest =
      error.config;

    // ==============================================
    // NETWORK ERROR
    // ==============================================

    if (!error.response) {

      return Promise.reject(
        error
      );

    }

    // ==============================================
    // CURRENT ROUTE
    // ==============================================

    const currentPath =
      window.location.pathname;

    // ==============================================
    // SKIP REFRESH ON LOGIN/SIGNUP
    // ==============================================

    if (

      currentPath === "/login" ||

      currentPath === "/signup"

    ) {

      return Promise.reject(
        error
      );

    }

    // ==============================================
    // TOKEN EXPIRED
    // ==============================================

    if (

      error.response.status === 401 &&

      !originalRequest._retry

    ) {

      originalRequest._retry =
        true;

      try {

        console.log(

          "Access token expired. Refreshing session..."

        );

        // ==========================================
        // REFRESH TOKEN REQUEST
        // ==========================================

        const res =
          await axios.post(

            `${import.meta.env.VITE_API_URL}/api/auth/refresh-token`,

            {},

            {

              withCredentials: true,

            }

          );

        // ==========================================
        // SAVE NEW ACCESS TOKEN
        // ==========================================

        if (
          res.data.accessToken
        ) {

          localStorage.setItem(

            "accessToken",

            res.data.accessToken

          );

        }

        // ==========================================
        // UPDATE GLOBAL USER STORE
        // ==========================================

        if (

          res.data.success &&

          res.data.user

        ) {

          useAuthStore
            .getState()
            .setUser(
              res.data.user
            );

        }

        console.log(
          "Session restored successfully"
        );

        // ==========================================
        // RETRY ORIGINAL REQUEST
        // ==========================================

        originalRequest.headers.Authorization =
          `Bearer ${res.data.accessToken}`;

        return api(
          originalRequest
        );

      } catch (refreshError) {

        console.error(

          "Refresh token expired or invalid"

        );

        // ==========================================
        // CLEAR SESSION
        // ==========================================

        localStorage.removeItem(
          "accessToken"
        );

        useAuthStore
          .getState()
          .setUser(null);

        return Promise.reject(
          refreshError
        );

      }

    }

    return Promise.reject(
      error
    );

  }

);

// ======================================================
// EXPORT
// ======================================================

export default api;