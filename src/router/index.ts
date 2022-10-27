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
        },
        {//员工列表页面;
          path: "/userList",
          name: "userList",
          component: () => import("../views/UserListView.vue"),
        },
        {//个人中心页面;
          path: "/mine",
          name: "mine",
          component: () => import("../views/MineView.vue"),
        },
        {//权限列表页面;
          path: "/rightManagement",
          name: "rightManagement",
          component: () => import("../views/RightManagement.vue"),
        },
        {//修改头像页面;
          path: "/updataAvatar",
          name: "updataAvatar",
          component: () => import("../views/UpdataAvatarView.vue"),
        },
        {//提交申请页面;
          path: "/submitApplication",
          name: "submitApplication",
          component: () => import("../views/SubmitApplication.vue"),
        },
        {//修改个人资料页面;
          path: "/updataUserInfo",
          name: "updataUserInfo",
          component: () => import("../views/UpdataUserInfo.vue"),
        },
        {//角色管理页面;
          path: "/roles",
          name: "roles",
          component: () => import("../views/Roles.vue"),
        },
        {//创建角色页面;
          path: "/createRoles",
          name: "createRoles",
          component: () => import("../views/CreateRoles.vue"),
        },
        {//角色权限编辑页面;
          path: "/roleEditing",
          name: "roleEditing",
          component: () => import("../views/RoleEditing.vue")
        }
      ]
    },
  ],
});

export default router;
