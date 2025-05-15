// src/components/Controls.tsx
import React, { useState } from "react";
import {
  getAllStudents,
  searchStudents,
  getFaculties,
  deleteAllStudents,
} from "../api/studentApi";
import { StudentsResponse } from "../types";

interface Props {
  onData: (data: StudentsResponse) => void;
}

export const Controls: React.FC<Props> = ({ onData }) => {
  const [q, setQ] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchAll = async () => {
    setError("");
    setLoading(true);
    try {
      const res = await getAllStudents();
      onData(res);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!q.trim()) {
      setError("Пожалуйста, введите строку для поиска");
      return;
    }
    setError("");
    setLoading(true);
    try {
      console.log(q);
      const res = await searchStudents(q);
      onData(res);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchFaculties = async () => {
    setError("");
    setLoading(true);
    try {
      const list = await getFaculties();
      // Если вам нужно что‑то делать со списком факультетов, добавьте callback,
      // сейчас просто логируем:
      console.log("Faculties:", list);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    setError("");
    setLoading(true);
    try {
      await deleteAllStudents();
      onData({ count: 0, faculties: {} }); // корректный тип
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false); // гарантированно отключим лоадер
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
