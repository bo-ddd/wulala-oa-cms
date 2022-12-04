export interface CreatedTask{
    id?:number
    taskName:  string
    description: string
    level: number
    sort ?: number
}
export interface Task {
    pageNum: number,
    pageSize: number,
    avatarName: string
    taskId:number,
    id: number,
    taskName: string,
    description: string,
    level: number,
    sort?: number,
    userId: number,
    senderAvatarName?:string,
    status:number,
}
export interface QueryTask{
    pageNum: number,
    pageSize: number,
    userId?: number,
    level?: number|null,
    status?:number,
}