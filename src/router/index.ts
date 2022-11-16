import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import { useStore } from "../stores/nav";
import { storeToRefs } from "pinia";


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {//注册页面;
      path: "/logon",
      name: "logon",
      component: () => import("../views/LogonView.vue"),
    },
    {//登录页面;
      path: "/login",
      name: "login",
      alias: "/",
      component: () => import("../views/LoginView.vue"),
    },
    {//layout页面;
      path: "/layout",
      name: "layout",
      component: () => import("../views/Layout.vue"),
      children: [
        {//首页;
          path: "/home",
          name: "home",
          component: HomeView,
          meta: {
            label: "首页",
            requiresAuth: false
          }
        },
        {//提交申请页面;
          path: "/submitApplication",
          name: "submitApplication",
          component: () => import("../views/SubmitApplication.vue"),
          meta: {
            label: "请假申请",
            requiresAuth: false
          },
        },
        {//提交日报编辑页面;
          path: "/submitDaily",
          name: "submitDaily",
          component: () => import("../views/SubmitDaily.vue"),
          meta: {
            label: "提交日报",
            requiresAuth: false
          }
        },
        {//离职申请页面;
          path: "/dimissionApplication",
          name: "dimissionApplication",
          component: () => import("../views/DimissionApplication.vue"),
          meta: {
            label: "离职申请",
            requiresAuth: false
          }
        },
        {//个人中心页面;
          path: "/mine",
          name: "mine",
          component: () => import("../views/MineView.vue"),
          meta: {
            label: "个人中心",
            requiresAuth: false
          }
        },
        {//修改头像页面;
          path: "/updataAvatar",
          name: "updataAvatar",
          component: () => import("../views/UpdataAvatarView.vue"),
          meta: {
            label: "修改头像",
            requiresAuth: false
          }
        },
        {//修改个人资料页面;
          path: "/updataUserInfo",
          name: "updataUserInfo",
          component: () => import("../views/UpdataUserInfo.vue"),
          meta: {
            label: "修改资料",
            requiresAuth: false
          }
        },
        {//我的消息页面;
          path: "/message",
          name: "message",
          component: () => import("../views/Message.vue"),
          meta: {
            label: "我的消息",
            requiresAuth: false
          }
        },
        {//审核状态页面;
          path: "/auditStatus",
          name: "auditStatus",
          component: () => import("../views/AuditStatus.vue"),
          meta: {
            label: "我的审批",
            requiresAuth: false
          }
        },
      ]
    },
  ],
});


let dynamicRoutes = [
  {//员工列表页面;
    path: "/userList",
    name: "userList",
    component: () => import("../views/UserListView.vue"),
    meta: {
      label: "员工列表",
      requiresAuth: true
    }
  },
  {//请假审批页面;
    path: "/leave",
    name: "leave",
    component: () => import("../views/LeaveView.vue"),
    meta: {
      label: "请假审批",
      requiresAuth: true
    }
  },
  {//日报列表页面;
    path: "/dailyList",
    name: "dailyList",
    component: () => import("../views/DailyList.vue"),
    meta: {
      label: "日报列表",
      requiresAuth: true
    }
  },
  {//权限列表页面;
    path: "/rightManagement",
    name: "rightManagement",
    component: () => import("../views/RightManagement.vue"),
    meta: {
      label: "权限列表",
      requiresAuth: true
    },
  },
  {//角色管理页面;
    path: "/roles",
    name: "roles",
    component: () => import("../views/Roles.vue"),
    meta: {
      label: "角色管理",
      requiresAuth: true
    },
  },
  {//创建角色页面;
    path: "/createRoles",
    name: "createRoles",
    component: () => import("../views/CreateRoles.vue"),
    meta: {
      label: "新增角色",
      requiresAuth: true
    }
  },
  {//角色权限编辑页面;
    path: "/roleEditing",
    name: "roleEditing",
    component: () => import("../views/RoleEditing.vue"),
    meta: {
      label: "角色编辑",
      requiresAuth: true
    },
  },
  {//日报详情页面;
    path: "/dailyDetail",
    name: "dailyDetail",
    component: () => import("../views/DailyDetail.vue"),
    meta: {
      label: "日报详情",
      requiresAuth: true
    },
  },
  {//部门管理页面;
    path: "/department",
    name: "department",
    component: () => import("../views/Department.vue"),
    meta: {
      label: "部门管理",
      requiresAuth: true
    }
  },
  {//离职审批页面;
    path: "/dimissionApproval",
    name: "dimissionApproval",
    component: () => import("../views/DimissionApproval.vue"),
    meta: {
      label: "离职审批",
      requiresAuth: true
    }
  },
  {//离职列表页面;
    path: "/dimissionList",
    name: "dimissionList",
    component: () => import("../views/DimissionList.vue"),
    meta: {
      label: "离职列表",
      requiresAuth: true
    }
  },
  {//发布任务页面;
    path: "/publishTask",
    name: "publishTask",
    component: () => import("../views/PublishTask.vue"),
    meta: {
      label: "发布任务",
      requiresAuth: true
    }
  },
  {//任务列表页面;
    path: "/taskList",
    name: "taskList",
    component: () => import("../views/TaskList.vue"),
    meta: {
      label: "任务列表",
      requiresAuth: true
    }
  },
  {//发布消息页面;
    path: "/publishMessage",
    name: "publishMessage",
    component: () => import("../views/PublishMessage.vue"),
    meta: {
      label: "发布消息",
      requiresAuth: true
    }
  },
  {//用户详情页面;
    path: "/userDetail",
    name: "userDetail",
    component: () => import("../views/UserDetail.vue"),
    meta: {
      label: "用户详情",
      requiresAuth: true
    }
  }
];

router.beforeEach(async (to) => {
  const userStore = useStore();
  const { userId, userPremissionList } = storeToRefs(userStore);
  let isAuth = sessionStorage.getItem("token");
  //如果当前不是login页面并且没有token值；那么跳转到登录页面;
  if (to.name == 'login') {
    return true
  } else if (to.name != 'login' && !isAuth) {
    return { name: "login" }
  } else {
    if (!userPremissionList.value.length && !userId.value) {
      await userStore.getUserId();
      await userStore.getUserPermissionList();
      userPremissionList.value.forEach(permission => {
        let dynamicRoutesItem = dynamicRoutes.find(item => item.meta.label == permission.permissionName)
        if (dynamicRoutesItem) {
          router.addRoute('layout', dynamicRoutesItem)
        }
      })
      return { ...to, replace: true }
    } else {
      return true
    }
  }
}
)

export default router;
