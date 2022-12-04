export interface Message {
    id: number
    avatarName: string
    createdAt: Date
    content: string
  }
  export interface received {
    senderAvatarName: string
    content: string
    createdAt: string
    id: number
    updatedAt: string
  }