import { createRouter, createWebHashHistory } from "vue-router";
import MapContainer from "../components/MapContainer.vue";

const routes = [
  {
    path: "/",
    name: "Map",
    component: MapContainer,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
