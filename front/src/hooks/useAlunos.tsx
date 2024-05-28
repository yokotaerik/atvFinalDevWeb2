import api from "@/api/axios";
import { useState, useEffect } from "react";
import { CursoDTO, DisciplinaDTO } from "./useCurso.";
import { cp } from "fs";

export interface AlunoDTO {
  id: number;
  nome: string;
  email: string;
  cpf: string;
  curso: CursoDTO | null;
  disciplinasMatriculado: DisciplinaAlunoDTO[];
  disciplinasTrancado: DisciplinaAlunoDTO[];
  disciplinasCursado: DisciplinaAlunoDTO[];

}

export interface DisciplinaAlunoDTO {
  id: number;
  status: string;
  disciplina: DisciplinaDTO;
  data: Date
}

const useAlunos = () => {
  const [alunos, setAlunos] = useState<AlunoDTO[]>([]);

  const fetchStudents = async () => {
    try {
      const response = await api.get("/aluno/todos");
      setAlunos(response.data);
      return response.data;
    } catch (error) {
      console.error("Erro ao buscar usuario :", error);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleAddAluno = async (nome: string, cpf: string, email: string) => {
    if (!nome || !cpf) return alert("Preencha todos os campos!");
    try {
      const response = await api.post("/aluno/cadastrar", { nome, cpf, email });
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
