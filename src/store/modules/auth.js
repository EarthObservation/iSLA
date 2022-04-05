import axios from "axios";
import router from "@/router/index"

const state = {
    accessToken: window.localStorage.getItem("isla_access_token"),
    refreshToken: window.localStorage.getItem("isla_refresh_token"),

    loginError: {
        error: null,
        change: true,
    },
    registerError: {
        error: null,
        change: true,
    },
    resetPassError: {
        error: null,
        change: true,
    },
    resetPassConfError: {
        error: null,
        change: true,
    },
    submitNewEmailError: {
        error: null,
        change: true,
    },
    submitNewPasswordError: {
        error: null,
        change: true,
    },

    user: {
        userName: "Ales",
        email: "ales.grlj@zrc-sazu.si",
        isAdmin: true
    }
};

const getters = {
    loggedIn: state => !!state.user.userName,
    loginError: state => state.loginError,
    registerError: state => state.registerError,
    resetPassError: state => state.resetPassError,
    resetPassConfError: state => state.resetPassConfError,
    submitNewEmailError: state => state.submitNewEmailError,
    submitNewPasswordError: state => state.submitNewPasswordError,
    user: state => state.user,
    accessToken: state => state.accessToken,
    refreshToken: state => state.refreshToken
};

const actions = {
        onLogin({
            dispatch,
            commit
        }, loginData) {
            axios.post('user/login', loginData)
                .then(response => {
                    if (response.status === 200) {
                        dispatch("finalizeLogin", response.data)
                    }
                })
                .catch(error => {
                    if (error.response) {
                        commit("setLoginError", error.response.data.message)
                    } else if (error.request) {
                        commit("setLoginError", "Something went wrong. Someone is already working on it. Please try again later.")
                    }
                })
        },

        finalizeLogin({
            commit
        }, userData) {
            commit("setAccessToken", userData.access_token);
            commit("setRefreshToken", userData.refresh_token);
            window.localStorage.setItem("isla_access_token", userData.access_token);
            window.localStorage.setItem("isla_refresh_token", userData.refresh_token);
            commit("setUserData", userData)
            router.push({
                path: "/map"
            });
        },

        registerNewUser({commit}, newUserData) {
            axios
              .post("user/registration", newUserData)
              .then((response) => {
                  console.log(response)
                commit("setRegisterError", response.message)
              })
              .catch(error => {
                if (error.response) {
                    commit("setRegisterError", error.response.message)
                } else if (error.request) {
                    commit("setRegisterError", "Something went wrong. Someone is already working on it. Please try again later.")
                }
            })
          },

        logout: ({
            commit
        }) => {
            commit("setAccessToken", null);
            commit("setRefreshToken", null);
            commit("setUserData", {
                userName: null,
                email: null,
            })
            window.localStorage.removeItem("isla_access_token");
            window.localStorage.removeItem("isla_refresh_token");
            window.localStorage.removeItem("vuex");
            router.push({
                path: "/"
            });
        },

        submitNewEmail: ({
            state,
            commit
        }, email) => {
            const newEmail = {
                new_email: email,
                language: "EN",
            };
            axios
                .post("user/updateemail", newEmail)
                .then((response) => {
                    if (response.status === 200) {
                        let userData = {
                            user_name: state.user.userName,
                            email: email,
                            user_folder_string: state.user.userFolderString
                        }
                        commit("setUserData", userData)
                        commit("setSubmitNewEmailError", response.data.message)
                    }
                })
                .catch((error) => {
                    if (error.response) {
                        commit("setSubmitNewEmailError", error.response.data.message)
                    } else if (error.request) {
                        commit("setSubmitNewEmailError", "Something went wrong. Someone is already working on it. Please try again later.")
                    }
                });
        },

        submitNewPassword: ({commit, dispatch}, passwords) => {
            axios.post("user/updatepassword", passwords)
                .then((response) => {
                    commit("setSubmitNewPasswordError", response.data.message)
                    setTimeout(() => {
                        dispatch("logout");
                      }, 7000);
                })
                .catch((error) => {
                    if (error.response) {
                        commit("setSubmitNewPasswordError", error.response.data.message)
                    } else if (error.request) {
                        commit("setSubmitNewPasswordError", "Something went wrong. Someone is already working on it. Please try again later.")
                    }
                })
            },

            requestResetPass({commit}, userEmail) {
                const resetFor = {
                  email: userEmail,
                };
          
                axios
                  .post("user/requestresetpassword", resetFor)
                  .then((response) => {
                    commit("setResetPassError", response.data.message)
                  })
                  .catch((error) => {
                    if (error.response) {
                        commit("setResetPassError", error.response.data.message)
                    } else if (error.request) {
                        commit("setResetPassError", "Something went wrong. Someone is already working on it. Please try again later.")
                    }
                })
              },

              resetPass({commit, dispatch}, newPasssword) {
                axios
                  .post("user/resetpassword/" + newPasssword.token, newPasssword)
                  .then((response) => {
                    commit("setResetPassConfError", response.data.message)
                    setTimeout(() => {
                        dispatch("logout");
                      }, 7000);
                  })
                  .catch((error) => {
                    if (error.response) {
                        commit("setResetPassConfError", error.response.data.message)
                    } else if (error.request) {
                        commit("setResetPassConfError", "Something went wrong. Someone is already working on it. Please try again later.")
                    }
                })
              },
        }

        const mutations = {
            setAccessToken: (state, token) => {
                state.accessToken = token;
            },

            setRefreshToken: (state, token) => {
                state.refreshToken = token;
            },

            setLoginError: (state, message) => {
                state.loginError = {
                    error: message,
                    change: !state.loginError.change
                }
            },

            setRegisterError: (state, message) => {
                state.registerError = {
                    error: message,
                    change: !state.registerError.change
                }
            },

            setResetPassError: (state, message) => {
                state.resetPassError = {
                    error: message,
                    change: !state.resetPassError.change
                }
            },
            setResetPassConfError: (state, message) => {
                state.resetPassConfError = {
                    error: message,
                    change: !state.resetPassConfError.change
                }
            },
            setSubmitNewEmailError: (state, message) => {
                state.submitNewEmailError = {
                    error: message,
                    change: !state.submitNewEmailError.change
                }
            },
            setSubmitNewPasswordError: (state, message) => {
                state.submitNewPasswordError = {
                    error: message,
                    change: !state.submitNewPasswordError.change
                }
            },

            setUserData: (state, userData) => {
                state.user = {
                    userName: userData.user_name,
                    email: userData.email,
                }
            },
        }

        export default {
            state,
            getters,
            actions,
            mutations
        };