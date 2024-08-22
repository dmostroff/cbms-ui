import { defineStore } from "pinia";

import { AxiosError, AxiosResponse } from "axios";
import ApiError from "../models/common/ApiError";

const apiStore = defineStore("apiStore", {
  state: () => ({
    url: '' as string | undefined,
    status: 0 as number,
    rc: 0 as number,
    message: undefined as string | undefined,
    data: null as object | null | unknown,
    error: {} as typeof AxiosError,
    isError: false as boolean,
    msg: "" as string,
    apiError: undefined as typeof ApiError | undefined
  }),
  getters: {
    Url: (state) => state.url,
    Status: (state) => state.status,
    RC: (state) => state.rc,
    Message: (state) => state.message,
    Data: (state) => state.data,
    Error: (state) => state.error,
    ErrorMessage: (state) => (state.error ? state.error.toString() : undefined),
    IsError: (state) => state.isError,
    TheApiError: (state) => state.apiError,
    IsNoToken: (state) => state.rc == 0 && state.message == "No token",
    ReturnResponse: (state) => {
      return {
        url: state.url,
        rc: state.rc,
        msg: state.message,
        data: state.data,
        errorMessage: state.error ? state.error.message : null,
      };
    },
  },
  actions: {
    setResponse(response: AxiosResponse) {
      // console.log( response);
      this.url = response.config.url;
      this.status = response.status;
      if (200 == response.status) {
        if (!response.data) {
          this.rc = -6;
          this.message = "Response data is null";
          this.data = null;
        } else if (typeof response.data == "string") {
          this.rc = -7;
          this.message = response.data;
          this.data = null;
        } else if (typeof response.data == "object") {
          this.rc = "rc" in response.data ? response.data.rc : -6;
          this.message = "msg" in response.data ? response.data.msg : "";
          this.data =
            "data" in response.data ? response.data.data : response.data;
        }
      } else {
        this.rc = -1;
        this.message = response.statusText;
        this.data = response.data;
      }
    },
    clearError() {
      this.isError = false;
    },
    setError(error: typeof AxiosError) {
      Object.assign( this.error, error)
      if (!error) {
        this.isError = false;
        return;
      }
      this.isError = true;
      this.msg = "";
      this.data = null;
      this.rc = -1;
      if ("response" in error) {
        try {
          // this.url =
          //   error && error.response && error.response.config
          //     ? error.response.config.url
          //     : "unknown";
          this.message = error.toString();
          this.data =
            error && "response" in error && "data" in error.response
              ? error.response.data
              : null;
        } catch (err: any) {
          this.url = err;
          this.msg = "Error";
          this.data = err;
        }
      } else {
        console.log(error);
        this.msg = error.toString();
      }
    },
    setApiError(apiError: typeof ApiError) {
      Object.assign( this.apiError, apiError)
    }
  },
});

export default apiStore