import api from "@/api/axios";
import { useState, useEffect } from "react";
import { CursoDTO, DisciplinaDTO } from "./useCurso.";
import { cp } from "fs";

export interface AlunoDTO {
  id: number;
  nome: string;
  curso: CursoDTO | null;
  disciplinas: DisciplinaAlunoDTO[];
}

export interface DisciplinaAlunoDTO {
  id: number;
  status: string;
  disciplina: DisciplinaDTO;
  data: string;
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

  const deleteAluno = async (id: number) => {
    try {
      const response = await api.delete(`/aluno/${id}`);
      if (response.status === 200) {
        alert("Aluno deletado com sucesso!");
        await fetchStudents();
      }
    } catch (error) {
      console.error(error);
      alert(
        "Erro ao deletar aluno! (Se o aluno estiver com alguma matricula ou disciplina ativa não será possivél deleta-lo)"
      );
    }
  };

  return { alunos, fetchStudents, handleAddAluno, deleteAluno };
};

export default useAlunos;
