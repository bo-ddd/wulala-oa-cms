export interface CreateLeave {
    userId: string;
    reason: string;
    startTime: string;
    endTime: string;
}
export interface ExamineUserLeave {
    id: number,
    auditStatus: number
}