export interface Task {
    Task_ID?: number;
    Task: string;
    Start_Date?: string;
    End_Date?: string;
    Priority: number;
    Parent?: ParentTask;
}

export interface ParentTask {
    Parent_ID?: number;
    Parent_Task: string;
}
