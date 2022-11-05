import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import axios from '../assets/api/api';
import { reactive, onMounted } from 'vue';
import { useNav }from "../stores/nav";
import {storeToRefs} from "pinia";
// let {targetData}=storeToRefs(useNav())



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
            label: "提交申请",
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
        }
      ]
    },
  ],
});

// router.beforeEach((to, from) => {
//  if(){

//  }
//   return false
// })

let data = [
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
      label: "请假审批管理",
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
      label: "创建角色",
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
  }
];

interface UserPermissionList {
  permissionId: number,
  permissionName: string
}

interface Meta {
  label: string,
  requiresAuth: boolean
}
interface TargetData {
  path: string,
  name: string,
  component: () => void,
  meta: Meta
};
let targetData = reactive<TargetData[]>([]);

router.beforeEach((to, from) => {

  (async () => {
    //获取当前用户ID;
    let { userId } = (await axios.queryUserInfoApi()).data;
    console.log('------用户ID------')
    console.log(userId)
    //获取当前用户的权限列表;
    let userPermissionList: UserPermissionList[] = (await axios.permissionUserListApi({ userId: userId })).data;
    console.log('------用户权限列表------')
    console.log(userPermissionList)

    let arr: string[] = [];
    userPermissionList.forEach(item => {
      arr.push(item.permissionName)
    })
    targetData.length = 0;
    Object.assign(targetData, data.filter(item => arr.includes(item.meta.label)))

    targetData.forEach(item => {
      router.addRoute('layout', item)
    })
  })();
  
  return true
})











export default router;
