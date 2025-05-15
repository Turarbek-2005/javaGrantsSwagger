// src/components/Controls.tsx
import React, { useState } from "react";
import {
  getAllStudents,
  searchStudents,
  getFaculties,
  deleteAllStudents,
} from "../api/studentApi";
import { StudentRecord, StudentsResponse } from "../types";

interface Props {
  onData: (data: StudentsResponse) => void;
}

// Тип записи студента из API (расширяет локальный StudentRecord)
interface ApiStudent extends StudentRecord {
  id: number;
  faculty: string;
}

// Функция группировки массива ApiStudent по факультетам
function groupByFaculty(students: ApiStudent[]): StudentsResponse {
  const faculties: StudentsResponse["faculties"] = {};

  students.forEach((s) => {
    if (!faculties[s.faculty]) {
      faculties[s.faculty] = [];
    }
    // В StudentsResponse хранятся только поля StudentRecord
    faculties[s.faculty].push({
      id:s.id,
      faculty:s.faculty,
      fio: s.fio,
      someCode: s.someCode,
      sumPoints: s.sumPoints,
    });
  });

  return {
    count: students.length,
    faculties,
  };
}

export const Controls: React.FC<Props> = ({ onData }) => {
  const [q, setQ] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

    // Загрузка всех студентов
  const fetchAll = async () => {
    setError("");
    setLoading(true);
    try {
      // getAllStudents возвращает сразу StudentsResponse
      const res = await getAllStudents(); // res: StudentsResponse
      onData(res);
    } catch (e: any) {
      setError(e.message || "Ошибка загрузки данных");
    } finally {
      setLoading(false);
    }
  };

  // Поиск студентов по строке q
  const handleSearch = async () => {
    if (!q.trim()) {
      setError("Пожалуйста, введите строку для поиска");
      return;
    }
    setError("");
    setLoading(true);
    try {
      const rawData = (await searchStudents(q)) as unknown as ApiStudent[];
      const grouped = groupByFaculty(rawData);
      onData(grouped);
    } catch (e: any) {
      setError(e.message || "Ошибка поиска");
    } finally {
      setLoading(false);
    }
  };

  // Получить список факультетов (для логирования)
  const fetchFaculties = async () => {
    setError("");
    setLoading(true);
    try {
      const list = await getFaculties();
      console.log("Faculties:", list);
    } catch (e: any) {
      setError(e.message || "Ошибка получения факультетов");
    } finally {
      setLoading(false);
    }
  };

  // Удалить всех студентов
  const handleDelete = async () => {
    setError("");
    setLoading(true);
    try {
      await deleteAllStudents();
      onData({ count: 0, faculties: {} });
    } catch (e: any) {
      setError(e.message || "Ошибка при удалении");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-wrap items-center space-x-2 my-4">
      <button
        onClick={fetchAll}
        disabled={loading}
        className="px-3 py-1 bg-green-600 hover:bg-green-700 text-white rounded disabled:opacity-50"
      >
        Get All
      </button>

      <input
        className="border rounded px-2 py-1"
        placeholder="Search..."
        value={q}
        onChange={(e) => setQ(e.target.value)}
      />
      <button
        onClick={handleSearch}
        disabled={loading}
        className="px-3 py-1 bg-yellow-600 hover:bg-yellow-700 text-white rounded disabled:opacity-50"
      >
        Search
      </button>

      <button
        onClick={fetchFaculties}
        disabled={loading}
        className="px-3 py-1 bg-indigo-600 hover:bg-indigo-700 text-white rounded disabled:opacity-50"
      >
        Faculties
      </button>

      <button
        onClick={handleDelete}
        disabled={loading}
        className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded disabled:opacity-50"
      >
        Delete All
      </button>

      {loading && <span className="text-gray-600 ml-4">Loading...</span>}
      {error && <span className="text-red-600 ml-4">{error}</span>}
    </div>
  );
};
