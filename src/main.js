import { createApp } from "vue";
import Root from "./Root.vue";
import Homepage from "./pages/Homepage";
import { createRouter, createWebHistory } from "vue-router";

let routes = [{ path: "/", component: Homepage, name: "Homepage" }];
const router = new createRouter({
    routes,
    history: createWebHistory(),
});

let app = createApp(Root);
app.use(router);
app.mount("#app");
