type BaseType = {
    id: number;
    created_at?: string;
    updated_at?: string;
    deleted_at?: string;
}

type ProjectBaseType = {
    startDate: string;
    endDate: string;
    budget: number;
    expenses: number;
    issues: number;
    risks: number;
    progress: number;
    documents: number;
    notes: number;
} & BaseType

export type Project = {
    name: string;
    description: string;
    status: string;
    user_id: number;
    user: User;
    tasks: Task[];
} & ProjectBaseType

export type User = {
    name: string;
    email: string;
} & BaseType

export type Task = {
    name: string;
    description: string;
    status: string;
    project_id: number;
 } & ProjectBaseType