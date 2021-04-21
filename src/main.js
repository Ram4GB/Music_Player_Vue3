import { createApp } from "vue";
import Root from "./Root.vue";
import Homepage from "./pages/Homepage";
import News from "./pages/News";
import { createRouter, createWebHistory } from "vue-router";

let routes = [
    { path: "/", component: Homepage, name: "Homepage" },
    { path: "/news", component: News, name: "News" }
];

const router = new createRouter({
    mode: 'history',
    routes,
    history: createWebHistory(),
});

let app = createApp(Root);
app.use(router);
app.mount("#app");
