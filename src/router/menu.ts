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
        id: 401,
        name: '请假审批',
        targetPath: '/leave',
        requiresAuth: true
    },
    {
        id: 501,
        name: '任务平台',
        targetPath: '/taskList',
        requiresAuth: true
    },
    {
        id: 601,
        name: '创建消息',
        targetPath: '/createMessage',
        requiresAuth: true
    },
    {
        id: 602,
        name: '发布消息',
        targetPath: '/publishMessage',
        requiresAuth: true
    },
    {
        id: 701,
        name: '权限列表',
        targetPath: '/rightManagement',
        requiresAuth: true
    },
    {
        id: 702,
        name: '角色管理',
        targetPath: '/roles',
        requiresAuth: true
    },
    {
        id: 704,
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
        icon: 'Platform',
        name: '日常工作',
        targetPath: '',
        childrenList: [
            {
                id: 301,
                name: '填写日报',
                targetPath: '/createDaily',
                requiresAuth: false
            },
            {
                id: 302,
                name: '日报列表',
                targetPath: '/daily',
                requiresAuth: false
            },
        ],
        requiresAuth: true
    },
    {
        id: 4,
        icon: 'Checked',
        name: '流程审批',
        targetPath: '',
        requiresAuth: true,
        childrenList: [
            {
                id: 402,
                name: '请假申请',
                targetPath: '/submitApplication',
                requiresAuth: false
            },
            {
                id: 406,
                name: '离职申请',
                targetPath: '/dimissionApplication',
                requiresAuth: false
            }
        ]
    },
    {
        id: 5,
        icon: 'Document',
        name: '任务管理',
        targetPath: '',
        requiresAuth: true,
        childrenList: [
            {
                id: 501,
                name: '用户任务',
                targetPath: '/task',
                requiresAuth: false
            },
        ]
    },
    {
        id: 6,
        icon: 'Message',
        name: '信息管理',
        targetPath: '',
        childrenList: [],
        requiresAuth: true
    },
    {
        id: 7,
        icon: 'Key',
        name: '权限管理',
        targetPath: '',
        childrenList: [],
        requiresAuth: true
    },
    {
        id: 8,
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
childrenList = [...new Set(childrenList)]

childrenList.forEach(item => {
    let parent = sidebarList.find(key => key.id == Number(String(item.id)[0]));
    if (parent) {
        parent.childrenList.push(item)
    }
})
sidebarList = sidebarList.filter(item => !item.requiresAuth || item.childrenList.length)

export default sidebarList