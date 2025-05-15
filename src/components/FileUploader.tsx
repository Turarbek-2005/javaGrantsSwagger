import React, { useState } from "react";
import { uploadStudents, getAllStudents } from "../api/studentApi";
import { StudentsResponse } from "../types";

interface Props {
  onData: (data: StudentsResponse) => void;
}

export const FileUploader: React.FC<Props> = ({ onData }) => {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMsg(null);
    if (e.target.files?.[0]) setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      setMsg({ type: "error", text: "Выберите PDF‑файл" });
      return;
    }
    setLoading(true);
    setMsg(null);
    try {
      await uploadStudents(file);
      const data = await getAllStudents();
      onData(data);
      setMsg({ type: "success", text: "Файл успешно загружен" });
    } catch (err: any) {
      setMsg({ type: "error", text: err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center space-x-4">
      <input
        type="file"
        accept="application/pdf"
        onChange={handleFile}
        className="border rounded px-2 py-1"
      />
      <button
        onClick={handleUpload}
        disabled={loading}
        className={`px-4 py-2 rounded text-white ${
          loading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {loading ? "Загрузка..." : "Загрузить PDF"}
      </button>
      {msg && (
        <span
          className={msg.type === "error" ? "text-red-600" : "text-green-600"}
        >
          {msg.text}
        </span>
      )}
    </div>
  );
};
