import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import { useStore } from "../stores/nav";
import { storeToRefs } from "pinia";
import { close, start } from '@/nprogress/nprogress';
import Loading from "@/assets/loading/loading";
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
          path: "/createDaily",
          name: "createDaily",
          component: () => import("../views/CreateDaily.vue"),
          meta: {
            label: "填写日报",
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
        {//用户任务列表页面;
          path: "/task",
          name: "task",
          component: () => import("../views/Task.vue"),
          meta: {
            label: "用户任务",
            requiresAuth: false
          }
        },
        {//个人设置列表页面;
          path: "/myTools",
          name: "myTools",
          component: () => import("../views/MyTools.vue"),
          meta: {
            label: "我的设置",
            requiresAuth: false
          }
        },
        {//日报列表页面;
          path: "/daily",
          name: "daily",
          component: () => import("../views/Daily.vue"),
          meta: {
            label: "日报列表",
            requiresAuth: false
          }
        },
        {//更新公告页面;
          path: "/updateAnnouncement",
          name: "updateAnnouncement",
          component: () => import("../views/UpdateAnnouncement.vue"),
          meta: {
            label: "更新公告",
            requiresAuth: false
          }
        },
        {//创建活动页面;
          path: "/createActivity",
          name: "createActivity",
          component: () => import("../views/CreateActivity.vue"),
          meta: {
            label: "创建活动",
            requiresAuth: true
          }
        },
        {//活动专区页面;
          path: "/activityArea",
          name: "activityArea",
          component: () => import("../views/ActivityArea.vue"),
          meta: {
            label: "活动专区",
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
  {//离职列表页面;
    path: "/dimissionList",
    name: "dimissionList",
    component: () => import("../views/DimissionList.vue"),
    meta: {
      label: "离职列表",
      requiresAuth: true
    }
  },
  {//任务列表页面;
    path: "/taskList",
    name: "taskList",
    component: () => import("../views/TaskList.vue"),
    meta: {
      label: "任务平台",
      requiresAuth: true
    }
  },
  {//创建消息页面;
    path: "/createMessage",
    name: "createMessage",
    component: () => import("../views/CreateMessage.vue"),
    meta: {
      label: "创建消息",
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
  },
  {//创建用户页面;
    path: "/createUserAccount",
    name: "createUserAccount",
    component: () => import("../views/CreateUserAccount.vue"),
    meta: {
      label: "创建用户",
      requiresAuth: true
    }
  },
  {//请假详情页面;
    path: "/leaveDetail",
    name: "leaveDetail",
    component: () => import("../views/LeaveDetail.vue"),
    meta: {
      label: "请假详情",
      requiresAuth: true
    }
  }
];

router.beforeEach(async (to) => {
  start()
  Loading?.start();
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
router.afterEach(() => {
  close();
  Loading?.done();
})

export default router;
