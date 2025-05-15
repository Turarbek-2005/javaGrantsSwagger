export interface StudentRecord {
    id: number;
    faculty: string;
    fio: string;
    someCode: string;
    sumPoints: number;
}

export interface StudentsResponse {
    count: number;
    faculties: Record<string, StudentRecord[]>;
}

// export interface StudentSerch {
//     faculties: Record<string, StudentRecord[]>;
// }
