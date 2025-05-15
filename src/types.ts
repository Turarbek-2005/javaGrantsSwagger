export interface StudentRecord {
  fio: string;
  someCode: string;
  sumPoints: number;
}

export interface StudentsResponse {
  count: number;
  faculties: Record<string, StudentRecord[]>;
}
