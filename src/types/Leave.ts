export interface CreateLeave {
    userId: string;
    reason: string;
    startTime: string;
    endTime: string;
}
export interface ExamineUserLeave {
    id: number,
    auditStatus: number
    userId?: number
    reason?: string
    startTime?: string
    endTime?: string
    leaveStatus?: number
}