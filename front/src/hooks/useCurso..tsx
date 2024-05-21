import api from "@/api/axios";
import { useState, useEffect } from "react";
import { AlunoDTO } from "./useAlunos";

export interface CursoDTO {
  id: number;
  nome: string;
  disciplinas: DisciplinaDTO[];
  horasTotais: number;
  alunos: AlunoDTO[];
}

export interface DisciplinaDTO {
  id: number;
  nome: string;
  cargaHoraria: number;
  ementa: string;
  alunos: AlunoDTO[] | null;
}

const useCurso = () => {
  const [cursos, setCursos] = useState<CursoDTO[]>([]);

  const fetchCursos = async () => {
    try {
      const response = await api.get("/curso/todos");
      setCursos(response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  useEffect(() => {
    fetchCursos();
  }, []);

  const cadastrarCurso = async (nome: string) => {
    try {
      const response = await api.post("/curso/criar", { nome });
      if (response.status == 201) {
        alert("Curso cadastrado com sucesso");
        await fetchCursos();
      }
    } catch (error) {
      alert("Erro ao cadastrar");
    }
  };

  return { cursos, fetchCursos, cadastrarCurso };
};

export default useCurso;
