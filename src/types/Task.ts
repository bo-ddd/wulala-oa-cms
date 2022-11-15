export interface CreatedTask{
    taskName:  string
    description: string
    level: number
    sort ?: number
}
export interface Task {
    avatarName: string
    createdAt?: string
    id: number,
    taskName: string,
    description: string,
    level: number,
    sort?: number,
    userId: number,
    senderAvatarName?:string,
    status?:number
}