import React from "react";
import { StudentsResponse } from "../types";

interface Props {
  data: StudentsResponse;
}

const StudentTabs: React.FC<Props> = ({ data }) => {
  const entries = Object.entries(data.faculties) as [
    string,
    { fio: string; someCode: string; sumPoints: number }[]
  ][];

  return (
    <div>
      <p className="text-sm mb-4">Всего студентов: {data.count}</p>
      <div className="flex flex-wrap gap-4">
        {entries.map(([faculty, students]) => (
          <div
            key={faculty}
            className="w-full md:w-1/2 bg-white shadow rounded-lg p-4"
          >
            <h2 className="text-lg font-semibold mb-2">{faculty}</h2>
            <table className="w-full table-auto text-sm">
              <thead>
                <tr className="bg-gray-100">
                  <th className="text-left p-2">ФИО</th>
                  <th className="text-left p-2">Код</th>
                  <th className="text-left p-2">Баллы</th>
                </tr>
              </thead>
              <tbody>
                {students.map((s, idx) => (
                  <tr key={idx} className="border-t">
                    <td className="p-2">{s.fio}</td>
                    <td className="p-2">{s.someCode}</td>
                    <td className="p-2">{s.sumPoints}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentTabs;
