import { defineStore } from "pinia";

export const apiStore = defineStore("apiStore", {
  state: () => ({
    url: null,
    status: 0,
    rc: 0,
    message: null,
    data: null,
    error: null,
    isError: false,
  }),
  getters: {
    Url: (state) => state.url,
    Status: (state) => state.status,
    RC: (state) => state.rc,
    Message: (state) => state.message,
    Data: (state) => state.data,
    Error: (state) => state.error,
    ErrorMessage: (state) => (state.error ? state.error.message : null),
    IsError: (state) => state.isError,
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
    setResponse(response) {
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
    setError(error) {
      if (!error) {
        this.isError = false;
        return;
      }
      this.isError = true;
      this.error = error;
      this.msg = "";
      this.data = null;
      this.rc = -1;
      if ("response" in error) {
        try {
          // this.url =
          //   error && error.response && error.response.config
          //     ? error.response.config.url
          //     : "unknown";
          this.status = error.response.status;
          this.message = error.response.statusText;
          this.data =
            error && "response" in error && "data" in error["response"]
              ? error.response.data
              : null;
        } catch (err) {
          this.url = err;
          this.msg = "Error";
          this.data = err;
        }
      } else {
        console.log(error);
        this.msg = error;
      }
    },
  },
});
