export interface CreateDaily{
    title: string,
    content: string
}

export interface TableData {
    id: number
    userId: number
    avatarName: string
    title: string
    content: string
    createdAt: string
    updatedAt: null
}
//查询参数的类型;
export interface UserDailyListParam {
    userId?: number,
    title?: string,
    startCreatedTime?: string,
    endCreatedTime?: string,
    pageSize: number,
    pageNum: number
}