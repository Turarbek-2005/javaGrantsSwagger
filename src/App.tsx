import React, { useEffect, useState } from "react";
import { StudentsResponse, StudentRecord } from "./types";
import { FileUploader } from "./components/FileUploader";
import { Controls } from "./components/Controls";
import StudentTabs from "./components/StudentTabs";
import { getAllStudents } from "./api/studentApi";

const App: React.FC = () => {
  const [data, setData] = useState<StudentsResponse>({
    count: 0,
    faculties: {},
  });

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">PDF Grants Viewer</h1>

      <FileUploader onData={setData} />

      <Controls onData={setData} />

      <StudentTabs data={data} />
    </div>
  );
};

export default App;
