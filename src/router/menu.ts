export default {
    sidebarList: [
        {
            id: '1',
            icon: 'HomeFilled',
            name: '首页',
            targetPath: '/home',
            childrenList: [],
            requiresAuth: false
        },
        {
            id: '2',
            icon: 'UserFilled',
            name: '员工管理',
            targetPath: '',
            childrenList: [
                {
                    id: '201',
                    name: '员工列表',
                    targetPath: '/userList',
                    requiresAuth: true
                }
            ]
        },
        {
            id: '3',
            icon: 'Checked',
            name: '流程审批',
            targetPath: '',
            childrenList: [
                {
                    id: '301',
                    name: '请假审批',
                    targetPath: '/leave',
                    requiresAuth: true
                },
                {
                    id: '302',
                    name: '提交申请',
                    targetPath: '/submitApplication',
                    requiresAuth: false
                },
                {
                    id: '303',
                    name: '提交日报',
                    targetPath: '/submitDaily',
                    requiresAuth: false
                },
                {
                    id: '304',
                    name: '日报列表',
                    targetPath: '/dailyList',
                    requiresAuth: true
                }
            ]
        },
        {
            id: '4',
            icon: 'Stamp',
            name: '审核管理',
            targetPath: '',
            childrenList: [],
        },
        {
            id: '5',
            icon: 'TrendCharts',
            name: '绩效管理',
            targetPath: '',
            childrenList: []
        },
        {
            id: '6',
            icon: 'Key',
            name: '权限管理',
            targetPath: '',
            childrenList: [
                {
                    id: '601',
                    name: '权限列表',
                    targetPath: '/rightManagement',
                    requiresAuth: true
                },
                {
                    id: '602',
                    name: '角色管理',
                    targetPath: '/roles',
                    requiresAuth: true
                },
                {
                    id: '603',
                    name: '新增角色',
                    targetPath: '/createRoles',
                    requiresAuth: true
                },
                {
                    id: '604',
                    name: '角色编辑',
                    targetPath: '/roleEditing',
                    requiresAuth: true
                }
            ]
        },
        {
            id: '7',
            icon: 'Tools',
            name: '设置',
            targetPath: '',
            childrenList: []
        },
    ]
}