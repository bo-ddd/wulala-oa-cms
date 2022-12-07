export interface CreatedTask{
    id?:number
    taskName:  string
    description: string
    level: number
    sort ?: number, 
   receivable?:number
}
export interface Task {
length: number
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
    pid:number
}
export interface TaskVO extends Task {
    children: Task[]
}
export interface QueryTask{
    pageNum: number,
    pageSize: number,
    userId?: number,
    level?: number|null,
    status?:number,
}