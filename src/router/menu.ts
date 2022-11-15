import { useStore } from "../stores/nav";
import { storeToRefs } from "pinia";

const userStore = useStore();
const { userPremissionList } = storeToRefs(userStore);


interface Parent {
    id: number,
    icon: string,
    name: string,
    targetPath: string,
    childrenList: Reason[],
    requiresAuth: boolean
}

interface Reason {
    id: number,
    name: string,
    targetPath: string,
    requiresAuth: boolean
}

let requiresAuthList = [
    {
        id: 201,
        name: '员工列表',
        targetPath: '/userList',
        requiresAuth: true
    },
    {
        id: 202,
        name: '离职列表',
        targetPath: '/dimissionList',
        requiresAuth: true
    },
    {
        id: 301,
        name: '请假审批',
        targetPath: '/leave',
        requiresAuth: true
    },
    {
        id: 304,
        name: '日报列表',
        targetPath: '/dailyList',
        requiresAuth: true
    },
    {
        id: 305,
        name: '离职审批',
        targetPath: '/dimissionApproval',
        requiresAuth: true
    },
    {
        id: 401,
        name: '发布任务',
        targetPath: '/publishTask',
        requiresAuth: true
    },
    {
        id: 402,
        name: '任务列表',
        targetPath: '/taskList',
        requiresAuth: true
    },
    {
        id: 501,
        name: '发布消息',
        targetPath: '/publishMessage',
        requiresAuth: true
    },
    {
        id: 601,
        name: '权限列表',
        targetPath: '/rightManagement',
        requiresAuth: true
    },
    {
        id: 602,
        name: '角色管理',
        targetPath: '/roles',
        requiresAuth: true
    },
    {
        id: 603,
        name: '新增角色',
        targetPath: '/createRoles',
        requiresAuth: true
    },
    {
        id: 604,
        name: '部门管理',
        targetPath: '/department',
        requiresAuth: true
    }
]


let sidebarList: Parent[] = [
    {
        id: 1,
        icon: 'HomeFilled',
        name: '首页',
        targetPath: '/home',
        childrenList: [],
        requiresAuth: false
    },
    {
        id: 2,
        icon: 'UserFilled',
        name: '员工管理',
        targetPath: '',
        childrenList: [],
        requiresAuth: true
    },
    {
        id: 3,
        icon: 'Checked',
        name: '流程审批',
        targetPath: '',
        requiresAuth: true,
        childrenList: [
            {
                id: 302,
                name: '请假申请',
                targetPath: '/submitApplication',
                requiresAuth: false
            },
            {
                id: 303,
                name: '提交日报',
                targetPath: '/submitDaily',
                requiresAuth: false
            },
            {
                id: 306,
                name: '离职申请',
                targetPath: '/dimissionApplication',
                requiresAuth: false
            }
        ]
    },
    {
        id: 4,
        icon: 'Document',
        name: '任务管理',
        targetPath: '',
        requiresAuth: true,
        childrenList: []
    },
    {
        id: 5,
        icon: 'Message',
        name: '信息管理',
        targetPath: '',
        childrenList: [],
        requiresAuth: true
    },
    {
        id: 6,
        icon: 'Key',
        name: '权限管理',
        targetPath: '',
        childrenList: [],
        requiresAuth: true
    },
    {
        id: 7,
        icon: 'Tools',
        name: '设置',
        targetPath: '',
        childrenList: [],
        requiresAuth: false
    },
]

let childrenList: Reason[] = [];
userPremissionList.value.forEach(Premission => {
    let reason = requiresAuthList.find(item => item.name == Premission.permissionName)
    if (reason) {
        childrenList.push(reason)
    }
})
 childrenList=[...new Set(childrenList)]

childrenList.forEach(item => {
    let parent = sidebarList.find(key => key.id == Number(String(item.id)[0]));
    if (parent) {
        parent.childrenList.push(item)
    }
})
sidebarList = sidebarList.filter(item => !item.requiresAuth || item.childrenList.length)

export default sidebarList