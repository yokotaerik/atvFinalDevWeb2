import api from "@/api/axios";
import { useState, useEffect } from "react";
import { CursoDTO, DisciplinaDTO } from "./useCurso.";

export interface AlunoDTO {
  id: number;
  nome: string;
  curso: CursoDTO | null;
  disciplinas: DisciplinaAlunoDTO[];
}

export interface DisciplinaAlunoDTO {
  id: number;
  status: string
  disciplina: DisciplinaDTO;
}

const useAlunos = () => {
  const [alunos, setAlunos] = useState<AlunoDTO[]>([]);

  const fetchStudents = async () => {
    try {
      const response = await api.get("/aluno/todos");
      setAlunos(response.data);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleAddAluno = async (nome: string) => {
    try {
      const response = await api.post("/aluno/cadastrar", { nome });
      if (response.status === 201) {
        alert("Aluno cadastrado com sucesso!");
        await fetchStudents();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return { alunos, fetchStudents, handleAddAluno };
};

export default useAlunos;
