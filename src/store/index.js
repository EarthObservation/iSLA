import { createStore } from "vuex";
import auth from "./modules/auth";
import map from "./modules/map";
import answer from "./modules/answer";
import createPersistedState from "vuex-persistedstate";

export default createStore({
  plugins: [createPersistedState()],
  modules: {
    auth,
    map,
    answer,
  },
});
