import React, { useState, useEffect } from "react";
import axios from "axios";

interface Student {
  id: number;
  name: string;
  grade: number;
}

const Alunos: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get("/api/students"); 
        setStudents(response.data);
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };

    fetchStudents();
  }, []);

  return (
    <div>
      <h1>List of Students</h1>
      <ul>
        {students.map((student) => (
          <li key={student.id}>
            {student.name} - Grade: {student.grade}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Alunos;
