//离职列表数据类型;
export interface TableData {
    id: number
    userId: number
    department: string
    postName: string
    avatarName: string | null
    applyTime: string
    quitTime: string
    reason: string
    enclosure: string
    status: number
}

//查询参数的类型;
export interface UserQuitListParam {
    avatarName?: string,
    status?: number,
    applyStartTime?: string,
    applyEndTime?: string,
    pageSize: number,
    pageNum: number

}
//离职审批表单的提交数据类型;
export interface ApprovalForm {
    id: number;
    operation: string;
    suggestion: string;
}

