import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [

    {//注册页面;
      path: "/logon",
      name: "logon",
      component: () => import("../views/LogonView.vue"),
    },
    {//登录页面;
      path: "/",
      name: "login",
      component: () => import("../views/LoginView.vue"),
    },
    {//layout页面;
      path: "/layout",
      name: "layout",
      component: () => import("../views/Layout.vue"),
      children: [
        {//主页面;
          path: "/home",
          name: "home",
          component: HomeView,
        },
        {//请假页面;
          path: "/leave",
          name: "leave",
          component: () => import("../views/LeaveView.vue"),
        }
      ]
    },
  ],
});

export default router;
